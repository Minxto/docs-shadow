<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { getReportLabels } from '../shared/i18n'
import { containsProfanity, containsLink } from '@shared/profanity'

type ReportReply = {
  id: string
  author: string
  message: string
  createdAt: string
}

type StatusReport = {
  id: string
  author: string
  message: string
  createdAt: string
  replies: ReportReply[]
}

const { localeIndex, lang } = useData()
const labels = computed(() => getReportLabels(localeIndex.value))

const reports = ref<StatusReport[]>([])
const loading = ref(true)
const unavailable = ref(false)
const error = ref('')
const submitting = ref(false)
const replyingTo = ref<string | null>(null)

const reportAuthor = ref('')
const reportMessage = ref('')
const replyAuthors = ref<Record<string, string>>({})
const replyMessages = ref<Record<string, string>>({})

let refreshTimer: ReturnType<typeof setInterval> | null = null

async function parseJsonResponse(response: Response) {
  const text = await response.text()
  if (!text) return {}

  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    if (response.status >= 500) {
      unavailable.value = true
      throw new Error(labels.value.unavailable)
    }
    throw new Error(labels.value.submitError)
  }
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(lang.value, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

function validateFields(author: string, message: string) {
  if (containsProfanity(author) || containsProfanity(message)) {
    return labels.value.profanityError
  }
  if (containsLink(author) || containsLink(message)) {
    return labels.value.linkError
  }
  if (!message.trim()) {
    return labels.value.submitError
  }
  return ''
}

async function loadReports() {
  try {
    const response = await fetch('/api/reports')
    const data = await parseJsonResponse(response)

    if (!response.ok) {
      unavailable.value = response.status === 503
      throw new Error(typeof data.error === 'string' ? data.error : labels.value.submitError)
    }

    reports.value = (data.reports as StatusReport[] | undefined) ?? []
    unavailable.value = false
    error.value = ''
  } catch (err) {
    if (!unavailable.value) {
      error.value = err instanceof Error ? err.message : labels.value.unavailable
    }
  } finally {
    loading.value = false
  }
}

async function submitReport() {
  error.value = ''
  const validationError = validateFields(reportAuthor.value, reportMessage.value)
  if (validationError) {
    error.value = validationError
    return
  }

  submitting.value = true

  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: reportAuthor.value.trim() || labels.value.anonymous,
        message: reportMessage.value.trim()
      })
    })
    const data = await parseJsonResponse(response)

    if (!response.ok) {
      if (response.status === 503) unavailable.value = true
      throw new Error(typeof data.error === 'string' ? data.error : labels.value.submitError)
    }

    const report = data.report as StatusReport | undefined
    if (report) {
      reports.value = [report, ...reports.value.filter(item => item.id !== report.id)]
    } else {
      await loadReports()
    }

    reportMessage.value = ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : labels.value.submitError
  } finally {
    submitting.value = false
  }
}

async function submitReply(reportId: string) {
  error.value = ''
  const author = replyAuthors.value[reportId] ?? ''
  const message = replyMessages.value[reportId] ?? ''
  const validationError = validateFields(author, message)

  if (validationError) {
    error.value = validationError
    return
  }

  submitting.value = true

  try {
    const response = await fetch(`/api/reports/${reportId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: author.trim() || labels.value.anonymous,
        message: message.trim()
      })
    })
    const data = await parseJsonResponse(response)

    if (!response.ok) {
      if (response.status === 503) unavailable.value = true
      throw new Error(typeof data.error === 'string' ? data.error : labels.value.submitError)
    }

    const report = data.report as StatusReport | undefined
    if (report) {
      reports.value = reports.value.map(item => (item.id === reportId ? report : item))
    } else {
      await loadReports()
    }

    replyMessages.value[reportId] = ''
    replyingTo.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : labels.value.submitError
  } finally {
    submitting.value = false
  }
}

function toggleReply(reportId: string) {
  replyingTo.value = replyingTo.value === reportId ? null : reportId
}

onMounted(() => {
  loadReports()
  refreshTimer = setInterval(loadReports, 30000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<template>
  <aside class="gb-reports" aria-label="Community reports">
    <div class="gb-reports-head">
      <div class="gb-reports-title">{{ labels.title }}</div>
      <p class="gb-reports-subtitle">{{ labels.subtitle }}</p>
    </div>

    <form class="gb-reports-form" @submit.prevent="submitReport">
      <input
        v-model="reportAuthor"
        type="text"
        class="gb-reports-input"
        :placeholder="labels.namePlaceholder"
        maxlength="32"
        autocomplete="nickname"
      />
      <textarea
        v-model="reportMessage"
        class="gb-reports-textarea"
        :placeholder="labels.messagePlaceholder"
        maxlength="500"
        rows="3"
      />
      <button type="submit" class="gb-reports-submit" :disabled="submitting">
        {{ submitting ? labels.posting : labels.submitReport }}
      </button>
    </form>

    <p v-if="error" class="gb-reports-error">{{ error }}</p>
    <p v-if="unavailable" class="gb-reports-error">{{ labels.unavailable }}</p>
    <p v-else-if="loading" class="gb-reports-muted">{{ labels.loading }}</p>
    <p v-else-if="!reports.length" class="gb-reports-muted">{{ labels.empty }}</p>

    <div v-else class="gb-reports-list">
      <article v-for="report in reports" :key="report.id" class="gb-report-card">
        <header class="gb-report-card-head">
          <strong>{{ report.author }}</strong>
          <time>{{ formatTime(report.createdAt) }}</time>
        </header>
        <p class="gb-report-message">{{ report.message }}</p>

        <div class="gb-report-actions">
          <button type="button" class="gb-report-reply-btn" @click="toggleReply(report.id)">
            {{ labels.reply }}
            <span v-if="report.replies.length">({{ report.replies.length }})</span>
          </button>
        </div>

        <div v-if="report.replies.length" class="gb-report-replies">
          <div v-for="reply in report.replies" :key="reply.id" class="gb-report-reply">
            <header class="gb-report-card-head">
              <strong>{{ reply.author }}</strong>
              <time>{{ formatTime(reply.createdAt) }}</time>
            </header>
            <p class="gb-report-message">{{ reply.message }}</p>
          </div>
        </div>

        <form
          v-if="replyingTo === report.id"
          class="gb-reports-form gb-reports-form--reply"
          @submit.prevent="submitReply(report.id)"
        >
          <input
            v-model="replyAuthors[report.id]"
            type="text"
            class="gb-reports-input"
            :placeholder="labels.namePlaceholder"
            maxlength="32"
            autocomplete="nickname"
          />
          <textarea
            v-model="replyMessages[report.id]"
            class="gb-reports-textarea"
            :placeholder="labels.messagePlaceholder"
            maxlength="500"
            rows="2"
          />
          <button type="submit" class="gb-reports-submit" :disabled="submitting">
            {{ submitting ? labels.posting : labels.submitReply }}
          </button>
        </form>
      </article>
    </div>
  </aside>
</template>
