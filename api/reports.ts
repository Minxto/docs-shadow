import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateContent } from '../../shared/profanity.js'
import { addReport, getReports } from '../_shared/reports-store.js'

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    if (req.method === 'GET') {
      const reports = await getReports()
      return sendJson(res, 200, { reports })
    }

    if (req.method === 'POST') {
      const author = sanitizeAuthor(req.body?.author, 'Anonymous')
      const message = sanitizeMessage(req.body?.message)

      const authorError = validateContent(author, 'Name')
      if (authorError) return sendJson(res, 400, { error: authorError })

      const messageError = validateContent(message, 'Message')
      if (messageError) return sendJson(res, 400, { error: messageError })

      if (message.length < 3) {
        return sendJson(res, 400, { error: 'Message must be at least 3 characters.' })
      }

      const report = await addReport(author, message)
      return sendJson(res, 201, { report })
    }

    return sendJson(res, 405, { error: 'Method not allowed.' })
  } catch (error) {
    console.error('Reports API error:', error)
    return sendJson(res, 503, {
      error: 'Reports are temporarily unavailable. Connect Upstash Redis on Vercel to enable this feature.'
    })
  }
}
