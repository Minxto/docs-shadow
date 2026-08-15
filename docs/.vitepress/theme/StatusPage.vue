<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'
import { getStatusLabels } from '../shared/i18n'

type DayStatus = 'operational' | 'degraded' | 'partial' | 'major'

type DayEntry = {
  date: Date
  status: DayStatus
  duration?: string
  related?: string
}

type ComponentStatus = {
  id: string
  name: string
  status: DayStatus
  history: DayEntry[]
}

type ServiceGroup = {
  id: string
  name: string
  status: DayStatus
  components?: ComponentStatus[]
  history?: DayEntry[]
}

type BarTarget = {
  groupId: string
  componentId: string
  index: number
  anchor: HTMLElement
}

const HISTORY_DAYS = 90

function startOfToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function buildHistory(
  overrides: Record<string, Omit<Partial<DayEntry>, 'date'>> = {}
): DayEntry[] {
  const today = startOfToday()

  return Array.from({ length: HISTORY_DAYS }, (_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (HISTORY_DAYS - 1 - index))
    const override = overrides[dateKey(date)]

    return {
      date,
      status: override?.status ?? 'operational',
      duration: override?.duration,
      related: override?.related
    }
  })
}

function worstStatus(statuses: DayStatus[]): DayStatus {
  const rank: Record<DayStatus, number> = {
    operational: 0,
    degraded: 1,
    partial: 2,
    major: 3
  }

  return statuses.reduce<DayStatus>(
    (worst, status) => (rank[status] > rank[worst] ? status : worst),
    'operational'
  )
}

function uptimePercent(history: DayEntry[]) {
  const operationalDays = history.filter(day => day.status === 'operational').length
  return ((operationalDays / history.length) * 100).toFixed(2)
}

function statusLabel(status: DayStatus, labels: ReturnType<typeof getStatusLabels>) {
  if (status === 'operational') return labels.operational
  if (status === 'degraded') return labels.degraded
  if (status === 'partial') return labels.partial
  return labels.major
}

function formatDayDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function formatIncidentDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

type MetricPeriod = 'day' | 'week' | 'month'

type PastIncidentEntry = {
  title: string
  tone: 'partial' | 'major'
  status: 'resolved' | 'monitoring'
  message: string
  statusLabel: string
}

type PastIncidentDay = {
  date: Date
  empty?: boolean
  entries?: PastIncidentEntry[]
}

const metricPeriod = ref<MetricPeriod>('day')

const { localeIndex, lang } = useData()
const labels = computed(() => getStatusLabels(localeIndex.value))

const CHART_WIDTH = 640
const CHART_HEIGHT = 140
const CHART_PADDING = 12

const metricSeries: Record<MetricPeriod, number[]> = {
  day: [118, 132, 145, 160, 152, 167, 174, 168, 155, 149, 162, 167],
  week: [142, 138, 151, 159, 167, 161, 154, 148, 156, 163, 170, 167],
  month: [155, 149, 158, 164, 172, 168, 161, 157, 165, 169, 171, 167]
}

const metricPointLabels: Record<MetricPeriod, string[]> = {
  day: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Today'],
  month: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
}

const metricLabels: Record<MetricPeriod, string[]> = {
  day: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '15 Aug', '03:00'],
  week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'],
  month: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

const currentMetricValues = computed(() => metricSeries[metricPeriod.value])
const metricHoverIndex = ref<number | null>(null)
const chartWrapRef = ref<HTMLElement | null>(null)

const displayedMetricValue = computed(() => {
  const values = currentMetricValues.value
  const index = metricHoverIndex.value ?? values.length - 1
  return `${values[index]} ms`
})

function buildChartCoords(values: number[], pointLabels: string[]) {
  const max = Math.max(...values, 200)
  const min = Math.min(...values, 100)
  const range = max - min || 1

  return values.map((value, index) => ({
    x: CHART_PADDING + (index / (values.length - 1)) * (CHART_WIDTH - CHART_PADDING * 2),
    y: CHART_HEIGHT - CHART_PADDING - ((value - min) / range) * (CHART_HEIGHT - CHART_PADDING * 2),
    value,
    label: pointLabels[index] ?? ''
  }))
}

