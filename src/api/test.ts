/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-10 17:32:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-03 00:13:16
 */

import fetch from '@/plugins/axios'

const login = (params) => fetch({ url: '/api/user/login', method: 'post', params })

const getInfo = (params) => fetch({ url: '/api/user/info', method: 'post', params })

export default { login, getInfo }
