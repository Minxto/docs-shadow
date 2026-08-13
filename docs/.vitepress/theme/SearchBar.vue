<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Search...'
})

const VPLocalSearchBox = defineAsyncComponent(
  () => import('vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue')
)

const showSearch = ref(false)

function openSearch() {
  showSearch.value = true
}

function closeSearch() {
  showSearch.value = false
}

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement
  const tagName = element.tagName
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}

function onKeyDown(event: KeyboardEvent) {
  if ((event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) ||
      (event.key === '/' && !isEditingContent(event))) {
    event.preventDefault()
    openSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <div class="gb-search-wrap">
    <button type="button" class="gb-search" :aria-label="placeholder" @click="openSearch">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-5-5" stroke-linecap="round" />
      </svg>
      <span>{{ placeholder }}</span>
      <kbd>Ctrl K</kbd>
    </button>

    <VPLocalSearchBox v-if="showSearch" @close="closeSearch" />
  </div>
</template>
