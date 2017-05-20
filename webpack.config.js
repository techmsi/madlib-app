const webpack = require('webpack');
const appFolder = 'app';

const pluginsList = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    minimize: true
  })
];

module.exports = {
  entry: `./${appFolder}/client.js`,
  output: {
    path: 'public/dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // devtool: 'cheap-module-source-map',
  watch: false,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: pluginsList
};
