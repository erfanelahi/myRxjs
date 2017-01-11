'use strict';
const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: {
        'polyfills-vendor': [
            path.resolve(__dirname, 'node_modules/es6-shim/es6-shim.min.js'),
            path.resolve(__dirname, 'node_modules/reflect-metadata/Reflect.js'),
            path.resolve(__dirname, 'node_modules/zone.js/dist/zone.min.js'),
            './src/vendor.browser'
        ],
        'app': './src/main.browser.aot'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: "[name].chunk.bundle.js"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills-vendor']
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: 'assets'
        }]),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        }),
        new webpack.NoErrorsPlugin(),
        new UglifyJsPlugin({
            beautify: false,
            minimize: true,
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\./,
            threshold: 0,
            minRatio: 0.8
        })
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?tsconfig=tsconfig.prod.json',
                    'angular2-router-loader?genDir=src/compiled/src/app&aot=true'
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            { loader: 'raw', test: /\.(css|html)$/, exclude: ['./src/index.html'] },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        root: [path.join(__dirname, 'src')],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js', '.json']
    },
    devtool: false,
    debug: false,
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true
    }
};