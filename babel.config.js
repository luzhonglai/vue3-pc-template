module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 按需加载样式
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ]
}
