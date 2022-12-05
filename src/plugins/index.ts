/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 16:42:38
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 10:04:43
 */

// export { setElement as setupElement } from '@/plugins/element'
export { setupDirectives } from '@/plugins/directives'
export { setupCustomComponents } from '@/plugins/globalComponent'
export { setupGlobalMethods } from '@/plugins/globalMethods'

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
