const expect = require('expect.js')
const functionReflector = require('../index')

describe('Destructuring Parameter', () => {
  const objDestructuringFn = (a, b = true, {name,age}, d) => {
    return age
  }
  const arrDestructuringFn = (a, b = true, [name, age, ...rest]) => {
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

  it('should parse object destructuring with default value parameter', () => {
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

  it('should parse array destructuring parameter with default value', () => {
    const actual = functionReflector(([a = true, b = 'foo', c]) => {}).params
    const expected = [
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'array',
        keys: [
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'a',
            value: true,
          },
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'b',
            value: 'foo',
          },
          {
            type: 'KEY',
            name: 'c',
          }
        ]
      },
    ]

    expect(actual).to.eql(expected)
  })
})
