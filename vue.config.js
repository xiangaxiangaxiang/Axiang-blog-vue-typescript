const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('front', resolve('src/front'))
            .set('back', resolve('src/back'))
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
                target: 'http://127.0.0.1:8081',
                ws: true,
                changeOrigin: true
            },
            '/back': {
                target: 'http://127.0.0.1:8081',
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
