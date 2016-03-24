const expect = require('expect')
const {babelReflector} = require('../../index')

describe('Spread Operator', () => {
  const func = (a, b = true, ...c) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = babelReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it('should return array of arguments', () => {
    const actual = babelReflector(func).args
    const expected = ['a', ['b', true], ['c', 'spread operator']]

    expect(actual).toEqual(expected)
  })
})
