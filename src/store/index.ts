/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-06 11:08:05
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2022-01-17 00:49:59
 */

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

export default store
