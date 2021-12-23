import api from '@/apis'
import fetch from '@/plugins/axios'
import wsCache from '@/utils/cache'
import * as echarts from 'echarts'
/* --------------------------------- 挂在全局方法 --------------------------------- */
export const setupGlobalMethods = (app) => {
  console.log(echarts, '-----')

  app.config.globalProperties.$api = { ...api }
  app.config.globalProperties.$fetch = fetch
  app.config.globalProperties.$wsCache = wsCache
  app.config.globalProperties.$echarts = echarts
}
