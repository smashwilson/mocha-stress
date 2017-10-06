'use strict'

var stress = require('./stress')

try {
  var mochaPath = require.resolve('mocha')
  if (require.cache[mochaPath]) {
    stress(require.cache[mochaPath].exports)
  }
} catch (err) {
  // Ignore
}
