const HtmlWebpackPlugin = require('html-webpack-plugin')
const makePath = require('./makePath')

function HTMLTemplate() {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: makePath('src/index.html'),
        title: process.env.APP_NAME,
      }),
    ],
  }
}

module.exports = HTMLTemplate
