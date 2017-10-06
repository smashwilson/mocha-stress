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
    runExample('single', function (err, stdout, stderr) {
      assert.isNotOk(err)
      done()
    })
  })

  it('duplicates marked suites by the specified iteration count', function (done) {
    runExample('suite', function (err, stdout, stderr) {
      assert.isNotOk(err)
      done()
    })
  })

  it('implies .only', function (done) {
    runExample('only', function (err, stdout, stderr) {
      assert.isNotOk(err)
      done()
    })
  })

  it('does not interfere with unmarked specs', function (done) {
    runExample('normal', function (err, stdout, stderr) {
      assert.isNotOk(err)
      done()
    })
  })
})
