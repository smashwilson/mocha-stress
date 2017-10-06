/* eslint-env mocha */
'use strict'

var assert = require('chai').assert

describe('stress-testing a single spec', function () {
  it.stress(10, 'runs multiple times', function () {
    assert.isTrue(true)
  })
})
