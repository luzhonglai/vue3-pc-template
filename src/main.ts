/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-29 17:30:05
 */
import { createApp } from 'vue'

// import './mock/mock-server'

import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)

app.mount('#app')
