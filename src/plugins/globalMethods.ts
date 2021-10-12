import api from '@/api'
import fetch from '@/plugins/axios'
import wsCache from '@/utils/cache'

/* --------------------------------- 挂在全局方法 --------------------------------- */
export const setupGlobalMethods = (app) => {
  app.config.globalProperties.$api = { ...api }
  app.config.globalProperties.$fetch = fetch
  app.config.globalProperties.$wsCache = wsCache
}
