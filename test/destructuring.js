const expect = require('expect.js')
const functionReflector = require('../index')

describe('Destructuring Parameter', () => {
  const objDestructuringFn = (a, b = true, {name,age}, d) => {
    return age
  }
  const arrDestructuringFn = (a, b = true, [name,age, ...rest]) => {
    return name
  }

  it('should parse object destructuring argument', () => {
    const actual = functionReflector(objDestructuringFn).args
    const expected = ['a', ['b', true], {destructuring: 'object', keys: ['name', 'age']}, 'd']

    expect(actual).to.eql(expected)
  })

  it('should parse array destructuring argument', () => {
    const actual = functionReflector(arrDestructuringFn).args
    const expected = ['a', ['b', true], {destructuring: 'array', keys: ['name', 'age', '...rest']}]

    expect(actual).to.eql(expected)
  })
})
