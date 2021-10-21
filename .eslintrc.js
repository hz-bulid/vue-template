/*
 * @Author: your name
 * @Date: 2021-03-26 11:55:51
 * @LastEditTime: 2021-04-03 12:40:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lerna-cil2\.eslintrc.js
 */
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended"
    // "eslint:recommended",
    // "plugin:vue/essential",
    // "plugin:@typescript-eslint/eslint-recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/no-multiple-template-root": 0,
    "no-undef":0,
    "space-before-function-paren":  ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "@typescript-eslint/explicit-module-boundary-types":0,
    '@typescript-eslint/no-unused-vars': ["off", "never"],
    "@typescript-eslint/no-explicit-any":0,
    "@typescript-eslint/no-empty-function": 0,
    "vue/no-v-model-argument":0,
    "vue/no-v-for-template-key":0,
    "comma-dangle": ["off", "never"],
    "no-use-before-define": 2,
    "comma-spacing":1,
    "no-unused-vars": ["off", "never"],
    "indent": ["error", 2,{"SwitchCase":1}],//缩进风格
    "eol-last": 2,// 文件末尾强制换行
    "new-cap": 2,
    "quotes": 2,
    // "@typescript-eslint/semi": 2,//语句强制分号结尾
    // "vue/semi": 2,//语句强制分号结尾
    // "semi": 2,//语句强制分号结尾0
  }
};