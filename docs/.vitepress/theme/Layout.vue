<script setup lang="ts">
import { Content, useData, useRoute } from 'vitepress'
import { computed, onUnmounted, ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'
import GbIcon from './GbIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import LangSwitcher from './LangSwitcher.vue'
import PatchNotes from './PatchNotes.vue'
import StatusButton from './StatusButton.vue'
import StatusReports from './StatusReports.vue'
import OnThisPage from './OnThisPage.vue'
import { getUiLabels } from '../shared/i18n'
import { useLocalePath } from './utils'

type SidebarItem = { text: string; link: string }
type SidebarGroup = { text: string; items: SidebarItem[] }

const { theme, page, localeIndex, lang } = useData()
const route = useRoute()
const ui = computed(() => getUiLabels(localeIndex.value))
const { homePath, localePath, normalizeDocPath } = useLocalePath()

const sectionMetaByPrefix: Record<string, { icon: string; prefix: string }> = {
  '/shadow-emulator/': { icon: 'spark', prefix: '/shadow-emulator/' },
  '/shadow-color/': { icon: 'target', prefix: '/shadow-color/' },
  '/rules/': { icon: 'shield', prefix: '/rules/' }
}

const pageIcons: Record<string, string> = {
  '/shadow-emulator/requirements': 'clipboard',
  '/shadow-emulator/how-to-use': 'help',
  '/shadow-emulator/tutorial': 'video',
  '/shadow-emulator/fix-errors': 'wrench',
  '/shadow-emulator/avoiding-game-bans': 'shield',
  '/shadow-color/requirements': 'clipboard',
  '/shadow-color/how-to-use': 'help',
  '/shadow-color/tutorial': 'video',
  '/shadow-color/fix-errors': 'wrench',
  '/shadow-color/avoiding-game-bans': 'shield',
  '/rules': 'shield'
}

function getSectionPrefix(link: string) {
  const path = normalizeDocPath(link)
  if (path.startsWith('/shadow-emulator/') || path === '/shadow-emulator') return '/shadow-emulator/'
  if (path.startsWith('/shadow-color/') || path === '/shadow-color') return '/shadow-color/'
  if (path.startsWith('/rules') || path === '/rules') return '/rules/'
  return '/'
}

const sidebarGroups = computed(() => {
  const groups = (theme.value.sidebar ?? []) as SidebarGroup[]

  return groups.map((group, index) => {
    const firstLink = group.items?.[0]?.link ?? '/'
    const prefix = getSectionPrefix(firstLink)
    const meta = sectionMetaByPrefix[prefix] ?? { icon: 'file', prefix: '/' }

    return {
      title: group.text,
      icon: meta.icon,
      base: localePath(firstLink),
      prefix: meta.prefix,
      sidebarIndex: index,
      items: (group.items ?? []).map(item => ({
        ...item,
        link: localePath(item.link)
      }))
    }
  })
})

const currentSection = computed(() => {
  const path = normalizeDocPath(route.path)

  return sidebarGroups.value.find(group => {
    const prefix = group.prefix.replace(/\/$/, '')
    return path.startsWith(prefix)
  }) ?? sidebarGroups.value[0]
})

const navItems = computed(() => currentSection.value?.items ?? [])

const isActive = (link: string) => {
  const current = route.path.replace(/\.html$/, '')
  const target = link.replace(/\.html$/, '')
  return current === target
}

const isDocPage = computed(() => {
  const path = normalizeDocPath(route.path)
  return path.includes('/shadow-emulator/') || path.includes('/shadow-color/') || path === '/rules' || path.endsWith('/rules')
})

const isStatusPage = computed(() => normalizeDocPath(route.path) === '/status')

const currentIndex = computed(() =>
  navItems.value.findIndex(item => isActive(item.link))
)

const prevPage = computed(() => {
  const i = currentIndex.value
  return i > 0 ? navItems.value[i - 1] : null
})

const nextPage = computed(() => {
  const i = currentIndex.value
  return i >= 0 && i < navItems.value.length - 1 ? navItems.value[i + 1] : null
})

const lastUpdatedText = computed(() => {
  const ts = page.value.lastUpdated
  if (!ts) return null

  return new Intl.DateTimeFormat(lang.value, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(ts))
})

const copied = ref(false)
const menuOpen = ref(false)

function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.body.classList.toggle('gb-menu-open', open)
})

