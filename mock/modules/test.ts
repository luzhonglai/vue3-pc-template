/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-02 15:30:17
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-07 15:31:48
 */

let Mock = require('mockjs')
import { RegExpUrl } from '@/mock/utils'


const userInfo = Mock.mock({
  id: '@id()', //得到随机的id
  username: '@cname()', //随机生成中文名字
  date: '@date()', //随机生成日期
  avata: "@image('200x200','red','#fff','avatar')", //生成图片，参数：size,background,foreground,text
  descrtption: '@paragraph()', //描述
  ip: '@ip()', //ip地址
  email: '@email()' //email
})

// 测试数据
Mock.mock(RegExpUrl('/user/list'), {
  "status": 0,
  "code": 1,
  "data": {
    "id|1001-11000": 0,
    "username": "@cname",
    "email": "admin@51purse.com",
    "phone": null,
    "role": 0,
    "createTime": 1479048325000,
    "updateTime": 1479048325000
  }
})

Mock.mock(RegExpUrl('/user/info'), 'get', userInfo)