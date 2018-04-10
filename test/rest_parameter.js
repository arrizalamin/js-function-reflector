const expect = require('expect.js')
const functionReflector = require('../index')

describe('Rest Parameter', () => {
  const fn = (a, b = true, ...c) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(fn)

    expect(actual).to.be.an('object')
  })

  it('should return array of parameters', () => {
    const actual = functionReflector(fn).params
    const expected = ['a', ['b', true], '...c']

    expect(actual).to.eql(expected)
  })
})
