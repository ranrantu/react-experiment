const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,'./dist/js'),
        filename:'bundle.js',
    },
    module:{
        // rules:[
        //     {
        //         test:/\.jsx?$/,
        //         include:[path.resolve(__dirname,'src')],
        //         loader:'babel-loader',
        //         options:{
        //             presets:['es2015','stage-0'],
        //         }
        //     }
        // ],
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\.jsx?$/
        })
    ]
}