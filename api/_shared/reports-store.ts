import { Redis } from '@upstash/redis'
import type { ReportReply, StatusReport } from './types'

const REPORTS_KEY = 'shadow-status-reports'

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

  if (!url || !token) {
    throw new Error('Redis environment variables are not configured.')
  }

  return new Redis({ url, token })
}

export async function getReports(): Promise<StatusReport[]> {
  const reports = await getRedis().get<StatusReport[]>(REPORTS_KEY)
  return reports ?? []
}

export async function saveReports(reports: StatusReport[]) {
  await getRedis().set(REPORTS_KEY, reports)
}

export async function addReport(author: string, message: string): Promise<StatusReport> {
  const reports = await getReports()
  const report: StatusReport = {
    id: crypto.randomUUID(),
    author,
    message,
    createdAt: new Date().toISOString(),
    replies: []
  }

  reports.unshift(report)
  await saveReports(reports.slice(0, 200))
  return report
}

export async function addReply(
  reportId: string,
  author: string,
  message: string
): Promise<StatusReport | null> {
  const reports = await getReports()
  const report = reports.find(item => item.id === reportId)
  if (!report) return null

  const reply: ReportReply = {
    id: crypto.randomUUID(),
    author,
    message,
    createdAt: new Date().toISOString()
  }

  report.replies.push(reply)
  await saveReports(reports)
  return report
}
