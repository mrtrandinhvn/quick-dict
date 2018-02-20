const styleConfig = require("./webpack-styles.config");
const scriptConfig = require("./webpack-scripts.config.js");
module.exports = env => {
    let configs = [styleConfig, scriptConfig];
    const devtool = (env && env.production) ? false : "cheap-module-eval-source-map";
    return configs.map(config => {
        // if (!config.devtool) { // allow a config to overwrite the global devtool. i.e: a config for .less, .sass can not use 'eval' option
        config.devtool = devtool;
        // }
        return config;
    });
};