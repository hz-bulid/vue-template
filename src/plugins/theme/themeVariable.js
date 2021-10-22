/*
 * @Descripttion:
 * @version:
 * @Author: xKai
 * @Date: 2019-11-06 17:16:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-28 17:58:02
 */
import { colourBlend } from '@/utils/util'

// 明亮
const simple = {
  '--primary': '#388FF3',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#388FF3',
  '--text-regular': '#666666',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#EEEEEE', // 较浅边框颜色
  '--background-color-base': '#F5F5F5', // 基础背景色
  '--table-header-background': '#f6f8fa', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#FFFFFF',
  '--black': '#000000'
}

// 护眼
const eyehelp = {
  '--primary': '#66C86E',
  '--success': '#00dd98',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#66C86E',
  '--text-regular': '#666666',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED',
  '--border-color-lighter': '#EEEEEE',
  '--background-color-base': '#C6EBCA',
  '--table-header-background': 'rgba(255,255,255,0.3)',
  '--header-bg': '#e7f0f7', // 顶部导航背景
  '--header-padding-color': '#cdd0d7', // 顶部导航右侧间隔
  '--aside-bg': '#e7f0f7', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#f5fbff', // 侧边栏三级菜单背景
  '--contrast-color': '#c8d8e4', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#6d89a4', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#779eb7', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff0101',
  '--second-risk': '#ff0101',
  '--threeLevels-risk': '#ff0101',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#CEEDD1',
  '--black': '#000000'
}

// 复古
const retro = {
  '--primary': '#CDC27D',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#CDC27D',
  '--text-regular': '#666666',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#EEEEEE', // 较浅边框颜色
  '--background-color-base': '#F2EFDD', // 基础背景色
  '--table-header-background': 'rgb(246, 248 ,250, 0.4)', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#F7F5EA',
  '--black': '#000000'
}

// 海天
const haitian = {
  '--primary': '#4a69b7',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#4a69b7',
  '--text-regular': '#101410',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#c7d2dd', // 较浅边框颜色
  '--background-color-base': '#dce2f1', // 基础背景色
  '--table-header-background': '#dce2f1', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#e9edf6',
  '--black': '#e9edf6'
}

// 暗黑
const dark = {
  '--primary': '#388FF3',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#388FF3',
  '--text-regular': '#ddd',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#414143', // 较浅边框颜色
  '--background-color-base': '#19191C', // 基础背景色
  '--table-header-background': 'rgb(246, 248 ,250, 0.2)', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#25252A',
  '--black': '#ffffff'
}

// 深邃
const deep = {
  '--primary': '#50a1ff',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#50a1ff',
  '--text-regular': '#a0b4c8',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#414143', // 较浅边框颜色
  '--background-color-base': '#16202F', // 基础背景色
  '--table-header-background': 'rgb(183, 186, 189, 0.1)', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#1C283B',
  '--black': '#e9edf6'
}
// 新年
const newYear = {
  '--primary': '#ffe82a',
  '--success': '#27CBA6',
  '--warning': '#FA930E',
  '--danger': '#F55252',
  '--info': '#999999',
  '--text-primary': '#ffe82a',
  '--text-regular': '#ffffff',
  '--text-placeholder': '#CCCCCC', // select禁选
  '--border-color-light': '#E4E7ED', // 边框色灯
  '--border-color-lighter': '#B12C0F', // 较浅边框颜色
  '--background-color-base': '#920909', // 基础背景色
  '--table-header-background': 'rgb(246, 248, 250 ,0.2)', // 表头背景
  '--header-bg': '#1f2e54', // 顶部导航背景
  '--header-padding-color': '#364773', // 顶部导航右侧间隔
  '--aside-bg': '#101f30', // 侧边栏
  '--aside-second-color': '#b4c1d4', // 侧边栏三级菜单字体颜色
  '--aside-second-bg': '#031020', // 侧边栏三级菜单背景
  '--contrast-color': '#0c55a9', // 辅助对比色
  '--tag-bg': '#fafafa', // tag标签背景
  '--sideline-bg': '#0b7dff', // 顶部菜单边线背景
  '--tag-close-color': '#c6c6c6',
  '--scrollbar-thumb-bg': '#CCCCCC', // 滚动条里面小方块
  '--scrollbar-track-bg': '#f0f0f0', // 滚动条里面轨道
  '--inverse-color': '#fff', // 反色
  '--custom-undisposed': '#ffc155', // 未处理
  '--undertint--border': '#f2f5f8', // 浅色边框
  '--red-warn': '#ff0000', // 红色警告、通知
  '--tag-primary': '#00e0ff',
  '--primary-risk': '#ff182e',
  '--second-risk': '#ff8543',
  '--threeLevels-risk': '#00e4ff',
  '--success-light': '#d4f5ed',
  '--warning-light': '#fee9cf',
  '--danger-light': '#fddcdc',
  '--info-light': '#ebebeb',
  '--success-lighter': '#e9faf6',
  '--warning-lighter': '#fff4e7',
  '--danger-lighter': '#feeeee',
  '--info-lighter': '#f5f5f5',
  '--white': '#A30A0A',
  '--black': '#000000'
}

// light或lighter为渐变色
const setPrimaryLight = (data) => {
  const white = data['--white']
  const primary = data['--primary']
  for (let i = 1; i < 10; i++) {
    const color = colourBlend(white, primary, i / 10)
    data['--primary-light-' + i] = color
  }
  data['--border-color-extra-light'] = data['--primary-light-2']
  return data
}

export const themeList = {
  // 语法规定前面要加--
  simple: setPrimaryLight(simple),
  eyehelp: setPrimaryLight(eyehelp),
  retro: setPrimaryLight(retro),
  dark: setPrimaryLight(dark),
  haitian: setPrimaryLight(haitian),
  deep: setPrimaryLight(deep),
  newYear: setPrimaryLight(newYear),
}
