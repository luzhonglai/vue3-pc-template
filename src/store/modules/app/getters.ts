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
