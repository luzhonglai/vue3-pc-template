/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 16:42:38
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-26 16:03:24
 */

import { createApp } from 'vue'

export { setupDirectives } from '@/plugins/directives'
export { setupCustomComponents } from '@/plugins/globalComponent'
export { setupGlobalMethods } from '@/plugins/globalMethods'
export { vantPlugins } from '@/plugins/setVant'

/**
 * @name: 加载所有插件实例
 * @return {*}
 * @param {ReturnType} app
 */
// export const loadAllplugins = (app: ReturnType<typeof createApp>) => {
//   const files = require.context('.', true, /\.ts$/)
//   files.keys().forEach((key) => {
//     if (typeof files(key).default === 'function') {
//       if (key !== './index.ts') files(key).default(app)
//     }
//   })
// }
