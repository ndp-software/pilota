var webpack        = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path           = require('path');
var env            = require('yargs').argv.mode;

var libraryName = 'pilota';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize : true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry : [
    __dirname + '/src/cmdBus.js',
    __dirname + '/src/submodelCmd.js'
  ],
  output  : {
    path           : __dirname + '/lib',
    filename       : outputFile,
    library        : libraryName,
    libraryTarget  : 'umd',
    umdNamedDefine : true
  },
  devtool : 'source-map',
  module  : {
    loaders : [
      {
        test    : /\.js$/,
        loader  : 'babel',
        exclude : /node_modules/
      },
      {
        test    : /\.js$/,
        loader  : "eslint-loader",
        exclude : /node_modules/
      }
    ]
  },
  //resolve : {
  //  root       : path.resolve('./src'),
  //  extensions : ['', '.js']
  //},
  plugins : plugins
};

module.exports = config;