/*
 * @Descripttion:  多页面打包配置
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-01-29 16:02:15
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-11 12:42:45
 */


'use strict';
let buildMoudle = []
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const appName = argv.appName || buildMoudle;

const sourcePath = path.resolve(__dirname, '../src/pages');
const dirents = fs.readdirSync(sourcePath, { encoding: 'utf8', withFileTypes: true });

let apps = {} 
dirents.filter(dirent => dirent.isDirectory())
  .forEach(dirent => (apps[dirent.name] = {
      entry: `src/pages/${dirent.name}/index.ts`,
      // 模板来源
      template: `public/index.html`,
      // 在 dist/index.html 的输出
      // filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/${fileName}.html`,
      filename:`${dirent.name}.html`,  
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', dirent.name]
    }
  ));

let pages = {}
if(appName) {
  if(Array.isArray(appName) == true) {
    for (const key in appName) {
      if (apps.hasOwnProperty(key)) {
        pages[key] = apps[key]
      }
    }
  } else if(appName !== '') {
    pages[appName] = apps[appName]
  }
  
  if(Object.keys(pages).length < 1) {
    console.error('------------------------------------------\n');
    console.error("无效的应用名称: " + appName);
    console.error(`请确保它在 ${sourcePath} 文件夹中`);
    console.error('\n------------------------------------------\n');
    process.exit(-1);
  } else {
    console.error('------------------------------------------\n');
    console.error(`多页面应用名称: ${appName} ----- 页面总数为：${Object.keys(pages).length}`);
    console.error('\n------------------------------------------\n');
  }
}

const config = {
  apps: Object.keys(pages).length > 0 ? pages : apps,
  mode: process.env.NODE_ENV || 'development',
};

module.exports = config;
