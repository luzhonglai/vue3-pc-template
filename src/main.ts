/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-07 16:24:03
 */

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import element from '@/plugins/element'

// 路由拦截器
import './permiussion'

/**
 * @description 全局样式引入
 * @reset 重置浏览器默认样式
 * @index 全局样式入口文件
 */
import '@/styles/reset.css'
import '@/styles/index.less'

const app = createApp(App)

element(app)

app.use(router).mount('#app')
