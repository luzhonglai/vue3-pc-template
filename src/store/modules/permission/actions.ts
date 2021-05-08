import mutations from './mutations'
import wsCache from '@/utils/cache'
import { AppRouteRecordRaw } from '@/router/types'
import { getFilterRoutes } from './utils'
import store from '@/store'
const permissionActions = {
  GenerateRoutes(): Promise<unknown> {
    return new Promise((resolve) => {
      // 路由权限控制
      let routerMap: AppRouteRecordRaw[] = []
      // if (wsCache.get(appStore.userInfo).roleName === 'admin') {
      //   // 模拟前端控制权限
      //   routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']))
      // } else {
      // 模拟后端控制权限
      routerMap = getFilterRoutes(wsCache.get(store.state.app.menuPermission))
      // }
      // const routerMap: AppRouteRecordRaw[] = generateRoutes(deepClone(asyncRouterMap, ['component']))
      mutations.SET_ROUTERS(routerMap)
      resolve()
    })
  }
}

type PermissionActionsType = typeof permissionActions

export { PermissionActionsType }
export default permissionActions
