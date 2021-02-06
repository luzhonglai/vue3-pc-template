/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-02 11:10:48
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-04 13:05:52
 */


let baseUrl = process.env.VUE_APP_BASE_API

function responseFake(code = 200, data) {
  return {
    code: code,
    data: data,s
  }
}


module.exports = {
  responseFake,
}


