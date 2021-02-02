const dotenvExpand = require('dotenv-expand')
const dotenv = require('dotenv')


const config = dotenv.config({
  path: process.env.ENVFILE,
})

const configDefault = dotenv.config({
  path: '.env.default',
})

dotenvExpand(config)
dotenvExpand(configDefault)

module.exports = process.env
