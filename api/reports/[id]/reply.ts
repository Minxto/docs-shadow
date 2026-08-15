import { Redis } from '@upstash/redis'

export const config = {
  runtime: 'edge'
}

const REPORTS_KEY = 'shadow-status-reports'

const BLOCKLIST = [
  'asshole', 'bastard', 'bitch', 'bollocks', 'bullshit', 'cock', 'cunt', 'damn', 'dick',
  'dumbass', 'fag', 'faggot', 'fuck', 'fucker', 'fucking', 'motherfucker', 'nigger', 'nigga',
  'piss', 'prick', 'pussy', 'retard', 'shit', 'slut', 'twat', 'whore', 'rat', 'virus',
  'abruti', 'batard', 'bordel', 'connard', 'connasse', 'encule', 'fdp', 'merde', 'nique',
  'pd', 'pute', 'putain', 'salope', 'salaud', 'trouduc',
  'cabron', 'cabrona', 'cojones', 'concha', 'gilipollas', 'hijo de puta', 'joder', 'mierda',
  'pendejo', 'perra', 'puta', 'puto', 'verga',
  'babaca', 'buceta', 'caralho', 'corno', 'filho da puta', 'otario', 'viado',
  'cazzo', 'figa', 'puttana', 'stronzo', 'troia', 'vaffanculo',
  'dit me', 'ditmemay', 'dm', 'dmm', 'vl', 'vcl', 'clgt', 'ngu', 'cho chet', 'thang ngu',
  '傻逼', '操你', '草泥马', '妈的', '他妈', '去死', '贱人', '婊子', '狗屎', '滚蛋',
  'f u c k', 's h i t', 'sh1t', 'fck', 'fuk', 'btch', 'b1tch', 'a$$', 'a$$hole'
]

const LINK_PATTERNS = [
  /https?:\/\//i,
  /\bwww\./i,
  /\bdiscord\.gg\b/i,
  /\bdiscord(?:app)?\.com\/invite\b/i,
  /\bt\.me\b/i,
  /\btelegram\.(?:me|dog)\b/i,
  /\b[a-z0-9][-a-z0-9]{0,62}\.(com|gg|io|net|org|me|co|xyz|dev|app|link|tv|fr|de|es|pt|it|ru|tk|ml|ga|cf|gq|ly|be|cc|to|sh|ws|info|biz|uk|us|ca|nl|pl|cz|br|au|in|jp|kr|cn)\b/i
]

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[@4àáâãäå]/g, 'a')
    .replace(/[3èéêë€]/g, 'e')
    .replace(/[1!ìíîï|]/g, 'i')
    .replace(/[0òóôõö]/g, 'o')
    .replace(/[$5ß]/g, 's')
    .replace(/[7+]/g, 't')
    .replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function containsProfanity(text: string) {
  const normalized = normalize(text)
  if (!normalized) return false

  return BLOCKLIST.some((term) => {
    const normalizedTerm = normalize(term)
    if (!normalizedTerm) return false
    if (normalizedTerm.length <= 3) return normalized.split(' ').includes(normalizedTerm)
    return normalized.includes(normalizedTerm)
  })
}

function containsLink(text: string) {
  if (LINK_PATTERNS.some(pattern => pattern.test(text))) return true
  if (/discord[\s.(_-]*gg/i.test(text)) return true
  return false
}

function validateContent(text: string, fieldName: string) {
  const trimmed = text.trim()
  if (!trimmed) return `${fieldName} is required.`
  if (containsProfanity(trimmed)) return 'Insults and offensive language are not allowed.'
  if (containsLink(trimmed)) return 'Links and advertising are not allowed.'
  return null
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

  if (!url || !token) {
    throw new Error('Missing Redis env vars')
  }

  return new Redis({ url, token })
}

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export default async function handler(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' })
  }

  const url = new URL(request.url)
  const reportId = url.pathname.split('/').filter(Boolean).at(-2) ?? ''

  if (!reportId || reportId === 'reports') {
    return jsonResponse(400, { error: 'Report id is required.' })
  }

  try {
    const body = await request.json().catch(() => ({})) as { author?: string; message?: string }
    const author = typeof body.author === 'string' ? body.author.trim().slice(0, 32) || 'Anonymous' : 'Anonymous'
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : ''

    const authorError = validateContent(author, 'Name')
    if (authorError) return jsonResponse(400, { error: authorError })

    const messageError = validateContent(message, 'Message')
    if (messageError) return jsonResponse(400, { error: messageError })

    if (message.length < 2) {
      return jsonResponse(400, { error: 'Reply must be at least 2 characters.' })
    }

    const redis = getRedis()
    const reports = ((await redis.get(REPORTS_KEY)) ?? []) as Array<{
      id: string
      author: string
      message: string
      createdAt: string
      replies: Array<{ id: string; author: string; message: string; createdAt: string }>
    }>

    const report = reports.find(item => item.id === reportId)
    if (!report) {
      return jsonResponse(404, { error: 'Report not found.' })
    }

    report.replies.push({
      id: crypto.randomUUID(),
      author,
      message,
      createdAt: new Date().toISOString()
    })

    await redis.set(REPORTS_KEY, reports)
    return jsonResponse(201, { report })
  } catch (error) {
    console.error('Reply API error:', error)
    return jsonResponse(503, {
      error: 'Reports are temporarily unavailable. Connect Upstash Redis on Vercel to enable this feature.'
    })
  }
}
