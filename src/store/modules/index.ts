const files = require.context('.', true, /\.ts$/)
const modules: any = {}

files.keys().forEach((key) => {
  if (key === './index.ts') return
  const path = key.replace(/(\.\/|\.ts)/g, '')
  const [namespace, imported] = path.split('/')
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: true
    }
  }
  modules[namespace][imported] = files(key).default
})

export default modules
