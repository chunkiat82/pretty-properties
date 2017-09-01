var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: './src/index.js',
    context: __dirname,
    node: {
        __filename: true,
        __dirname: true
    },
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/)
    ],
    devtool: 'sourcemap'
}