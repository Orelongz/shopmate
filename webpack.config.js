const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const cleanWebpack = new CleanWebpackPlugin(['dist']);
const htmlPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: 'public/index.html'
});
const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
});
const styleLoader = (
  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
);
const dotenvPlugin = new Dotenv({
  path: './env',
  safe: true,
  systemvars: true,
  silent: true
});

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.s?css$/,
        use: [styleLoader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    // open: true,
    port: 8000,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  plugins: [dotenvPlugin, cleanWebpack, htmlPlugin, cssPlugin],
};
