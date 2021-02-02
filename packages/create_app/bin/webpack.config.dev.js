require('./utils/init-env')
const parts = require('./presets')
const merge = require('webpack-merge').merge


module.exports = merge([
  parts.setEntry('src/app/index.js'),
  parts.resolveExtensions(['.js', '.jsx', '.json', '.css', '.sass', '.scss']),
  parts.resolveModules(['/src/app']),
  parts.setOutput(process.env.OUTPUT_PATH),
  parts.setMode(true),
  parts.runDevServer(true),
  parts.generateSourceMaps(true),
  parts.react(true),
  parts.files(),
  parts.css(true),
  parts.sass(true),
  parts.HTMLTemplate(),
  parts.cleanDirectory(),
  parts.minicss(true),
  parts.imageAlias(),
  parts.optimisation(true),
  parts.setEnv(true),
  parts.setTarget(true),
])
