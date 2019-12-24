const path = require("path");
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config');
const webpack = require('webpack')
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const config = merge(base, {
  entry: {
    client: path.resolve(__dirname, "./entry-client.js")
  },
  output: {
    publicPath:'http://localhost:8080/',
    path: path.resolve(__dirname, "../dist")
  },
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    contentBase: '../dist',
    port: 8080,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0'
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   filename: "index.client.html"
    // })
  ]
});
module.exports = config;