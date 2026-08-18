<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import GbIcon from './GbIcon.vue'
import { getUiLabels } from '../shared/i18n'
import { useLocalePath } from './utils'

const { localeIndex } = useData()
const ui = computed(() => getUiLabels(localeIndex.value))
const { localePath } = useLocalePath()

const links = computed(() => [
  { href: localePath('/shadow-emulator/requirements'), label: ui.value.homeLinkEmulatorRequirements, icon: 'clipboard' },
  { href: localePath('/shadow-emulator/how-to-use'), label: ui.value.homeLinkEmulatorHowToUse, icon: 'help' },
  { href: localePath('/shadow-emulator/tutorial'), label: ui.value.homeLinkEmulatorTutorial, icon: 'video' },
  { href: localePath('/shadow-emulator/fix-errors'), label: ui.value.homeLinkEmulatorFixErrors, icon: 'wrench' },
  { href: localePath('/shadow-emulator/avoiding-game-bans'), label: ui.value.homeLinkEmulatorAvoidingBans, icon: 'shield' },
  { href: localePath('/shadow-color/requirements'), label: ui.value.homeLinkColorRequirements, icon: 'clipboard' },
  { href: localePath('/shadow-color/how-to-use'), label: ui.value.homeLinkColorHowToUse, icon: 'help' },
  { href: localePath('/shadow-color/tutorial'), label: ui.value.homeLinkColorTutorial, icon: 'video' },
  { href: localePath('/shadow-color/fix-errors'), label: ui.value.homeLinkColorFixErrors, icon: 'wrench' },
  { href: localePath('/shadow-color/avoiding-game-bans'), label: ui.value.homeLinkColorAvoidingBans, icon: 'shield' },
  { href: localePath('/rules'), label: ui.value.homeLinkRules, icon: 'shield' }
])
</script>

<template>
  <div class="home-links">
    <a v-for="link in links" :key="link.href" :href="link.href">
      <GbIcon :name="link.icon" :size="18" />
      <span class="home-links-label">{{ link.label }}</span>
      <svg class="home-links-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  </div>
</template>
