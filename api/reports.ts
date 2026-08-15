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

function validateContent(text: string, fieldName: string) {
  const trimmed = text.trim()
  if (!trimmed) return `${fieldName} is required.`
  if (containsProfanity(trimmed)) return 'Insults and offensive language are not allowed.'
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  try {
    const redis = getRedis()

    if (request.method === 'GET') {
      const reports = (await redis.get(REPORTS_KEY)) ?? []
      return jsonResponse(200, { reports })
    }

    if (request.method === 'POST') {
      const body = await request.json().catch(() => ({})) as { author?: string; message?: string }
      const author = typeof body.author === 'string' ? body.author.trim().slice(0, 32) || 'Anonymous' : 'Anonymous'
      const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) : ''

      const authorError = validateContent(author, 'Name')
      if (authorError) return jsonResponse(400, { error: authorError })

      const messageError = validateContent(message, 'Message')
      if (messageError) return jsonResponse(400, { error: messageError })

      if (message.length < 3) {
        return jsonResponse(400, { error: 'Message must be at least 3 characters.' })
      }

      const reports = ((await redis.get(REPORTS_KEY)) ?? []) as Array<{
        id: string
        author: string
        message: string
        createdAt: string
        replies: unknown[]
      }>

      const report = {
        id: crypto.randomUUID(),
        author,
        message,
        createdAt: new Date().toISOString(),
        replies: []
      }

      reports.unshift(report)
      await redis.set(REPORTS_KEY, reports.slice(0, 200))
      return jsonResponse(201, { report })
    }

    return jsonResponse(405, { error: 'Method not allowed.' })
  } catch (error) {
    console.error('Reports API error:', error)
    return jsonResponse(503, {
      error: 'Reports are temporarily unavailable. Connect Upstash Redis on Vercel to enable this feature.'
    })
  }
}
