const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        'app':'./src/js/app.jsx',
        'vendor':['react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'./dist/'),
        filename:'[name].[chunkHash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{
                    presets:[
                        ['env',{modules:false}],
                        'react'
                    ],
                    plugins:[
                        'babel-plugin-transform-class-properties'
                    ]
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','manifest'],
            minChunks: Infinity,
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8001
    }
}
