import { Redis } from '@upstash/redis'
import type { ReportReply, StatusReport } from './types.js'

const REPORTS_KEY = 'shadow-status-reports'

function getRedis() {
  return Redis.fromEnv()
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
