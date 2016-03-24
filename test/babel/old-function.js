const expect = require('expect')
const reflector = require('../../index')
const babelReflector = reflector.compiler('babel-preset-es2015')

describe('Old Function', () => {
  var func = function(a, b) {
    return a;
  }

  it('should return javascript object', () => {
    const actual = babelReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it("should return empty array if function doesn't have argument", () => {
    const actual = babelReflector(function(){ }).args
    const expected = []

    expect(actual).toEqual(expected)
  })

  it('should return array of arguments', () => {
    const actual = babelReflector(func).args
    const expected = ['a', 'b']

    expect(actual).toEqual(expected)
  })

  it('should return function name', () => {
    function foo() {}
    const actual = babelReflector(foo).name
    const expected = 'foo'

    expect(actual).toEqual(expected)
  })

  it('should return function body in string', () => {
    const actual = babelReflector(func).body
    const expected = 'return a;'

    expect(actual).toEqual(expected)
  })
})
