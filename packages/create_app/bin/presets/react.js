const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

function reactLoader(isDevelopment) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules\/(?!(test-a|test-m|test-o)).*/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  isDevelopment && 'react-refresh/babel',
                ].filter(Boolean),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  }
}

module.exports = reactLoader
