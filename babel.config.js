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
  // element-plus 按需引入
  plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
