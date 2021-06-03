/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-02 09:20:44
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-02 09:59:24
 */

import { fetch } from '@/plugins/axios'

const FindOrderList = (params) =>
  fetch({ url: '/overTimeOrder/v1/findOverTimeOrderByTradeFlowNo', method: 'post', params })

const OrderDetail = (params) => fetch({ url: '/overTimeOrder/v1/findOverTimeOrderDetail', method: 'post', params })

export { FindOrderList, OrderDetail }
