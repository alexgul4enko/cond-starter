const makePath = require('./makePath')

function setOutput(pathToDirectory) {
  return {
    output: {
      path: makePath(pathToDirectory),
      filename: '[name][contenthash].js',
      chunkFilename: '[id][contenthash].chunk.js',
    },
  }
}

module.exports = setOutput
