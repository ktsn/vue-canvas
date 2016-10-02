const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../examples'),
  entry: makeEntries([
    'basic'
  ]),
  output: {
    path: path.resolve(__dirname, '../examples'),
    filename: '[name]/__build__.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.js$/, loader: 'buble', exclude: /node_modules/ }
    ]
  },
  devtool: 'inline-source-map'
}

function makeEntries (names) {
  const res = {}
  names.forEach(name => {
    res[name] = `./${name}/main.js`
  })
  return res
}
