const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const makePath = require('./makePath')

function cleanDirectory() {
  return {
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
    ],
  }
}


module.exports = cleanDirectory
