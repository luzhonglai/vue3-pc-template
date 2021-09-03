/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 16:44:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-08-15 14:26:09
 */

import permisson from '@/directives/permisson'

/* -------------------------------------------------------------------------- */

/**
 * @description 使用webpack api自动注册全局指令
 * @param {vue} app 当前应用实例， vue3新特性
 * @returns {void} void
 */
export function setupDirectives(app): void {
  const files = require.context('../directives/', true, /\.(ts)$/)
  files.keys().forEach((key) => {
    const config = files(key)
    const name = key
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split('/')[0]
    app.directive(name, config.default || config)
  })
}
