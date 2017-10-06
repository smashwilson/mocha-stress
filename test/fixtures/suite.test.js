/* eslint-env mocha */
'use strict'

var assert = require('chai').assert

describe.stress(5, 'stress-testing a full suite', function () {
  it('spec one', function () {
    assert.isTrue(true)
  })

  it('spec two', function () {
    assert.isTrue(true)
  })
})
