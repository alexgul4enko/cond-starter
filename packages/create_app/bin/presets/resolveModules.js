const makePath = require('./makePath')

function resolveModules(modules) {
  return {
    resolve: {
      modules: ['node_modules', ...modules.map(makePath)],
    },
  }
}

module.exports = resolveModules
