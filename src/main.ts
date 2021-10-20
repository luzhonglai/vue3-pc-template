import App from './App.vue'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import { setupElement, setupGlobalMethods, setupCustomComponents, setupDirectives } from './plugins'

const app = createApp(App)
console.log('环境变量---->', process.env)

/* gloabl  css */
import '@/styles/reset.css'
import '@/styles/index.less'
import '@/assets/icons/svg'
import '@evs-pc/evs-ui-pro/lib/index.css'

setupElement(app)
setupDirectives(app)
setupGlobalMethods(app)
setupCustomComponents(app)

app.use(router).use(store).mount('#app')
