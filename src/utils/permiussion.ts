import router from './router'
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 进度条样式
import store from '@/store'
import wsCache from '@/utils/cache'
import getPageTitle from '@/utils/getPageTitle'
import { PermissionActionsType } from '@/store/modules/permission/actions'
import { dispatchAction, setStoreState } from '@/store/utils'

const whiteList: string[] = ['/login'] // 白名单
NProgress.configure({ showSpinner: false }) // NProgress configuration

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
        router.addRouters(accessoRoutes)
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
  document.title = getPageTitle(to.meta.title, store.state.app.title)
  NProgress.done() // 结束进度条
})
