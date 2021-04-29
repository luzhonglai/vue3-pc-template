/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-13 22:40:11
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-13 22:41:31
 */

// const fs = require('fs')
// const path = require('path')
import config  from '@/plugins/axios/config'

let { isMock } = config
// 本地mock服务
if (process.env.NODE_ENV !== 'production' && isMock == true ){
  const Mock = require('mockjs')
  
  require('./modules/test')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  
  console.log('%c前端 mock 环境启动成功', 'color: #38f;font-weight: bold')
}