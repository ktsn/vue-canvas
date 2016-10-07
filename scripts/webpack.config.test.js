const path = require('path')
const glob = require('glob')

const testFiles = glob.sync(resolve('../test/**/*.ts'))

module.exports = {
  entry: testFiles,
  output: {
    path: resolve('../.tmp'),
    filename: 'test.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'webpack-espower!ts' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  devtool: 'source-map'
}

function resolve (p) {
  return path.resolve(__dirname, p)
}