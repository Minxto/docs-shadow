import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeLinks from './HomeLinks.vue'
import HomeHero from './HomeHero.vue'
import DownloadCard from './DownloadCard.vue'
import TutorialVideo from './TutorialVideo.vue'
import StatusPage from './StatusPage.vue'
import './gitbook.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeLinks', HomeLinks)
    app.component('HomeHero', HomeHero)
    app.component('DownloadCard', DownloadCard)
    app.component('TutorialVideo', TutorialVideo)
    app.component('StatusPage', StatusPage)
  }
}
