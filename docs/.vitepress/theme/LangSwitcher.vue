<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs.js'
import { useData } from 'vitepress'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs({ correspondingLink: true })

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const currentLabel = computed(() => currentLang.value.label || 'English')

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div
    v-if="localeLinks.length && currentLang.label"
    ref="rootRef"
    class="gb-lang-wrap"
  >
    <button
      type="button"
      class="gb-lang-btn"
      :aria-expanded="open"
      :aria-label="theme.langMenuLabel || 'Language'"
      @click.stop="toggle"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" stroke-linecap="round" />
      </svg>
      <span>{{ currentLabel }}</span>
      <svg class="gb-lang-chevron" :class="{ open }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="open" class="gb-lang-menu">
      <a
        :href="currentLang.link"
        class="gb-lang-item active"
        @click="close"
      >
        {{ currentLabel }}
      </a>
      <a
        v-for="locale in localeLinks"
        :key="locale.link"
        :href="locale.link"
        class="gb-lang-item"
        @click="close"
      >
        {{ locale.text }}
      </a>
    </div>
  </div>
</template>
