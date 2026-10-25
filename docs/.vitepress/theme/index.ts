import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeSections from './components/HomeSections.vue'
import WorkflowSteps from './components/WorkflowSteps.vue'
import ProjectLink from './components/ProjectLink.vue'
import ReleaseList from './components/ReleaseList.vue'
import CommunityLinks from './components/CommunityLinks.vue'
import SupportPanel from './components/SupportPanel.vue'
import DiscordCard from './components/DiscordCard.vue'
import VideoIntro from './components/VideoIntro.vue'
import SimulationDemo from './components/SimulationDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeSections', HomeSections)
    app.component('WorkflowSteps', WorkflowSteps)
    app.component('ProjectLink', ProjectLink)
    app.component('ReleaseList', ReleaseList)
    app.component('CommunityLinks', CommunityLinks)
    app.component('SupportPanel', SupportPanel)
    app.component('DiscordCard', DiscordCard)
    app.component('VideoIntro', VideoIntro)
    app.component('SimulationDemo', SimulationDemo)
  }
} satisfies Theme
