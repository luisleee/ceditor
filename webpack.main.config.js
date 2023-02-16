const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
module.exports = merge.default(webpackBaseConfig, {
    entry: "./src/main/index.js",
    output: {
        path: path.join(__dirname, "dist", "main"),
        filename: "index.js",
    },
    target: "electron-main",
});
