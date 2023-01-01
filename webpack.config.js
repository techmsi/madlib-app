const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const appFolder = path.resolve(__dirname, 'src');
const outputFolder = path.resolve(__dirname, 'dist');
const htmlTemplateFolder = path.join(__dirname, 'public', 'index.html');
const exclude = /node_modules/;

const cssRule = {
  test: /\.css$/,
  exclude,
  use: [
    'style-loader',
    'css-loader', // for styles
  ],
};

const jsRule = {
  test: /\.?js$/,
  exclude,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
};

const devServer = {
  port: '5000',
  open: true,
  hot: true,
  liveReload: true,
};

const html = new HtmlWebpackPlugin({
  template: htmlTemplateFolder,
});

const envVariables = new Dotenv();

const optimization = { moduleIds: 'deterministic' };
const webpackConfig = {
  mode: process.env.MODE || 'development',
  watch: process.env.MODE === 'development',
  entry: `${appFolder}/index.js`,
  output: {
    path: outputFolder,
    publicPath: '/',
  },
  devServer,
  resolve: {
    modules: [
      appFolder,
      path.resolve('../node_modules'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'web',
  module: {
    rules: [jsRule, cssRule],
  },
  stats: {
    preset: 'minimal',
  },
  optimization,
  plugins: [html, envVariables],
};

module.exports = webpackConfig;
