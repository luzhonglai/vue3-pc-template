/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-29 18:07:01
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-11 15:57:36
 */

/* --------------------------------- 环境配置 封装 -------------------------------- */

const mode = process.env.BABEL_MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/dev',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  },
  test: {
    baseApi: '/dev',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  },
  prod: {
    baseApi: '/prod',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  }
}

/* -------------------------------- 多页面 打包配置 -------------------------------- */

const EnvPage = {
  buildMoudle: 'buildView'
}

export default {
  mode,
  EnvPage,
  ...EnvConfig[mode]
}
