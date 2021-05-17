/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-07 13:55:24
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-11 17:33:30
 */
import store from '@/store'

const appGetter = {
  // 获取云角色列表
  collapsed() {
    return store.state.app.collapsed
  }
}

type AppGetterType = typeof appGetter
export { AppGetterType }
export default appGetter
