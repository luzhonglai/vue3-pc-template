/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 10:40:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-05 17:34:17
 */

module.exports = {
  root: false,
  env: {
    node: false
  },
  extends: [
    'plugin:vue/essential',
    "@vue/typescript/recommended",
    "@vue/standard",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    '@typescript-eslint/no-inferrable-types': 'off', // 关闭类型推断
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any警告
    '@typescript-eslint/no-this-alias':'off'
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
