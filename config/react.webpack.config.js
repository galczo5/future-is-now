const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = function() {
  return {
    devtool: false,
    entry: "./src/react/main.jsx",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "../dist/react-webpack"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: "production",
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        },
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
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
