/*
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2022-12-04 22:01:00
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 01:56:25
 * @FilePath: \vue3-pc-template\src\main.ts
 */
import App from './App.vue'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import { setupGlobalMethods, setupCustomComponents, setupDirectives } from './plugins'

const app = createApp(App)
console.log('环境变量---->', process.env)

/* gloabl  css */
import '@/styles/reset.css'
import '@/styles/index.less'
import '@/assets/icons/svg'

setupDirectives(app)
setupGlobalMethods(app)
setupCustomComponents(app)

app.use(router).use(store).mount('#app')
