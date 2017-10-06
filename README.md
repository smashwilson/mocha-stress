# Mocha Stress

[![Build Status](https://travis-ci.org/smashwilson/mocha-stress.svg?branch=master)](https://travis-ci.org/smashwilson/mocha-stress)

Stress-test inconsistent parts of your [Mocha](https://mochajs.org/) test suite to identify and correct flaky tests.

## Installation

```sh
# Install the package from npm
$ npm install --save-dev mocha-stress

# Add this argument to your Mocha command-line arguments:
$ jq .scripts package.json
{
  "test": "mocha -r mocha-stress"
}

# Or to your ./test/mocha.opts file:
$ cat ./test/mocha.opts
--require mocha-stress
```

## Usage

To run a specific spec a fixed number of iterations:

```js
it.stress(100, 'is failing sometimes for some reason??', function () {
  expect(Math.random()).to.be.below(0.5)
})
```

It can also be used on an entire `describe` suite:

```js
describe.stress(100, 'inconsistent', function () {
  // ..
})
```

This implies `.only()`.