const chartCoords = computed(() =>
  buildChartCoords(currentMetricValues.value, metricPointLabels[metricPeriod.value])
)

const chartPolyline = computed(() =>
  chartCoords.value.map(point => `${point.x},${point.y}`).join(' ')
)

const metricTooltipStyle = computed(() => {
  if (metricHoverIndex.value === null || !chartWrapRef.value) return {}

  const point = chartCoords.value[metricHoverIndex.value]
  const rect = chartWrapRef.value.getBoundingClientRect()
  const left = rect.left + (point.x / CHART_WIDTH) * rect.width
  const top = rect.top + (point.y / CHART_HEIGHT) * rect.height

  return {
    left: `${left}px`,
    top: `${top - 10}px`
  }
})

const metricTooltip = computed(() => {
  if (metricHoverIndex.value === null) return null
  return chartCoords.value[metricHoverIndex.value] ?? null
})

function onMetricPointEnter(index: number) {
  metricHoverIndex.value = index
}

function onMetricPointLeave() {
  metricHoverIndex.value = null
}

const pastIncidents = computed<PastIncidentDay[]>(() => [
  {
    date: new Date(2026, 7, 15),
    entries: [
      {
        title: labels.value.gatewayMajorIssue,
        tone: 'major',
        status: 'monitoring',
        statusLabel: labels.value.monitoring,
        message: labels.value.monitoringMessage
      }
    ]
  },
  {
    date: new Date(2026, 7, 14),
    entries: [
      {
        title: labels.value.gatewayPartialIssue,
        tone: 'partial',
        status: 'resolved',
        statusLabel: labels.value.resolved,
        message: labels.value.resolvedMessage
      }
    ]
  },
  {
    date: new Date(2026, 7, 13),
    empty: true
  }
])

const metricPeriods = computed(() => ([
  { id: 'day' as const, label: labels.value.day },
  { id: 'week' as const, label: labels.value.week },
  { id: 'month' as const, label: labels.value.month }
]))

const services = computed<ServiceGroup[]>(() => {
  const gatewayOverrides: Record<string, Omit<Partial<DayEntry>, 'date'>> = {
    [dateKey(new Date(2026, 7, 14))]: {
      status: 'partial',
      duration: '7 hrs',
      related: labels.value.gatewayPartialIssue
    },
    [dateKey(new Date(2026, 7, 15))]: {
      status: 'major',
      duration: '1 hr 12 mins',
      related: labels.value.gatewayMajorIssue
    }
  }

  const gatewayHistory = buildHistory(gatewayOverrides)
  const gatewayStatus = worstStatus(gatewayHistory.map(day => day.status))
  const emulatorComponents: ComponentStatus[] = [
    {
      id: 'api',
      name: labels.value.api,
      status: 'operational',
      history: buildHistory()
    },
    {
      id: 'gateway',
      name: labels.value.gateway,
      status: gatewayStatus,
      history: gatewayHistory
    },
    {
      id: 'discord-link',
      name: labels.value.discordLink,
      status: 'operational',
      history: buildHistory()
    }
  ]

  return [
    {
      id: 'shadow-emulator',
      name: 'Shadow Emulator',
      status: 'operational',
      components: emulatorComponents
    },
    {
      id: 'shadow-color-bot',
      name: 'Shadow Color bot',
      status: 'operational',
      history: buildHistory()
    }
  ]
})

const allOperational = computed(() =>
  services.value.every(service => {
    if (service.components) {
      return service.components.every(component => component.status === 'operational')
    }
    return service.status === 'operational'
  })
)

const active = ref<BarTarget | null>(null)
const pinned = ref(false)

function barKey(target: BarTarget) {
  return `${target.groupId}:${target.componentId}:${target.index}`
}

function setActiveTarget(
  groupId: string,
  componentId: string,
  index: number,
  event: MouseEvent
) {
  active.value = {
    groupId,
    componentId,
    index,
    anchor: event.currentTarget as HTMLElement
  }
}

function onBarEnter(
  groupId: string,
  componentId: string,
  index: number,
  event: MouseEvent
) {
  if (!pinned.value) {
    setActiveTarget(groupId, componentId, index, event)
  }
}

