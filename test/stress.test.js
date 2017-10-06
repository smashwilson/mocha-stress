/* eslint-env mocha */
'use strict'

var path = require('path')
var assert = require('chai').assert
var exec = require('child_process').exec

function runExample (testName, callback) {
  var modulePath = path.join(__dirname, '..', 'install')
  var exampleTestPath = path.join(__dirname, 'example.test.js')

  exec(
    'mocha -r ' + modulePath + ' ' + exampleTestPath,
    {
      env: {
        MOCHA_STRESS_TEST: testName,
        PATH: process.env.PATH
      },
      timeout: 1000
    },
    callback
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
