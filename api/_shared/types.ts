export type ReportReply = {
  id: string
  author: string
  message: string
  createdAt: string
}

export type StatusReport = {
  id: string
  author: string
  message: string
  createdAt: string
  replies: ReportReply[]
}
