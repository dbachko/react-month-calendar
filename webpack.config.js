'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var config = {
  libFileName: 'Month',
  libSrc: './lib/scripts/Month.jsx'
};

module.exports = {
  entry: config.libSrc,
  output: {
    path: __dirname + '/dist',
    filename: config.libFileName + '.js',
    libraryTarget: 'umd',
    library: 'Month'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    moment: 'moment'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.(js|jsx)$/,
      loader: 'jsx-loader?insertPragma=React.DOM'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/, loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ]
};
