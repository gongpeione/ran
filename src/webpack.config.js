const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname);
const parentDir = path.resolve(__dirname, './../');

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
});
const extract = new ExtractTextPlugin('style.css');

module.exports = {
    entry: root + '/index.js',
    output: {
        path: parentDir,
        publicPath: '',
        filename: 'index.js',
        chunckFileName: '[id].bundle.js'
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ['eslint'],
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            // {
            //     test: /\.html$/,
            //     loader: 'file?name=[name].[ext]'
            // },
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0&cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.css$|\.scss$/,
                loader: extract.extract('css!postcss!sass-loader')
                // loaders: ['style', 'css?minimize&-autoprefixer', 'postcss']
            }
        ]
    },
    plugins: [ commonsPlugin, extract ],
    // watch: true,

    postcss: function () {
        return [
            autoprefixer({
                remove: false,
                browsers: ['ie >= 9', '> 1% in CN'],
            }),
            precss
        ];
    },
    eslint: {
        // configFile: path.resolve(__dirname, './.eslintrc'), 
        failOnWarning: true, 
        failOnError: true, 
        cache: true, 
    },

    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
        port: 2333
    },
    devtool: "#source-map",
}


