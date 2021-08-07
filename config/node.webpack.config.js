const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = function() {
  return {
    devtool: false,
    entry: "./src/node/main.js",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "../dist/node-webpack"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: "production"
            }
          }
        },
      ]
    },
    resolve: {
      extensions: [".js"]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: { comparisons: false },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        })
      ]
    }
  };
};
