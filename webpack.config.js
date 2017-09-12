const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
    ?   ['./src/js/index.js']
    :   [
        './src/js/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
    ];

const plugins = DEVELOPMENT
    ?   []
    :   [ new webpack.HotModuleReplacementPlugin() ];

module.exports = {
    entry:entry,
    plugins:plugins,
    output:{
        path:path.resolve(__dirname,'./dist/js'),
        publicPath: "/dist/",
        filename:'bundle.js',
    },
    // module:{
    //     rules:[
    //         {
    //             test:/\.jsx?$/,
    //             loader:'babel-loader',
    //             options:{
    //                 presets:['es2015','stage-0']
    //             }
    //         }
    //     ],
    // },
}