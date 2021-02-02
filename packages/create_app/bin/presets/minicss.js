const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function minicss() {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
        chunkFilename: '[id][contenthash].css',
        ignoreOrder: true,
      }),
    ],
  }
}

module.exports = minicss
