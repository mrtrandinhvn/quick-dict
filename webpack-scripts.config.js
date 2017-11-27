const path = require("path");
module.exports = {
    context: path.join(__dirname),
    entry: {
        "browser_action/js/index": "./src/browser_action/scripts/index.ts"
    },
    output: {
        path: path.join(__dirname + "/built"),
        filename: "[name].bundle.js".toLowerCase(),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$|\.ts?$/,
                use: "ts-loader",
                exclude: /(node_modules|bower_components)/,
            },

            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
            },
        ]
    },
    plugins: [],
    resolve: {
        extensions: [".ts", ".js", "tsx"],
        modules: [
            path.resolve(__dirname),
            "node_modules"
        ]
    },
    externals: {}
};
