'use strict'

try {
  var mochaPath = require.resolve('mocha')
  if (require.cache[mochaPath]) {
    //
  }
} catch (err) {
  // Ignore
}
