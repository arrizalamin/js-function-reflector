const expect = require('expect')
const {babelReflector} = require('../../index')

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
