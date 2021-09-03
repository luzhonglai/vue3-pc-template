/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-07-23 15:27:22
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-03 01:09:41
 */

/**
 * @name:
 * @return {*}
 */
const files = require.context('./', true, /\.ts$/)

const modules = {}

files.keys().forEach((key) => {
  if (key == './index.ts') return

  const path = key.replace(/(\.\/|\.ts)/g, '')
  if (!modules[path]) {
    modules[path] = {
      namespaced: true
    }
  }
  modules[path] = files(key).default
})

export default modules
