const expect = require('expect')
const functionReflector = require('../index')

describe('Default Parameter', () => {
  const func = (a, b = true, c = 'string', d = 5) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(func).args
    const expected = ['a', ['b', true], ['c', 'string'], ['d', 5]]

    expect(actual).toEqual(expected)
  })

  it('should parse single argument with parenthesis', () => {
    const singleParameterFunc = (x = 'a') => {}
    const actual = functionReflector(singleParameterFunc).args
    const expected = [['x', 'a']]

    expect(actual).toEqual(expected)
  })

  it('should parse argument value outside scope', function() {
    const OUTSIDE = {
      A: 1
    }

    const singleParameterFunc = function(x = OUTSIDE.A) {}
    const actual = functionReflector.call({ OUTSIDE }, singleParameterFunc).args
    const expected = [['x', 1]]

    expect(actual).toEqual(expected)
  })
})
