import { setStoreState } from '@/store/utils'
import { constantRouterMap } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
import { deepClone } from '@/utils/utils'

const mutations = {
  __set(state: any, msg: { key: string; val: any }) {
    state[msg.key] = msg.val
  },
  // SET_ISADDROUTERS(state: boolean): void {
  //   setStoreState('permission', 'isAddRouters', state)
  // },
  SET_ROUTERS(routers: AppRouteRecordRaw[]): void {
    // 动态路由，404一定要放到最后面
    setStoreState('permission', 'addRouters', routers)

    // 渲染菜单的所有路由
    setStoreState('permission', 'routers', deepClone(constantRouterMap, ['component']).concat(routers))
  }
}

export default mutations
