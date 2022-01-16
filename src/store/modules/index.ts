/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-06 11:08:06
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2022-01-17 00:51:04
 */
const files = require.context('.', true, /\.ts$/)
const modules: any = {}

files.keys().forEach((key) => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [namespace, imported] = path.split('/')
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: true
    }
  }
  modules[namespace] = files(key).default || files(key)
})

export default modules
