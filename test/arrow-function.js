const expect = require('expect.js')
const functionReflector = require('../index')

describe('Arrow Function', () => {
  const fn = (a, b) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(fn)

    expect(actual).to.be.an('object')
  })

  it('should return a string argument', () => {
    const actual = functionReflector(a => {a}).args
    const expected = ['a']

    expect(actual).to.eql(expected)
  })

  it('should return function body', () => {
    const actual = functionReflector(() => 'ok').body
    const expected = "return 'ok'"

    expect(actual).to.eql(expected)
  })

  it("should return empty array if function doesn't have argument", () => {
    const actual = functionReflector(() => {}).args
    const expected = []

    expect(actual).to.eql(expected)
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(fn).args
    const expected = ['a', 'b']

    expect(actual).to.eql(expected)
  })

  it('should return null name', () => {
    const actual = functionReflector(fn).name

    expect(actual).to.be(null)
  })

  it('should return function body in string', () => {
    const actual = functionReflector(fn).body
    const expected = 'return a'

    expect(actual).to.eql(expected)
  })
})
