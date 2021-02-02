const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const makePath = require('./makePath')

function sass(isDevelopment) {
  return {
    module: {
      rules: [
        {
          test: [/^.*\.sass$/, /^.*\.scss$/],
          use: [
            isDevelopment
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '/',
                  },
                },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  exportLocalsConvention: 'camelCase',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  indentWidth: 4,
                  includePaths: [
                    makePath('src/styles'),
                    makePath('node_modules'),
                  ],
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  sourceMap: true,
                  plugins: [
                    ['postcss-preset-env', {
                      stage: 4,
                      autoprefixer: { grid: true, flexbox: true },
                    }],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  }
}

module.exports = sass