watch(
  () => route.path,
  () => {
    closeMenu()
  }
)

onUnmounted(() => {
  document.body.classList.remove('gb-menu-open')
})

async function copyPage() {
  const text = document.querySelector('.gb-content')?.textContent ?? ''
  await navigator.clipboard.writeText(text.trim())
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function pageIcon(link: string) {
  return pageIcons[normalizeDocPath(link)] ?? 'file'
}
</script>

<template>
  <div class="gb-site">
    <header class="gb-header">
      <div class="gb-header-inner">
        <button
          type="button"
          class="gb-menu-btn"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? ui.closeMenu : ui.openMenu"
          @click="menuOpen ? closeMenu() : openMenu()"
        >
          <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </button>
        <a :href="homePath" class="gb-brand">
          <span class="gb-brand-title">{{ ui.siteTitle }}</span>
        </a>
        <div class="gb-header-actions">
          <StatusButton />
          <PatchNotes />
          <LangSwitcher />
          <SearchBar class="gb-header-search" :placeholder="ui.search" />
        </div>
      </div>
    </header>

    <div
      v-if="menuOpen"
      class="gb-sidebar-backdrop"
      aria-hidden="true"
      @click="closeMenu"
    />

    <div class="gb-body">
      <aside
        class="gb-sidebar"
        :class="{ open: menuOpen }"
        :aria-hidden="menuOpen ? undefined : true"
      >
        <div class="gb-sidebar-gutter" aria-hidden="true"></div>
        <div class="gb-sidebar-inner">
          <div class="gb-sidebar-scroll">
            <a :href="homePath" class="gb-sidebar-welcome" @click="closeMenu">{{ ui.welcomeSidebar }}</a>

            <div
              v-for="group in sidebarGroups"
              :key="group.title"
              class="gb-sidebar-block"
            >
              <a :href="group.base" class="gb-sidebar-section" @click="closeMenu">
                <span class="gb-sidebar-section-icon">
                  <GbIcon :name="group.icon" :size="16" />
                </span>
                <span>{{ group.title }}</span>
              </a>
              <nav class="gb-sidebar-nav">
                <a
                  v-for="item in group.items"
                  :key="item.link"
                  :href="item.link"
                  class="gb-sidebar-link"
                  :class="{ active: isActive(item.link) }"
                  @click="closeMenu"
                >
                  <span class="gb-sidebar-link-icon">
                    <GbIcon :name="pageIcon(item.link)" :size="16" />
                  </span>
                  <span>{{ item.text }}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </aside>

      <main class="gb-main">
        <div class="gb-main-row">
          <div class="gb-main-inner">
          <OnThisPage v-if="isDocPage" />

          <div v-if="isDocPage && currentSection" class="gb-page-toolbar">
            <a :href="currentSection.base" class="gb-breadcrumb">
              <GbIcon :name="currentSection.icon" :size="16" />
              <span>{{ currentSection.title }}</span>
            </a>
            <button type="button" class="gb-copy" @click="copyPage">
              <svg class="gb-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{{ copied ? ui.copied : ui.copy }}</span>
              <svg class="gb-copy-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>

          <div v-else-if="!isStatusPage" class="gb-page-toolbar">
            <a :href="homePath" class="gb-breadcrumb">
              <GbIcon name="home" :size="16" />
              <span>{{ ui.welcomeSidebar }}</span>
            </a>
          </div>

          <article class="gb-content vp-doc">
            <Content />
          </article>

          <div v-if="isDocPage && lastUpdatedText" class="gb-last-updated">
            {{ ui.lastUpdated }}: {{ lastUpdatedText }}
          </div>

          <footer v-if="prevPage || nextPage" class="gb-page-footer">
            <a v-if="prevPage" :href="prevPage.link" class="gb-pager prev">
              <span>{{ ui.previous }}</span>
              <strong>{{ prevPage.text }}</strong>
            </a>
            <a v-if="nextPage" :href="nextPage.link" class="gb-pager next">
              <span>{{ ui.next }}</span>
              <strong>{{ nextPage.text }}</strong>
            </a>
          </footer>
          </div>
        </div>
      </main>
    </div>

    <StatusReports v-if="isStatusPage" />

    <ThemeToggle />
  </div>
</template>
