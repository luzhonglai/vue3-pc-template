/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 16:42:52
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-03 00:47:19
 */

import api from '@/api'
import fetch from '@/plugins/axios'
import wsCache from '@/utils/cache'

/* --------------------------------- 挂在全局方法 --------------------------------- */
export const setupGlobalMethods = (app) => {
  app.config.globalProperties.$api = { ...api }
  app.config.globalProperties.$fetch = fetch
  app.config.globalProperties.$wsCache = wsCache
}
