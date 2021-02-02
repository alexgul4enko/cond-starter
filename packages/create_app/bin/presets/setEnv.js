const Dotenv = require('dotenv-webpack')
const makePath = require('./makePath')

function setEnv() {
  return {
    plugins: [
      new Dotenv({
        path: makePath(process.env.ENVFILE || '.env.default'),
        safe: makePath('.env.default'),
        allowEmptyValues: true,
        systemvars: true,
        defaults: false,
      }),
    ],
  }
}

module.exports = setEnv
