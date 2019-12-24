const path = require("path");
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(base, {
    target: "node",
    entry: path.resolve(__dirname, "./entry-server.js"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        libraryTarget: 'commonjs2'
    },
    devtool: '#source-map',
    externals: [nodeExternals()], //排除node_modules
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.ssr.html"),
            filename: "index.ssr.html",
            excludeChunks: ['main']
        })
    ]
});