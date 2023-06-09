import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: { index: "./src/main" },
  devtool: "inline-source-map",
  devServer: {
    // https://webpack.js.org/guides/hot-module-replacement/
    static: "./dist",
    hot: true,
  },
  plugins: [
    // https://webpack.js.org/guides/output-management/
    new HtmlWebpackPlugin({
      title: "vanilla-webpack-typescript",
      favicon: "hash-favicon.png",
    }),
  ],
  module: {
    rules: [
      {
        // https://webpack.js.org/guides/typescript/
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // https://webpack.js.org/guides/asset-management/
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    // https://webpack.js.org/guides/caching/
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    // https://webpack.js.org/guides/code-splitting/
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
