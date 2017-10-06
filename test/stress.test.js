/* eslint-env mocha */
'use strict'

var path = require('path')
var assert = require('chai').assert
var exec = require('child_process').exec

function runExample (testName, callback) {
  var modulePath = path.join(__dirname, '..', 'install')
  var exampleTestPath = path.join(__dirname, 'fixtures', testName + '.test.js')

  exec(
    'mocha --require ' + modulePath + ' --reporter json ' + exampleTestPath,
    { timeout: 2000 },
    function (err, stdout, stderr) {
      var result = null
      try {
        result = JSON.parse(stdout)
      } catch (e) {
        console.error('unable to parse stdout as JSON:\n' + stdout)
      }

      if (err || !result) {
        if (result) {
          err.message = 'Test failures:\n'
          result.failures.forEach(function (f) {
            err.message += f.fullTitle
            err.message += '\n'
            err.message += f.err.message
            err.message += '\n'
          })
        }

        return callback(err, stdout, stderr)
      }

      callback(err, result, stderr)
    }
  )
}

describe('.stress', function () {
  it('duplicates marked specs by the specified iteration count', function (done) {
    runExample('single', function (err, results, stderr) {
      assert.isNotOk(err)

      assert.lengthOf(results.passes, 10)
      for (var i = 0; i < 10; i++) {
        assert.equal(results.passes[i].fullTitle, 'stress-testing a single spec runs multiple times #' + i)
      }

      done()
    })
  })

  it('duplicates marked suites by the specified iteration count', function (done) {
    runExample('suite', function (err, results, stderr) {
      assert.isNotOk(err)

      assert.lengthOf(results.passes, 10)
      for (var i = 0; i < 5; i++) {
        assert.equal(results.passes[i * 2].fullTitle, 'stress-testing a full suite #' + i + ' spec one')
        assert.equal(results.passes[i * 2 + 1].fullTitle, 'stress-testing a full suite #' + i + ' spec two')
      }

      done()
    })
  })

  it('implies .only', function (done) {
    runExample('only', function (err, results, stderr) {
      assert.isNotOk(err)

      assert.lengthOf(results.passes, 3)
      assert.lengthOf(results.failures, 0)

      for (var i = 0; i < 3; i++) {
        assert.equal(results.passes[i].fullTitle, 'implies .only runs only this spec #' + i)
      }

      done()
    })
  })

  it('does not interfere with unmarked specs', function (done) {
    runExample('normal', function (err, results, stderr) {
      assert.isNotOk(err)

      assert.lengthOf(results.passes, 1)
      var pass = results.passes[0]
      assert.equal(pass.fullTitle, 'normal specs does not interfere')

      done()
    })
  })
})
