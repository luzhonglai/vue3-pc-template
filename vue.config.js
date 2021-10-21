const path = require('path')
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin')
const HardSourWebpackPlugin = require('hard-source-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/dev': {
        target: 'https://api.imjad.cn',
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
    config.when(IS_PROD, (config) => {
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
            warnings: false,
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
    })

    config.when(IS_DEV, (config) => {
      config.optimization.runtimeChunk('single')
      config.plugin('cache').use(HardSourWebpackPlugin)
    })
  },
  configureWebpack: (config) => {}
}
