const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    // TODO: Docs
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "index.css", to: "./", context: "./src" },
      { from: "vis.min.css", to: "./", context: "./node_modules/vis/dist" }
    ]),
    new HtmlWebpackPlugin(),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ["index.css", "vis.min.css"],
      append: true
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
