const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    plugins: [
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    ]
};
