const expect = require('expect')
const reflector = require('../../index')
const babelReflector = reflector.compiler('babel-preset-es2015')

describe('Default Parameter', () => {
  const func = (a, b = true, c = 'string', d, e = 5) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = babelReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it('should return array of arguments', () => {
    const actual = babelReflector(func).args
    const expected = ['a', ['b', true], ['c', 'string'], 'd', ['e', 5]]

    expect(actual).toEqual(expected)
  })
})
