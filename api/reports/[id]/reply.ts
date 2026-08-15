import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateContent } from '../../_shared/profanity'
import { addReply } from '../../_shared/reports-store'

function sanitizeAuthor(value: unknown, fallback: string) {
  const author = typeof value === 'string' ? value.trim().slice(0, 32) : ''
  return author || fallback
}

function sanitizeMessage(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : ''
}

function sendJson(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(body))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  const reportId = typeof req.query.id === 'string' ? req.query.id : ''
  if (!reportId) {
    return sendJson(res, 400, { error: 'Report id is required.' })
  }

  try {
    const author = sanitizeAuthor(req.body?.author, 'Anonymous')
    const message = sanitizeMessage(req.body?.message)

    const authorError = validateContent(author, 'Name')
    if (authorError) return sendJson(res, 400, { error: authorError })

    const messageError = validateContent(message, 'Message')
    if (messageError) return sendJson(res, 400, { error: messageError })

    if (message.length < 2) {
      return sendJson(res, 400, { error: 'Reply must be at least 2 characters.' })
    }

    const report = await addReply(reportId, author, message)
    if (!report) {
      return sendJson(res, 404, { error: 'Report not found.' })
    }

    return sendJson(res, 201, { report })
  } catch (error) {
    console.error('Reply API error:', error)
    return sendJson(res, 503, {
      error: 'Reports are temporarily unavailable. Connect Upstash Redis on Vercel to enable this feature.'
    })
  }
}
