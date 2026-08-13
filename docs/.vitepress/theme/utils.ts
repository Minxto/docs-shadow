import { computed } from 'vue'
import { useData } from 'vitepress'

const publicPaths = ['/downloads/', '/videos/', '/images/', '/logo']

export function useLocalePath() {
  const { localeIndex } = useData()

  const homePath = computed(() =>
    localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`
  )

  function localePath(path: string) {
    if (!path.startsWith('/') || /^https?:\/\//.test(path)) return path
    if (publicPaths.some(prefix => path.startsWith(prefix))) return path
    if (localeIndex.value === 'root') return path
    return `/${localeIndex.value}${path}`.replace(/\/+/g, '/')
  }

  function normalizeDocPath(path: string) {
    return path.replace(/\.html$/, '').replace(/^\/(fr|es|pt|it|vi|zh)(?=\/)/, '') || '/'
  }

  return {
    homePath,
    localePath,
    normalizeDocPath
  }
}
