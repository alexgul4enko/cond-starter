#!/usr/bin/env node

const { exec, spawnSync } = require('child_process')

const [task] = process.argv.slice(2)
const configDev = require.resolve('./webpack.config.dev')
const configProd = require.resolve('./webpack.config.prod')

let result
switch (task) {
  case 'start': {
    result = spawnSync(
      'webpack',
      ['serve', '--config', configDev, '--progress', '--open', '--hot'],
      { stdio: 'inherit' }
    )
    break
  }
  case 'build': {
    result = spawnSync(
      'webpack',
      ['--config', configProd, '--progress', '--mode', 'production'],
      { stdio: 'inherit' }
    )
    break
  }
  default:
    console.log(`Unknown script "${task}".`)
}

if(result.signal) {
  process.exit(1)
}

process.exit(result.status)
