const expect = require('expect.js')
const functionReflector = require('../index')

describe('Traditional Function', () => {
  var fn = function(a, b) {
    return a;
  }

  it('should return javascript object', () => {
    const actual = functionReflector(fn)

    expect(actual).to.be.an('object')
  })

  it('should have traditional type', () => {
    const actual = functionReflector(fn).type

    expect(actual).to.be('TRADITIONAL')
  })

  it("should return empty array if it has empty parameter", () => {
    const actual = functionReflector(function(){ }).params
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

  it('should return function name', () => {
    function foo() {}
    const actual = functionReflector(foo).name
    const expected = 'foo'

    expect(actual).to.eql(expected)
  })

  it('should have null name', () => {
    const actual = functionReflector(fn).name

    expect(actual).to.be(null)
  })

  it('should return function body in string', () => {
    const actual = functionReflector(fn).body
    const expected = 'return a;'

    expect(actual).to.eql(expected)
  })
})
