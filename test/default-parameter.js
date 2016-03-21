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
})
