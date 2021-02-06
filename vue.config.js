/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:58:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-06 23:15:29
 */

// const pageConfig = require("./config/page.config");
// const { assetsCDN } = require("./common/config");

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "./",
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
};
