/* eslint-env mocha */
'use strict'

var assert = require('chai').assert
var testCase = process.env.MOCHA_STRESS_TEST

if (testCase === 'single') {
  describe('stress-testing a single spec', function () {
    it.stress(10, 'single spec', function () {
      assert.isTrue(true)
    })
  })
} else if (testCase === 'suite') {
  describe.stress(5, 'stress-testing a full suite', function () {
    it('spec one', function () {
      assert.isTrue(true)
    })

    it('spec two', function () {
      assert.isTrue(true)
    })
  })
} else if (testCase === 'normal') {
  describe('normal specs', function () {
    it('does not interfere', function () {
      assert.isTrue(true)
    })
  })
} else {
  describe('oops', function () {
    it('ran with an unrecognized MOCHA_STRESS_TEST', function () {
      assert.include(['single', 'suite', 'normal'], testCase)
    })
  })
}
