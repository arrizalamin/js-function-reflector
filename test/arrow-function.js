const expect = require('expect.js')
const functionReflector = require('../index')

describe('Arrow Function', () => {
  const func = (a, b) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = functionReflector(func)

    expect(actual).to.be.an('object')
  })

  it('should return an argument with no bracket', () => {
    const actual = functionReflector(a => {a}).args
    const expected = ['a']

    expect(actual).to.eql(expected)
  })

  it('should return body with no bracket', () => {
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
    const actual = functionReflector(func).args
    const expected = ['a', 'b']

    expect(actual).to.eql(expected)
  })

  it('should return anonymous', () => {
    const actual = functionReflector(func).name
    const expected = 'anonymous'

    expect(actual).to.eql(expected)
  })

  it('should return function body in string', () => {
    const actual = functionReflector(func).body
    const expected = 'return a'

    expect(actual).to.eql(expected)
  })
})
