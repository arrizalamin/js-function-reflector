const expect = require('expect.js')
const functionReflector = require('../index')

describe('Destructuring Parameter', () => {
  const objDestructuringFn = (a, b = true, {name,age}, d) => {
    return age
  }
  const arrDestructuringFn = (a, b = true, [name,age, ...rest]) => {
    return name
  }

  it('should parse object destructuring parameter', () => {
    const actual = functionReflector(objDestructuringFn).params
    const expected = [
      {
        type: 'SIMPLE',
        name: 'a',
      },
      {
        type: 'DEFAULT',
        name: 'b',
        value: true,
      },
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'object',
        keys: [
          {
            type: 'KEY',
            name: 'name',
          },
          {
            type: 'KEY',
            name: 'age'
          },
        ]
      },
      {
        type: 'SIMPLE',
        name: 'd',
      },
    ]

    expect(actual).to.eql(expected)
  })

  it('should parse array destructuring parameter', () => {
    const actual = functionReflector(arrDestructuringFn).params
    const expected = [
      {
        type: 'SIMPLE',
        name: 'a',
      },
      {
        type: 'DEFAULT',
        name: 'b',
        value: true,
      },
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'array',
        keys: [
          {
            type: 'KEY',
            name: 'name',
          },
          {
            type: 'KEY',
            name: 'age'
          },
          {
            type: 'REST',
            name: 'rest',
          }
        ]
      },
    ]

    expect(actual).to.eql(expected)
  })
})
