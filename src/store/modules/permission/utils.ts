// import { AppRouteRecordRaw } from '@/router/types'
// import path from 'path'
// import { isExternal } from '@/utils/validate'
import { getParentLayout } from '@/router/utils'

/* Layout */
const Layout = () => import('@/layout/index.vue')

// 用于后端请求，动态过滤路由
function getFilterRoutes(routes: any[]): any[] {
  const res = []
  for (const route of routes) {
    const data: any = {
      path: route.url,
      name: route.url,
      redirect: route.redirect
    }
    data.meta = Object.assign({}, route.meta || {}, {
      title: route.name || route.meta.title,
      icon: route.iconClass
    })

    if (route.router) {
      // 暂时特殊处理， 后期优化
      if (route.router === 'views/home/index') {
        delete route.children
      }
      // 动态加载路由文件，可根据实际情况进行自定义逻辑
      data.component =
        route.router === '#'
          ? Layout
          : route.router.includes('##')
          ? getParentLayout(route.router.split('##')[1])
          : // 必须加'.vue'后缀，而不能直接把'.vue'后缀写在component中。否则会报出警告。。
            () => import('@/' + route.router + '.tsx')
    }
    // recursive child routes
    if (route.children) {
      data.children = getFilterRoutes(route.children)
    }
    res.push(data)
  }

  /**
   * 设置404
   * 由于是动态路由，所以没配置到静态里，404路由需要在路由最后
   */
  // res.push({
  //   path: '/:path(.*)*',
  //   redirect: '/404',
  //   name: '404',
  //   meta: {
  //     hidden: true
  //   }
  // })

  return res
}

// 用于前端路由控制（非动态后端获取）, 路由过滤，主要用于权限控制
// const generateRoutes = (
//   routes: AppRouteRecordRaw[],
//   basePath = '/'
// ): AppRouteRecordRaw[] => {
//   const res: AppRouteRecordRaw[] = []

//   for (const route of routes) {
//     // skip some route
//     if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
//       continue
//     }

//     let onlyOneChild = null

//     if (
//       route.children &&
//       route.children.length === 1 &&
//       !route.meta.alwaysShow
//     ) {
//       onlyOneChild = isExternal(route.children[0].path)
//         ? route.children[0].path
//         : path.resolve(
//             path.resolve(basePath, route.path),
//             route.children[0].path
//           )
//     }

//     let data: any = null

//     // 如不需要路由权限，可注释以下逻辑
//     // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
//     const list = wsCache.get(appStore.userInfo).checkedNodes
//     // 开发者可以根据实际情况进行扩展
//     for (const item of list) {
//       // 通过路径去匹配
//       if (
//         isExternal(item.path) &&
//         (onlyOneChild === item.path || route.path === item.path)
//       ) {
//         data = Object.assign({}, route)
//       } else {
//         const routePath = path.resolve(basePath, onlyOneChild || route.path)
//         if (
//           routePath === item.path ||
//           (route.meta && route.meta.followRoute === item.path)
//         ) {
//           data = Object.assign({}, route)
//         }
//       }
//     }
//     // 如不需要路由权限，解注释下面一行
//     // data = Object.assign({}, route)

//     // recursive child routes
//     if (route.children && data) {
//       data.children = generateRoutes(
//         route.children,
//         path.resolve(basePath, data.path)
//       )
//     }
//     if (data) {
//       res.push(data as AppRouteRecordRaw)
//     }
//   }
//   return res
// }

export { getFilterRoutes }
