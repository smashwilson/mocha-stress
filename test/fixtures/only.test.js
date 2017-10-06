/* eslint-env mocha */
'use strict'

var assert = require('chai').assert

describe('implies .only', function () {
  it.stress(3, 'runs only this spec', function () {
    assert.isTrue(true)
  })

  it('does not run this spec', function () {
    assert.fail(null, null, 'ran a non-.stress() spec')
  })
})
