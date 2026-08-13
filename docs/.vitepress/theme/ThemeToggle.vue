<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import GbIcon from './GbIcon.vue'

type ThemeMode = 'light' | 'dark' | 'auto'

const buttons = [
  { mode: 'light' as ThemeMode, icon: 'sun', label: 'Light theme' },
  { mode: 'auto' as ThemeMode, icon: 'monitor', label: 'System theme' },
  { mode: 'dark' as ThemeMode, icon: 'moon', label: 'Dark theme' }
]

const colorMode = useColorMode({
  storageKey: 'vitepress-theme-appearance',
  initialValue: 'dark'
})

const themeMode = computed(() => colorMode.store.value as ThemeMode)

const activeIndex = computed(() => {
  const index = buttons.findIndex(button => button.mode === themeMode.value)
  return index >= 0 ? index : 2
})

function setTheme(mode: ThemeMode) {
  colorMode.store.value = mode
}
</script>

<template>
  <div
    class="gb-theme-toggle"
    role="group"
    aria-label="Theme"
    :style="{ '--theme-index': activeIndex }"
  >
    <span class="gb-theme-indicator" aria-hidden="true" />

    <button
      v-for="button in buttons"
      :key="button.mode"
      type="button"
      class="gb-theme-btn"
      :class="{ active: themeMode === button.mode }"
      :title="button.label"
      :aria-label="button.label"
      :aria-pressed="themeMode === button.mode"
      @click="setTheme(button.mode)"
    >
      <GbIcon :name="button.icon" :size="15" />
    </button>
  </div>
</template>
