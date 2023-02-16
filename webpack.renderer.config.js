const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
module.exports = merge.default(webpackBaseConfig, {
    entry: "./src/renderer/index.js",
    output: {
        path: path.join(__dirname, "dist", "renderer"),
        filename: "index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/renderer/index.html",
        }),
    ],
    target: "electron-renderer",
});
