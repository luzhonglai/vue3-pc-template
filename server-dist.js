/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 00:02:32
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-08-14 00:46:16
 */

const express = require('express')
const app = express()
const port = 1200

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('./dist'))

app.listen(port, () => {
  console.log(`dist server----> http://localhost:${port}`)
})
