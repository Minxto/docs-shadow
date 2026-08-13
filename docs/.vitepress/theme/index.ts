import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeLinks from './HomeLinks.vue'
import HomeHero from './HomeHero.vue'
import DownloadCard from './DownloadCard.vue'
import './gitbook.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeLinks', HomeLinks)
    app.component('HomeHero', HomeHero)
    app.component('DownloadCard', DownloadCard)
  }
}
