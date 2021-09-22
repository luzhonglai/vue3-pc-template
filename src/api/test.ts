/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-10 17:32:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-22 16:42:37
 */

import fetch from '@/plugins/axios'

const changeRcardCardTypeGround = (params) =>
  fetch({ url: '/rcardTheme/changeRcardCardTypeGround', method: 'post', params })

const selectThemeSpecificationTree = (params) =>
  fetch({ url: '/rcardTheme/selectThemeSpecificationTree', method: 'post', params })

export default { changeRcardCardTypeGround, selectThemeSpecificationTree }
