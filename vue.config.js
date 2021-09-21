/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:58:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-16 17:46:04
 */

const path = require('path')
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin')
const HardSourWebpackPlugin = require('hard-source-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/dev': {
        target: 'http://10.10.18.150:8080/ecard-admin-web',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_v', resolve('src/views'))
      .set('_c', resolve('src/components'))

    config.module.rule('svg').exclude.add(resolve('src/icons'))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()

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

      config
        .plugin('TerserPlugin')
        .use(
          new TerserPlugin({
            terserOptions: {
              compress: true
            },
            sourceMap: false,
            parallel: true
          })
        )
        .end()

      // 持久化缓存
      config.optimization.runtimeChunk('single')
      config.plugin('cache').use(HardSourWebpackPlugin)
    })
  }
}
