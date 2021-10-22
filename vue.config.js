/* eslint-disable no-undef */
require('events').EventEmitter.defaultMaxListeners = 0
const path = require("path");
const webpack = require('webpack')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir);

const APP_NAME = require('./package.json').name
const version = require('./package.json').version

const NODE_ENV = process.env.NODE_ENV || 'development'

log('APP_NAME: ', `${APP_NAME} ${version}`)
log('NODE_ENV: ', NODE_ENV)

const IP = '192.168.10.148';

const PORT = 8080;

const plugins = [
    new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        "windows.$": "jquery"
    })
]
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css$/,
            // 超过4kb压缩
            threshold: 4096
        })
    )
}

module.exports = {
    // 默认'/'，部署应用包时的基本 URL
    publicPath: "./",

    // 输出文件目录
    outputDir: 'dist',

    assetsDir: 'static',

    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set("@", resolve("src"))
    },

    productionSourceMap: false,

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    parallel: require('os').cpus().length > 1,

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/style/utils.scss";`
            }
        },
        extract: false
    },

    // webpack-dev-server 相关配置
    devServer: {
        // host: 'localhost',
        port: PORT,
        https: false,
        hotOnly: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            // websocket
            '/wsuri/*': {
                target: 'ws://' + IP + ':6220',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/wsuri': '/'
                }
            },
            // 网关代理
            '/api/*': {
                target: 'http://' + IP + ':6288',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        },
    },

    configureWebpack: {
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: "securityWeb",
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd',
            // 按需加载相关，设置为 webpackJsonp_securityWeb 即可
            jsonpFunction: `webpackJsonp_securityWeb`,
        },
        plugins: plugins
    },

    transpileDependencies: [],
    lintOnSave: false
}

function log(label, content) {
    console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
