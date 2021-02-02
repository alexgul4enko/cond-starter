function files() {
  return {
    module: {
      rules: [
        {
          test: /\.(eot|ttf|woff|woff2|png|jpg|svg)$/,
          use: 'file-loader',
        },
      ],
    },
  }
}

module.exports = files
