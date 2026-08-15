<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getStatusLabels } from '../shared/i18n'
import { useLocalePath } from './utils'

const { localeIndex } = useData()
const route = useRoute()
const { localePath, normalizeDocPath } = useLocalePath()

const labels = computed(() => getStatusLabels(localeIndex.value))
const statusHref = computed(() => localePath('/status'))

const isActive = computed(() => normalizeDocPath(route.path) === '/status')
</script>

<template>
  <a
    :href="statusHref"
    class="gb-lang-btn gb-status-btn"
    :class="{ active: isActive }"
    :aria-current="isActive ? 'page' : undefined"
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span>{{ labels.button }}</span>
  </a>
</template>
