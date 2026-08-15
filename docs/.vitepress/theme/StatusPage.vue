<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { getStatusLabels } from '../shared/i18n'

type DayStatus = 'operational' | 'degraded' | 'partial' | 'major'

type ServiceStatus = {
  id: string
  name: string
  status: 'operational' | 'degraded' | 'partial' | 'major'
  history: DayStatus[]
}

function buildHistory(overrides: Partial<Record<number, DayStatus>> = {}): DayStatus[] {
  return Array.from({ length: 90 }, (_, index) => overrides[index] ?? 'operational')
}

const services: ServiceStatus[] = [
  {
    id: 'shadow-emulator',
    name: 'Shadow Emulator',
    status: 'operational',
    history: buildHistory({ 62: 'degraded' })
  },
  {
    id: 'shadow-color-bot',
    name: 'Shadow Color bot',
    status: 'operational',
    history: buildHistory()
  }
]

function uptimePercent(history: DayStatus[]) {
  const operationalDays = history.filter(day => day === 'operational').length
  return ((operationalDays / history.length) * 100).toFixed(2)
}

function statusLabel(status: ServiceStatus['status'], labels: ReturnType<typeof getStatusLabels>) {
  if (status === 'operational') return labels.operational
  if (status === 'degraded') return labels.degraded
  if (status === 'partial') return labels.partial
  return labels.major
}

const { localeIndex } = useData()
const labels = computed(() => getStatusLabels(localeIndex.value))

const allOperational = computed(() =>
  services.every(service => service.status === 'operational')
)
</script>

<template>
  <div class="gb-status">
    <div
      class="gb-status-banner"
      :class="{ 'gb-status-banner--warn': !allOperational }"
    >
      {{ allOperational ? labels.allOperational : labels.someIssues }}
    </div>

    <p class="gb-status-intro">{{ labels.uptimeIntro }}</p>

    <div class="gb-status-card">
      <section
        v-for="service in services"
        :key="service.id"
        class="gb-status-service"
      >
        <div class="gb-status-service-head">
          <h2 class="gb-status-service-name">{{ service.name }}</h2>
          <span
            class="gb-status-service-state"
            :class="`gb-status-service-state--${service.status}`"
          >
            {{ statusLabel(service.status, labels) }}
          </span>
        </div>

        <div class="gb-status-bars" role="img" :aria-label="`${service.name} uptime`">
          <span
            v-for="(day, index) in service.history"
            :key="index"
            class="gb-status-bar"
            :class="`gb-status-bar--${day}`"
            :title="`${index + 1} / 90`"
          />
        </div>

        <div class="gb-status-meta">
          <span>{{ labels.daysAgo }}</span>
          <span class="gb-status-uptime">{{ uptimePercent(service.history) }}% {{ labels.uptime }}</span>
          <span>{{ labels.today }}</span>
        </div>
      </section>
    </div>
  </div>
</template>
