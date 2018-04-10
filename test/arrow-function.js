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

  it('should have arrow type', () => {
    const actual = functionReflector(fn).type

    expect(actual).to.be('ARROW')
  })

  it('should return a string parameter', () => {
    const actual = functionReflector(a => {a}).params
    const expected = [
      {
        type: 'SIMPLE',
        name: 'a',
      }
    ]

    expect(actual).to.eql(expected)
  })

  it('should return function body', () => {
    const actual = functionReflector(() => 'ok').body
    const expected = "return 'ok'"

    expect(actual).to.eql(expected)
  })

  it("should return empty array if function doesn't have parameter", () => {
    const actual = functionReflector(() => {}).params
    const expected = []

    expect(actual).to.eql(expected)
  })

  it('should return array of parameters', () => {
    const actual = functionReflector(fn).params
    const expected = [
      {
        type: 'SIMPLE',
        name: 'a',
      },
      {
        type: 'SIMPLE',
        name: 'b',
      },
    ]

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
