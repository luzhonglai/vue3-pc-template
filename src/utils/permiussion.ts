/*
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2022-12-04 22:01:00
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 02:53:56
 * @FilePath: \vue3-pc-template\src\utils\permiussion.ts
 */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 进度条样式
import wsCache from '@/utils/cache'
import { dispatchAction, setStoreState } from '@/store/utils'
// import { PermissionActionsType } from '@/store/modules/permission/actions'


const whiteList: string[] = ['/login'] // 白名单




NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  // 获取用户token状态
  const hasToken = wsCache.get('token') || false
  NProgress.start()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      try {
        // 获取用户信息
        const { roles } = await store.dispatch('user/getInfo')
        // 获取当情角色可访问路由
        const accessoRoutes = await store.dispatch('permission/GenerateRoutes', roles)

        // 添加到路由
        router.addRoute(accessoRoutes)
        // replace true 确保路由添加完毕
        next({ ...to, replace: true })
      } catch (error) {
        // 错误重置令牌， 从新登录(-->  网路错误、令牌失效)
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        alert(error || '未知错误')
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 路由白名单路过
      next()
    } else {
      // 重定向登录
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to: any) => {
  document.title = to.meta.title || "",
  NProgress.done() // 结束进度条
})
