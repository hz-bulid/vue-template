/*
 * @Author: your name
 * @Date: 2021-10-22 14:39:05
 * @LastEditTime: 2021-10-22 15:50:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\.eslintrc.js
 */
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "no-useless-escape": 0,
    "prettier/prettier": "off"
  }
}