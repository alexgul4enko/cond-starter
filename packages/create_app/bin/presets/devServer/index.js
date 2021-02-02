const configureProxy = require('./proxy')

function devServer(isDevelopment) {
  if(!isDevelopment) {
    return {}
  }
  return {
    devServer: {
      port: process.env.DEV_SERVER_PORT || 3000,
      contentBase: './dist',
      historyApiFallback: true,
      watchContentBase: true,
      hot: true,
      host: process.env.DEV_SERVER_HOST,
      inline: true,
      https: false,
      publicPath: '/',
      disableHostCheck: true,
      allowedHosts: [
        '.localhost',
        `.${process.env.MAIN_HOST}`,
      ],
      proxy: configureProxy(),
    },
  }
}


module.exports = devServer
