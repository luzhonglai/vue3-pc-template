<!--
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-07-23 23:53:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-30 14:04:18
-->

# vue3-h5-template

> 🔥 🎉 Vue 3.0 + TypeScript + Vue-Router 4.0 + Vant + Axios + Vuex

## 基础支持

> 模版开发之前、我们做了以下准备工作

- 搭建开发环境
- 约定代码规范
- 封装 API 请求
- 请求日志窗口
- 权限管理
- 多环境发布 (对应 serve,build)
  - dev
  - test
  - prod

## 插件介绍

### vue3

```js

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

### 使用

使用 `yarn`：

```bash
#安装方式
yarn install

#运行
yarn run serve
```

使用 `npm`：

```bash
# 安装依赖
npm install

# 运行;
npm run serve
```

### 优化总结

```javascriptw
/*
    编译优化、热更新缓存原理、提升40%
*/
const HardSourWebpackPlugin = require('HardSourWebpackPlugin')
```

### 最后
