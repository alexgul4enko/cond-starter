const makePath = require('./makePath')

function setEntry(entry) {
  return {
    entry: makePath(entry),
  }
}

module.exports = setEntry
