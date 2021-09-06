/*
 * @Descripttion:  多页面打包配置
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-01-29 16:02:15
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-04 18:56:12
 */

import config from './index'
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const sourcePath = path.resolve(__dirname, '../src/pages')
const dirents = fs.readdirSync(sourcePath, { encoding: 'utf8', withFileTypes: true })
const appName = argv.appName || config.EnvPage.buildMoudle

const apps = {}

dirents
  .filter((dirent) => dirent.isDirectory())
  .forEach(
    (dirent) =>
      (apps[dirent.name] = {
        entry: `src/pages/${dirent.name}/index.ts`,
        // 模板来源
        template: `public/index.html`,
        // 在 dist/index.html 的输出
        // filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/${fileName}.html`,
        filename: `${dirent.name}.html`,
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', dirent.name]
      })
  )

const pages = {}

if (appName.length > 0) {
  if (Array.isArray(appName) == true) {
    for (const name of appName) {
      // eslint-disable-next-line no-prototype-builtins
      if (apps.hasOwnProperty(name)) {
        pages[name] = apps[name]
      }
    }
  } else if (appName !== '') {
    pages[appName] = apps[appName]
  }

  if (Object.keys(pages).length < 1) {
    console.error('------------------------------------------\n')
    console.error('无效的应用名称: ' + appName)
    console.error(`请确保它在 ${sourcePath} 文件夹中`)
    console.error('\n------------------------------------------\n')
    process.exit(-1)
  } else {
    console.info('------------------------------------------\n')
    console.info(`应用名称: ${appName} ----- 页面总数为：${Object.keys(pages).length}`)
    console.info('\n------------------------------------------\n')
  }
}

const mode = {
  apps: Object.keys(pages).length > 0 ? pages : apps,
  mode: process.env.NODE_ENV || 'development'
}

module.exports = mode
