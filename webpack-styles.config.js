const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "source-map",
    context: path.join(__dirname),
    entry: {
        "browser_action/css/index": "./src/browser_action/scss/index.scss",
        "content_scripts/css/index": "./src/content_scripts/scss/index.scss"
    },
    output: {
        path: path.join(__dirname + "/built"),
        filename: "[name].dummy".toLowerCase(),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader", options: { sourceMap: true } },
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ],
    resolve: {
        extensions: [".js", ".scss"],
    },
};