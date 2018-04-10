const expect = require('expect.js')
const functionReflector = require('../index')

describe('Default Parameter', () => {
  const fn = (a, b = true, c = 'string', d = 5) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(fn)

    expect(actual).to.be.an('object')
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(fn).args
    const expected = ['a', ['b', true], ['c', 'string'], ['d', 5]]

    expect(actual).to.eql(expected)
  })

  it('should parse single argument with parenthesis', () => {
    const singleArgumentFn = (x = 'a') => {}
    const actual = functionReflector(singleArgumentFn).args
    const expected = [['x', 'a']]

    expect(actual).to.eql(expected)
  })

  it('should parse argument value outside scope', function() {
    const OUTSIDE = {
      A: 1
    }

    const singleArgumentFn = function(x = OUTSIDE.A) {}
    const actual = functionReflector.call({ OUTSIDE }, singleArgumentFn).args
    const expected = [['x', 1]]

    expect(actual).to.eql(expected)
  })
})
