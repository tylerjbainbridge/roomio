const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js',
    // entry point in resources/assets/js/
  ],

  output: {
    filename: 'bundle.js',
    // output public/js/
    path: resolve(__dirname, 'public/js'),
    publicPath: 'http://localhost:8080/public/',
    // output path for dev (include in index.blade.php).
  },

  context: resolve(__dirname, 'resources/assets/js'),
  // where the js code lives.

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'public/js/'),
    publicPath: 'http://localhost:8080/public/',
    proxy: {
      '/api/*': 'http://localhost:8888',
    },
    stats: 'errors-only',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
        SOCKET: JSON.stringify('http://localhost:8081'),
      },
    }),
  ],
};