function onBarLeave() {
  if (!pinned.value) {
    active.value = null
  }
}

function onBarClick(
  groupId: string,
  componentId: string,
  index: number,
  event: Event
) {
  event.stopPropagation()

  const next: BarTarget = {
    groupId,
    componentId,
    index,
    anchor: event.currentTarget as HTMLElement
  }

  if (pinned.value && active.value && barKey(active.value) === barKey(next)) {
    pinned.value = false
    active.value = null
    return
  }

  active.value = next
  pinned.value = true
}

function isBarActive(groupId: string, componentId: string, index: number) {
  return (
    active.value?.groupId === groupId
    && active.value?.componentId === componentId
    && active.value?.index === index
  )
}

function onDocumentClick(event: MouseEvent) {
  if (!pinned.value) return

  const target = event.target as Element
  if (target.closest('.gb-status-bar') || target.closest('.gb-status-tooltip')) return

  pinned.value = false
  active.value = null
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))

const activeDay = computed(() => {
  if (!active.value) return null

  const group = services.value.find(item => item.id === active.value!.groupId)
  if (!group) return null

  if (group.components) {
    const component = group.components.find(item => item.id === active.value!.componentId)
    return component?.history[active.value.index] ?? null
  }

  return group.history?.[active.value.index] ?? null
})

