import store from '@/store'

const permissonGetter = {
  // 获取按钮权限集
  buttonPermissions() {
    return store.state.permission.buttonPermissions
  }
}

type PermissionGetterType = typeof permissonGetter
export { PermissionGetterType }
export default permissonGetter
