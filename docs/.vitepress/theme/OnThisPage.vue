<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getUiLabels } from '../shared/i18n'

type OutlineHeader = {
  title: string
  slug: string
}

const { localeIndex } = useData()
const route = useRoute()
const ui = computed(() => getUiLabels(localeIndex.value))
const headers = ref<OutlineHeader[]>([])
const activeSlug = ref('')

function collectHeaders() {
  const article = document.querySelector('.gb-content.vp-doc')
  if (!article) {
    headers.value = []
    return
  }

  headers.value = Array.from(article.querySelectorAll('h2[id]'))
    .map((element) => ({
      slug: element.id,
      title: (element.textContent ?? '').replace(/\u200B/g, '').trim()
    }))
    .filter(header => header.slug && header.title)

  activeSlug.value = headers.value[0]?.slug ?? ''
}

function updateActiveHeading() {
  if (!headers.value.length) return

  const offset = 100
  let current = headers.value[0].slug

  for (const header of headers.value) {
    const element = document.getElementById(header.slug)
    if (element && element.getBoundingClientRect().top <= offset) {
      current = header.slug
    }
  }

  activeSlug.value = current
}

watch(
  () => route.path,
  () => {
    nextTick(() => {
      collectHeaders()
      updateActiveHeading()
    })
  }
)

onMounted(() => {
  nextTick(() => {
    collectHeaders()
    updateActiveHeading()
    requestAnimationFrame(() => {
      collectHeaders()
      updateActiveHeading()
    })
  })
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<template>
  <aside v-if="headers.length" class="gb-outline" aria-label="On this page">
    <div class="gb-outline-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h14" stroke-linecap="round" />
      </svg>
      <span>{{ ui.onThisPage }}</span>
    </div>

    <nav class="gb-outline-nav">
      <a
        v-for="(header, index) in headers"
        :key="header.slug"
        :href="`#${header.slug}`"
        class="gb-outline-link"
        :class="{ active: activeSlug === header.slug }"
      >
        {{ index + 1 }}. {{ header.title }}
      </a>
    </nav>
  </aside>
</template>
