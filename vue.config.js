// const pageConfig = require("./config/page.config");
// const { assetsCDN } = require("./common/config");

// vue.config.js
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
    }
  }
}
