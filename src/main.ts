/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-05 17:22:07
 */
import { createApp } from 'vue'

import axios from './plugins/requset'
import './mock/mock-server'

import App from './App.vue'
const app = createApp(App)

app.use(axios)

app.mount('#app')
