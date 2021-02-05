/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:58:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-05 11:24:04
 */

const pageConfig = require("./config/page.config");
// const { assetsCDN } = require("./common/config");

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  page: pageConfig.apps,
  devServer: {
    port: 8080,
    open: true,
    proxy: {},
    overlay: {
      warnings: true,
      errors: true
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
};
