/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-16 18:25:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-03 14:19:20
 */
/**
 * request全局配置
 */
interface ConfigOptions {
  baseUrl: object
  resultCode: number | string
  defaultHeaders: string
  requestTimeout: number
  isMock: boolean
  isDebugInfo: boolean | string
  isLocalMock: boolean
}

const config: ConfigOptions = {
  /**
   * api请求基础路径
   */
  baseUrl: {
    // 开发环境接口前缀
    dev: '/new-order-web',
    // 生产环境接口前缀
    pro: '/',
    // 测试环境接口前缀
    test: 'http://mockjs.test.cn',

    // 线上mock
    proMock: 'http://10.10.18.122:7300/mock/602228e4eb87c8001524ef8d/example',
    // 本地mock
    devMock: '/mock'
  },

  /**
   * 开启接口日志调试窗口
   *
   */
  isDebugInfo: true,

  /**
   *
   * 开启mock监听接口、监听真实接口，404、500 异常走mock代理请求
   */
  isMock: false,

  /**
   *
   *  mock服务坏境控制
   *  true--->本地devMock
   *  false-->线上proMock
   */
  isLocalMock: false,

  /**
   * 接口成功返回状态码
   */
  resultCode: '1',

  /**
   * 接口请求超时时间
   */
  requestTimeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json'
}

export default config
