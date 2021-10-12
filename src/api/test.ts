/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-10-12 11:27:22
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-10-12 13:12:01
 */
import fetch from '@/plugins/axios'

const test = (params) => fetch({ url: '/cloudmusic/', method: 'get', params })
// const getBanner = (params) => fetch({ url: '/banner', method: 'post', params }) //个性推荐轮播
export default { test }
