/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-29 18:02:55
 */

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/prettier',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint'
  ],

  parserOptions: {
    ecmaVersion: 2020
    // parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-inferrable-types': 'off', // 关闭类型推断
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any警告
    '@typescript-eslint/no-this-alias': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-var-requires': 0 // 关闭require警告
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
