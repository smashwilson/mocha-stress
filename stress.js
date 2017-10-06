'use strict'

function wrapFn (fn) {
  return function (iterations, description, body) {
    for (var i = 0; i < iterations; i++) {
      var desc = description + ' #' + i
      fn.only(desc, body)
    }
  }
}

module.exports = function (Mocha) {
  var original = Mocha.prototype.loadFiles

  Mocha.prototype.loadFiles = function () {
    this.suite.on('pre-require', function (context) {
      ['it', 'test', 'describe', 'suite'].forEach(function (fnName) {
        if (context[fnName]) {
          context[fnName].stress = wrapFn(context[fnName])
        }
      })
    })

    original.apply(this, arguments)
  }
}
