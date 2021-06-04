/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-02 09:20:44
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-04 16:17:32
 */

import { fetch } from '@/plugins/axios'

const FindOrderList = (params) => fetch({ url: '/overTimeOrder/v1/findByPage', method: 'post', params })

const OrderDetail = (id) => fetch({ url: `/overTimeOrder/v1/findDetailById/${id}`, method: 'get' })

export { FindOrderList, OrderDetail }
