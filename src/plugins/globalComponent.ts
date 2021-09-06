/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 16:45:00
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-06 15:34:15
 */

import evsComponent from '@evs-pc/evs-pc-component'

export const setupCustomComponents = (app?): void => {
  const files = require.context('../components/', true, /\.(vue|jsx|tsx)$/)
  app.use(evsComponent)
  files.keys().forEach((key) => {
    const config = files(key)
    const name = key
      .replace(/^\.\//, '')
      .replace(/\.\w+$/, '')
      .split('/')[0]

    app.component(name, config.default || config)
  })
}
