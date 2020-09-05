const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

function addStyleResource (rule) {
    rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
        patterns: [
            path.resolve(__dirname, 'src/common/stylus/variables.styl')
        ]
    })
}

const cdn = {
    css: [
        // element-ui css
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.9.2/theme-chalk/index.css'
    ],
    js: [
        // vue must at first!
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        // vue router
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.5/vue-router.min.js',
        // vuex
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
        // element-ui js
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.9.2/index.js',
        // echarts
        'https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.common.min.js',
        'https://unpkg.com/browse/echarts@4.8.0/theme/macarons.js',
        // axios
        'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
        // lodash
        'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.19/lodash.min.js'
    ]
}

module.exports = {
    assetsDir: 'static',
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('frontViews', resolve('src/frontViews'))
            .set('backViews', resolve('src/backViews'))
            .set('router', resolve('src/router'))
            .set('store', resolve('src/store'));
        config.plugin('html').tap(args => {
            args[0].cdn = {
                css: [],
                js: []
            }
            return args
        })
        config.when(process.env.NODE_ENV === 'production', config => {
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'element-ui':'ELEMENT',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts'
            })
            config.plugin('html').tap(args => {
                args[0].cdn = cdn
                return args
            })
        })
    },
    configureWebpack: config => {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')
        const TerserPlugin = require('terser-webpack-plugin')
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.mode = 'production'
            // 将每个依赖包打包成单独的js文件
            // config.plugins.push(new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: /\.js$|\.css|\.jpg/,
            //     threshold: 10240,
            //     minRatio: 0.8,
            //     deleteOriginalAssets: true
            // }))
            config.plugins.push(
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    sourceMap: false,
                    terserOptions: {
                        output: {
                            comments: false,
                            beautify: false
                        },
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        },
                        mangle: true, // Note `mangle.properties` is `false` by default.
                    },
                    extractComments: false
                })
            )
        } else {
            // 为开发环境修改配置
            config.mode = 'development'
        }
    },
    devServer: {
        port: 8088,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/front': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
            '/back': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
            '/static': {
                target: 'http://localhost:8012',
                ws: true,
                changeOrigin: true
            }
        },
        // eslint-disable-next-line no-dupe-keys
        overlay: {
            warning: false
        }
    }
}
