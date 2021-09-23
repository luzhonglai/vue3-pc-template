<!--
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-07-23 23:53:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-22 16:46:58
-->

# multiple-vue3-pc (tsx 体验版)

> 🔥 🎉 Vue 3.0 + TypeScript + Vue-Router 4.0 + Element-Plus + Axios + Vuex 多页面开发模版

## 模版亮点

- 多页面模块开发
- mock 数据模拟
- 接口 Log 窗口调试，
- Eelment-plus 组件按需加载
- less/sass
- Webpack 编译优化
- Vuex 封装
- Axios 封装
- Eslint+Pettier 代码规范

### vue 3.0 记录

```javascrip

// 添加全局api
app.config.globalProperties.$api = { ...api }
app.config.globalProperties.$fetch = fetch
app.config.globalProperties.$wsCache = wsCache

// 如何去使用
const { proxy:{ $api, $fetch, $wsCache }: any = getCurrentInstance() // 获取全局方法
 
$api.user.getInfo()
$fetch.get()

$wsCache.get('userInfo')
$wsCache.set('token')

```

### 功能、组件的封装

- 按钮权限 ✅
- 动态路由 ✅
- 性能监控 ✅
- 请求日志 ✅
- CDN 图片上传

### 准备工作

```bash
#依赖安装方式
npm install

#安装依赖
yarn install

#启动
yarn run serve
```

### 优化总结

```javascript
/* 
    编译优化、热更新缓存原理、提升40%
*/
const HardSourWebpackPlugin = require('HardSourWebpackPlugin')
```

### 最后
