/*
 * @Descripttion:  pinia  demo
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2022-01-10 08:46:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2022-01-17 00:51:40
 */

import { defineStore } from 'pinia'

export const storeUser = defineStore({
  id: 'user',
  state: () => {
    return {
      name: 'rare'
    }
  },
  actions: {
    addNum(num) {
      this.name += num
    }
  },
  getters: {
    nameLength: (state) => state.name.length
  }
})
