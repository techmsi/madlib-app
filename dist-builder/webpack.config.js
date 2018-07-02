const path = require('path');
const webpack = require('webpack');
const appFolder = path.resolve('..', 'src');
const exclude = /node_modules/;

module.exports = {
  entry: `${appFolder}/index.js`,
  resolve: { 
    modules: [
      appFolder,
      path.resolve('../node_modules'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude,
        include: appFolder,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      }
    ]
  },
  stats: {
    assets: false,
    reasons: false
  },
  plugins: [new webpack.HashedModuleIdsPlugin()]
};
