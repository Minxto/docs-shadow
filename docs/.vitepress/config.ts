import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import {
  createSidebar,
  localeConfig,
  sidebarLabels,
  uiLabels
} from './shared/i18n'

const sharedTheme = {
  logo: '/logo.webp',
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Back to top',
  darkModeSwitchLabel: 'Appearance',
  socialLinks: [] as const,
  search: {
    provider: 'local' as const
  }
}

function localeTheme(locale: keyof typeof sidebarLabels) {
  const ui = uiLabels[locale]
  return {
    ...sharedTheme,
    siteTitle: ui.siteTitle,
    langMenuLabel: ui.langMenu,
    docFooter: {
      prev: ui.previous,
      next: ui.next
    },
    sidebar: createSidebar(sidebarLabels[locale])
  }
}

export default defineConfig({
  title: 'Shadow Docs',
  description: 'Documentation Shadow Emulator',
  appearance: true,
  transformPageData(pageData, { siteConfig }) {
    if (!pageData.filePath) return

    const filePath = path.join(siteConfig.srcDir, pageData.filePath)

    try {
      pageData.lastUpdated = fs.statSync(filePath).mtimeMs
    } catch {
      // Ignore missing files during dev/build edge cases.
    }
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/public/videos/**', '**/public/downloads/**', '**/*.mp4', '**/*.exe']
      }
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/webp', href: '/logo.webp' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],
  locales: {
    root: {
      label: localeConfig.root.label,
      lang: localeConfig.root.lang,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('root')
    },
    fr: {
      label: localeConfig.fr.label,
      lang: localeConfig.fr.lang,
      link: localeConfig.fr.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('fr')
    },
    es: {
      label: localeConfig.es.label,
      lang: localeConfig.es.lang,
      link: localeConfig.es.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('es')
    },
    pt: {
      label: localeConfig.pt.label,
      lang: localeConfig.pt.lang,
      link: localeConfig.pt.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('pt')
    },
    it: {
      label: localeConfig.it.label,
      lang: localeConfig.it.lang,
      link: localeConfig.it.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('it')
    },
    vi: {
      label: localeConfig.vi.label,
      lang: localeConfig.vi.lang,
      link: localeConfig.vi.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('vi')
    },
    zh: {
      label: localeConfig.zh.label,
      lang: localeConfig.zh.lang,
      link: localeConfig.zh.link,
      title: 'Shadow Docs',
      description: 'Documentation Shadow Emulator',
      themeConfig: localeTheme('zh')
    }
  }
})
