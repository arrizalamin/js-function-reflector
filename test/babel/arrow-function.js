const expect = require('expect')
const reflector = require('../../index')
const babelReflector = reflector.compiler('babel-preset-es2015')

describe('Arrow Function', () => {
  const func = (a, b) => {
    return a
  }

  it('should return javascript object', () => {
    const actual = babelReflector(func)
    const expected = 'object'

    expect(actual).toBeAn(expected)
  })

  it('should return an argument with no bracket', () => {
    const actual = babelReflector(a => {a}).args
    const expected = ['a']

    expect(actual).toEqual(expected)
  })

  it('should return body with no bracket', () => {
    const actual = babelReflector(() => 'ok').body
    const expected = "return 'ok';"

    expect(actual).toEqual(expected)
  })

  it("should return empty array if function doesn't have argument", () => {
    const actual = babelReflector(() => {}).args
    const expected = []

    expect(actual).toEqual(expected)
  })

  it('should return array of arguments', () => {
    const actual = babelReflector(func).args
    const expected = ['a', 'b']

    expect(actual).toEqual(expected)
  })

  it('should return function name', () => {
    const actual = babelReflector(func).name
    const expected = 'func'

    expect(actual).toEqual(expected)
  })

  it('should return function body in string', () => {
    const actual = babelReflector(func).body
    const expected = 'return a;'

    expect(actual).toEqual(expected)
  })
})
