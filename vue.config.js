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

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('front', resolve('src/front'))
            .set('backViews', resolve('src/backViews'))
            .set('router', resolve('src/router'))
            .set('store', resolve('src/store'));
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
            }
        },
        // eslint-disable-next-line no-dupe-keys
        overlay: {
            warning: false
        }
    }
}
