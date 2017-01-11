'use strict';
const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': [
            path.resolve(__dirname, 'node_modules/es6-shim/es6-shim.min.js'),
            path.resolve(__dirname, 'node_modules/reflect-metadata/Reflect.js'),
            path.resolve(__dirname, 'node_modules/zone.js/dist/zone.min.js'),
            path.resolve(__dirname, 'node_modules/zone.js/dist/long-stack-trace-zone.min.js')
        ],
        'vendor': './src/vendor.browser',
        'app': './src/main.browser'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: "[name].chunk.bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
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
        new ForkCheckerPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:3000/', browser: 'chrome' })
    ],
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
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
    debug: true,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: "localhost"
    }
};