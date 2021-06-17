/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-17 09:18:07
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registeGlobalComponent } from '@/components'
import { setElement } from '@/plugins/element'

// 引入mock
// import '@/mock/mock-server'

// 引入路由守护（权限）
import './permiussion'

/**
 * @description 全局样式引入
 * @reset 重置浏览器默认样式
 * @index 全局样式入口文件
 * @svg 注册svg
 */
import '@/styles/reset.css'
import '@/styles/index.less'
import '@/assets/icons/svg'

const app = createApp(App)
// import '@/mock/mock-server'

// 注册全局组件
registeGlobalComponent(app)

// 设置element
setElement(app)

app
  .use(store)
  .use(router)
  .mount('#app')
