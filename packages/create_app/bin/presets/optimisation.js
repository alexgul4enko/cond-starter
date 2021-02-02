const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

function optimisation(isDevelopment) {
  return {
    watchOptions: {
      ignored: /node_modules/,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: new RegExp(
              '[\\/]node_modules[\\/]("@babel/polyfill|react|react-dom)[\\/]'
            ),
            chunks: 'initial',
            name: 'vendors',
            enforce: true,
          },
        },
      },
      minimize: !isDevelopment,
      minimizer: [
        !isDevelopment && new TerserPlugin(),
        !isDevelopment && new CssMinimizerPlugin(),
      ].filter(Boolean),
    },
  }
}

module.exports = optimisation
