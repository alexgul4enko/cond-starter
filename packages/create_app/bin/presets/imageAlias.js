const makePath = require('./makePath')

function imageAlias() {
  return {
    resolve: {
      alias: {
        '@img': makePath('/src/img'),
      },
    },
  }
}

module.exports = imageAlias
