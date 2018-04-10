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

  it('should return array of parameters', () => {
    const actual = functionReflector(fn).params
    const expected = ['a', ['b', true], ['c', 'string'], ['d', 5]]

    expect(actual).to.eql(expected)
  })

  it('should parse single parameter with parenthesis', () => {
    const singleParamFn = (x = 'a') => {}
    const actual = functionReflector(singleParamFn).params
    const expected = [['x', 'a']]

    expect(actual).to.eql(expected)
  })

  it('should parse parameter value outside scope', function() {
    const OUTSIDE = {
      A: 1
    }

    const singleParamFn = function(x = OUTSIDE.A) {}
    const actual = functionReflector.call({ OUTSIDE }, singleParamFn).params
    const expected = [['x', 1]]

    expect(actual).to.eql(expected)
  })
})
