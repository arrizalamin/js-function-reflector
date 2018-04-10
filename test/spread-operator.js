const expect = require('expect.js')
const functionReflector = require('../index')

describe('Spread Operator', () => {
  const fn = (a, b = true, ...c) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(fn)

    expect(actual).to.be.an('object')
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(fn).args
    const expected = ['a', ['b', true], '...c']

    expect(actual).to.eql(expected)
  })
})