const tooltipStyle = computed(() => {
  if (!active.value) return {}

  const rect = active.value.anchor.getBoundingClientRect()
  const left = rect.left + rect.width / 2

  return {
    left: `${left}px`,
    top: `${rect.top - 10}px`
  }
})
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
        :class="{ 'gb-status-service--group': service.components }"
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

        <template v-if="service.components">
          <div
            v-for="component in service.components"
            :key="component.id"
            class="gb-status-component"
          >
            <div class="gb-status-component-head">
              <h3 class="gb-status-component-name">{{ component.name }}</h3>
              <span
                class="gb-status-service-state"
                :class="`gb-status-service-state--${component.status}`"
              >
                {{ statusLabel(component.status, labels) }}
              </span>
            </div>

            <div class="gb-status-bars" role="img" :aria-label="`${component.name} uptime`">
              <span
                v-for="(day, index) in component.history"
                :key="index"
                class="gb-status-bar"
                :class="[
                  `gb-status-bar--${day.status}`,
                  { 'gb-status-bar--active': isBarActive(service.id, component.id, index) }
                ]"
                role="button"
                tabindex="0"
                @mouseenter="onBarEnter(service.id, component.id, index, $event)"
                @mouseleave="onBarLeave"
                @click="onBarClick(service.id, component.id, index, $event)"
                @keydown.enter.prevent="onBarClick(service.id, component.id, index, $event)"
              />
            </div>

            <div class="gb-status-meta">
              <span>{{ labels.daysAgo }}</span>
              <span class="gb-status-uptime">{{ uptimePercent(component.history) }}% {{ labels.uptime }}</span>
              <span>{{ labels.today }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="gb-status-bars" role="img" :aria-label="`${service.name} uptime`">
            <span
              v-for="(day, index) in service.history"
              :key="index"
              class="gb-status-bar"
              :class="[
                `gb-status-bar--${day.status}`,
                { 'gb-status-bar--active': isBarActive(service.id, service.id, index) }
              ]"
              role="button"
              tabindex="0"
              @mouseenter="onBarEnter(service.id, service.id, index, $event)"
              @mouseleave="onBarLeave"
              @click="onBarClick(service.id, service.id, index, $event)"
              @keydown.enter.prevent="onBarClick(service.id, service.id, index, $event)"
            />
          </div>

          <div class="gb-status-meta">
            <span>{{ labels.daysAgo }}</span>
            <span class="gb-status-uptime">{{ uptimePercent(service.history!) }}% {{ labels.uptime }}</span>
            <span>{{ labels.today }}</span>
          </div>
        </template>
      </section>
    </div>

    <section class="gb-status-bottom">
      <div class="gb-status-bottom-head">
        <h2 class="gb-status-section-title">{{ labels.systemMetrics }}</h2>
        <div class="gb-status-tabs" role="tablist" aria-label="Metrics period">
          <button
            v-for="period in metricPeriods"
            :key="period.id"
            type="button"
            class="gb-status-tab"
            :class="{ active: metricPeriod === period.id }"
            role="tab"
            :aria-selected="metricPeriod === period.id"
            @click="metricPeriod = period.id; metricHoverIndex = null"
          >
            {{ period.label }}
          </button>
        </div>
      </div>

      <div class="gb-status-metric-card">
        <div class="gb-status-metric-head">
          <span>{{ labels.apiResponseTime }}</span>
          <strong>{{ displayedMetricValue }}</strong>
        </div>

        <div ref="chartWrapRef" class="gb-status-chart-wrap">
          <svg
            class="gb-status-chart"
            :viewBox="`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#2f81f7"
              stroke-width="2.5"
              stroke-linejoin="round"
              stroke-linecap="round"
              :points="chartPolyline"
            />

            <circle
              v-if="metricHoverIndex !== null"
              :cx="chartCoords[metricHoverIndex].x"
              :cy="chartCoords[metricHoverIndex].y"
              r="4.5"
              fill="#2f81f7"
              stroke="#fff"
              stroke-width="2"
              pointer-events="none"
            />

            <circle
              v-for="(point, index) in chartCoords"
              :key="`${metricPeriod}-${index}`"
              :cx="point.x"
              :cy="point.y"
              r="12"
              fill="transparent"
              class="gb-status-chart-hit"
              @mouseenter="onMetricPointEnter(index)"
              @mouseleave="onMetricPointLeave"
            />
          </svg>
          <div class="gb-status-chart-labels">
            <span
              v-for="(label, index) in metricLabels[metricPeriod]"
              :key="`${metricPeriod}-${index}`"
            >
              {{ label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="gb-status-bottom gb-status-bottom--incidents">
      <h2 class="gb-status-section-title">{{ labels.pastIncidents }}</h2>

      <div
        v-for="day in pastIncidents"
        :key="day.date.toISOString()"
        class="gb-status-incident-day"
      >
        <h3 class="gb-status-incident-date">{{ formatIncidentDate(day.date, lang) }}</h3>

        <p v-if="day.empty" class="gb-status-incident-empty">{{ labels.noIncidentsReported }}</p>

        <article
          v-for="(entry, index) in day.entries"
          :key="index"
          class="gb-status-incident-entry"
        >
          <p
            class="gb-status-incident-title"
            :class="`gb-status-incident-title--${entry.tone}`"
          >
            {{ entry.title }}
          </p>
          <p class="gb-status-incident-update">
            <strong>{{ entry.statusLabel }}</strong>
            <span> - {{ entry.message }}</span>
          </p>
        </article>
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="metricTooltip"
        class="gb-status-tooltip gb-status-tooltip--metric"
        :style="metricTooltipStyle"
      >
        <p class="gb-status-tooltip-date">{{ metricTooltip.label }}</p>
        <p class="gb-status-tooltip-text">{{ metricTooltip.value }} ms</p>
      </div>

      <div
        v-if="active && activeDay"
        class="gb-status-tooltip"
        :class="{ 'gb-status-tooltip--pinned': pinned }"
        :style="tooltipStyle"
      >
        <p class="gb-status-tooltip-date">{{ formatDayDate(activeDay.date, lang) }}</p>

        <template v-if="activeDay.status === 'operational'">
          <p class="gb-status-tooltip-text">{{ labels.noDowntime }}</p>
        </template>

        <template v-else>
          <div
            class="gb-status-tooltip-incident"
            :class="`gb-status-tooltip-incident--${activeDay.status}`"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2 1 21h22L12 2Zm0 6a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm0 10a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
            </svg>
            <span>{{ statusLabel(activeDay.status, labels) }}</span>
            <span v-if="activeDay.duration" class="gb-status-tooltip-duration">{{ activeDay.duration }}</span>
          </div>

          <p v-if="activeDay.related" class="gb-status-tooltip-related-label">{{ labels.related }}</p>
          <p v-if="activeDay.related" class="gb-status-tooltip-related">{{ activeDay.related }}</p>
        </template>
      </div>
    </Teleport>
  </div>
</template>
