require('./utils/init-env')
const parts = require('./presets')
const merge = require('webpack-merge').merge


module.exports = merge([
  parts.setEntry('src/app/index.js'),
  parts.resolveExtensions(['.js', '.jsx', '.json', '.css', '.sass', '.scss']),
  parts.resolveModules(['/src/app']),
  parts.setOutput(process.env.OUTPUT_PATH),
  parts.setMode(false),
  parts.generateSourceMaps(false),
  parts.react(false),
  parts.files(),
  parts.css(false),
  parts.sass(false),
  parts.HTMLTemplate(),
  parts.cleanDirectory(),
  parts.minicss(false),
  parts.imageAlias(),
  parts.optimisation(false),
  parts.setEnv(false),
  parts.setTarget(false),
])
