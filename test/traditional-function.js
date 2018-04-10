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

  it("should return empty array if it has empty argument", () => {
    const actual = functionReflector(function(){ }).args
    const expected = []

    expect(actual).to.eql(expected)
  })

  it('should return array of arguments', () => {
    const actual = functionReflector(fn).args
    const expected = ['a', 'b']

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
