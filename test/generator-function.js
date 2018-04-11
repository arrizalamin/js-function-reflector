const expect = require('expect.js')
const functionReflector = require('../index')

describe('Generator Function', () => {
  var fn = function*(a, b) {
    return a;
  }

  it('should have generator type', () => {
    const actual = functionReflector(fn).type

    expect(actual).to.be('GENERATOR')
  })
})
