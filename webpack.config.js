var webpack        = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path           = require('path');
var mode           = require('yargs').argv.mode;

var libraryName = 'pilota';

var plugins = [], outputFile;

if (mode === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize : true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry : __dirname + '/src/pilota.js',
  output  : {
    path           : __dirname + '/lib',
    filename       : outputFile,
    library        : libraryName,
    libraryTarget  : 'umd',
    umdNamedDefine : true
  },
  devtool : 'source-map',
  module  : {
    rules : [
      {
        test    : /\.js$/,
        loader  : 'babel-loader',
        exclude : /node_modules/
      }
    ]
  },
  plugins : plugins
};

module.exports = config;
