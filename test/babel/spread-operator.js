const expect = require('expect')
const reflector = require('../../index')
const babelReflector = reflector.compiler('babel-preset-es2015')

describe('Spread Operator', () => {
  const func = (a, b = true, ...c) => {
    return c
  }

  it('should return javascript object', () => {
    const actual = babelReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it('should return array of arguments', () => {
    const actual = babelReflector(func).args
    const expected = ['a', ['b', true], '...c']

    expect(actual).toEqual(expected)
  })
})
