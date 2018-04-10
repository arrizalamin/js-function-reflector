const expect = require('expect.js')
const functionReflector = require('../index')

describe('Old Function', () => {
  var func = function(a, b) {
    return a;
  }

  it('should return javascript object', () => {
    const actual = functionReflector(func)

    expect(actual).to.be.an('object')
  })

  it("should return empty array if function doesn't have argument", () => {
    const actual = functionReflector(function(){ }).args
    const expected = []

    expect(actual).to.eql(expected)
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(func).args
    const expected = ['a', 'b']

    expect(actual).to.eql(expected)
  })

  it('should return function name', () => {
    function foo() {}
    const actual = functionReflector(foo).name
    const expected = 'foo'

    expect(actual).to.eql(expected)
  })

  it('should return anonymous', () => {
    const actual = functionReflector(func).name
    const expected = 'anonymous'

    expect(actual).to.eql(expected)
  })

  it('should return function body in string', () => {
    const actual = functionReflector(func).body
    const expected = 'return a;'

    expect(actual).to.eql(expected)
  })
})
