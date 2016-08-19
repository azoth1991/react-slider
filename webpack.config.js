var path = require('path');
var webpack = require('webpack');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
if (process.env.NODE_ENV == 'mock') {
  var fetchPath = path.resolve(__dirname, 'app/lib/fetch-jsonp-mock');
} else {
  var fetchPath = path.resolve(__dirname, 'app/lib/fetch-jsonp');
}
module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'app/index.js')
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8080'
  },
  resolve: {
    alias: {
      'fetchJsonp': fetchPath
    }
  },
  output: {path: path.resolve(__dirname, 'dev'), filename: 'bundle.js'},
  plugins: [
    new webpack.ProvidePlugin({
      "FetchJsonp": 'fetchJsonp'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader'}
    ],
    noParse: [pathToReact]
  }
};
