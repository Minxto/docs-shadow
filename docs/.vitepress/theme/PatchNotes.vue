<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const patchNotes = [
  'Fixed an issue where, when the connection to the emulator was lost, the game would close immediately to prevent a temporary ban.',
  'Readapted the modules to prevent **error -102**, which should now occur much less frequently.',
  'Fully optimized the emulator to reduce resource usage.',
  'Added a **voice notification system** that tells you when the emulator is ready and when the bypass is injected, so you know when you can play or when you should wait.'
]

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

function renderNote(note: string) {
  return note
    .split(/(\*\*[^*]+\*\*)/g)
    .map(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return `<strong>${part.slice(2, -2)}</strong>`
      }
      return part
    })
    .join('')
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div ref="rootRef" class="gb-lang-wrap">
    <button
      type="button"
      class="gb-lang-btn gb-patch-btn"
      :aria-expanded="open"
      aria-label="Patch notes"
      @click.stop="toggle"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 3.5h6a1.5 1.5 0 0 1 1.5 1.5V7H7.5V5A1.5 1.5 0 0 1 9 3.5Z" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 12h6M9 16h4" stroke-linecap="round" />
      </svg>
      <span>Patch Notes</span>
      <span class="gb-patch-badge">13/08</span>
      <svg class="gb-lang-chevron" :class="{ open }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="open" class="gb-notify-panel">
      <div class="gb-notify-header">
        <span class="gb-notify-title">Patch Notes</span>
        <span class="gb-notify-date">13/08</span>
      </div>
      <ul class="gb-notify-list">
        <li
          v-for="(note, index) in patchNotes"
          :key="index"
          v-html="renderNote(note)"
        />
      </ul>
    </div>
  </div>
</template>
