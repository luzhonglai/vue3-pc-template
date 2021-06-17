/* eslint-disable @typescript-eslint/camelcase */

/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:58:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-17 16:02:09
 */

// const pageConfig = require("./config/page.config");
// const { assetsCDN } = require("./common/config");

const path = require('path')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 跨域代理
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      // '/new-order-web': {
      //   target: 'http://192.168.161.146:8080/new-order-web',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/new-order-web': ''
      //   }
      // },
      '/new-order-web': {
        ws: true,
        target: 'http://192.168.172.82:8080/new-order-web',
        changeOrigin: true,
        pathRewrite: {
          '^/new-order-web': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // configureWebpack: {
  //   externals: {
  //     AMap: 'AMap' // 高德地图配置
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_v', resolve('src/views'))
      .set('_c', resolve('src/components'))

    // 设置svg-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 生产环境
    config.when(process.env.NODE_ENV === 'production', (config) => {
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugin('CompressionWebpackPlugin').use(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz', // Compression6.0+ 弃用[path].gz[query]
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )

      //   // 代码压缩
      config.plugin('TerserPlugin').use(
        new TerserPlugin({
          terserOptions: {
            // 生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )

      // 持久化缓存
      config.optimization.runtimeChunk('single')
    })
  }
}
