
module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                    loader: "babel-loader",
            },
        ],
    },
    devtool: 'source-map',
};
