import { AppRouteRecordRaw } from '@/router/types'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {},
    component: () => import('@/views/hello.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[]
})

export { constantRouterMap }
export default router
