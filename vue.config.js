/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-10-18 17:23:14
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 10:43:10
 */

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin') // 代码压缩
const  AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: process.env.BASE_URL,
  lintOnSave: false, // 关闭eslint 检查
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    client: {
      overlay: {
        warnings: false, //不显示警告
        errors: false   //不显示错误
      }
    },
    proxy: {
      '/dev': {
        target: 'https://api.imjad.cn',
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_v', resolve('src/views'))
      .set('_c', resolve('src/components'))
      .end()

    config.module.rule('svg').exclude.add(resolve('src/icons'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()

      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()

    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()



    /* 生产部署处理 */
    config.when(IS_PROD, (config) => {
      config.plugin('TerserPlugin').use(
        new TerserPlugin({
          extractComments: false, // 是否将注释提取到一个单独的文件中
          terserOptions: {
            warnings: false, // 打包提示
            compress: {
              drop_debugger: true, // 注视点console
              drop_console: true,
              pure_funcs: ['console.log'] // 去除console
            }
          },
          cache: true,
          sourceMap: false,
          parallel: false
        })
      )
    })

    /* 开发处理 */
    config.when(IS_DEV, (config) => {
      config.optimization.runtimeChunk('single')
    })
  },

  configureWebpack:{
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
