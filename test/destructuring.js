const expect = require('expect')
const functionReflector = require('../index')

describe('Destructuring Parameter', () => {
  const objDestructuringFunc = (a, b = true, {name,age}, d) => {
    return age
  }
  const arrDestructuringFunc = (a, b = true, [name,age, ...rest]) => {
    return name
  }

  it('should parse object destructuring argument', () => {
    const actual = functionReflector(objDestructuringFunc).args
    const expected = ['a', ['b', true], {destructuring: 'object', keys: ['name', 'age']}, 'd']

    expect(actual).toEqual(expected)
  })

  it('should parse array destructuring argument', () => {
    const actual = functionReflector(arrDestructuringFunc).args
    const expected = ['a', ['b', true], {destructuring: 'array', keys: ['name', 'age', '...rest']}]

    expect(actual).toEqual(expected)
  })
})
