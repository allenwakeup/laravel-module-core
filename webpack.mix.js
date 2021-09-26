const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

require('laravel-mix-polyfill');
mix.js('resources/js/app.js', 'public/dist/module-core/js')
    .sass('resources/js/plugins/css/style.scss', 'public/dist/module-core/css')
    .setPublicPath('public/dist/module-core')
    .setResourceRoot('/dist/module-core/')
    //    .browserSync('127.0.0.1:8000')
    .polyfill({
        enabled: true,
        useBuiltIns: "usage",
        targets: {"firefox": "50", "ie": 11},
    })
    .webpackConfig({
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'ant-design-vue': 'antd',
            'moment': 'moment',
        },
        output: {
            publicPath: '/dist/module-core/',
            filename: '[name].js',
            chunkFilename : '[name].js?id=[chunkhash:20]'
        },
        resolve: {
            alias: {
                '@': path.resolve('resources/js/')
            }
        }
    })
    .version();
