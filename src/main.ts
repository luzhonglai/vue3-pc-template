/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-09 17:27:45
 */

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

setupElement(app)
setupDirectives(app)
setupGlobalMethods(app)
setupCustomComponents(app)

app
  .use(router)
  .use(store)
  .mount('#app')
