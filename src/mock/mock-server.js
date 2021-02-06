/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-02 11:10:34
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-04 15:32:46
 */

// const fs = require('fs')
// const path = require('path')


if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  const Mock = require('mockjs')
  // const sourcePath = path.resolve(__dirname, './modules');
  // const dirents = fs.readdirSync(sourcePath, { encoding: 'utf8', withFileTypes: true });
  // console.log(sourcePath,1111)
  // dirents.forEach((item) => {
  //   require(`./modules/${item.name}`)
  // })
  require('./modules/vipPlus')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('%c前端 mock 环境启动成功', 'color: #38f;font-weight: bold')
}