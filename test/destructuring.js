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

  it('should parse array destructuring parameter with deep default value', () => {
    const actual = functionReflector(([a = [1,2], b = {name: 'ABC', age: 20},
                                      c = [{country: 'Indonesia', city: 'Jakarta'}]]) => {}).params
    const expected = [
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'array',
        keys: [
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'a',
            value: [1,2],
          },
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'b',
            value: {name: 'ABC', age: 20},
          },
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'c',
            value: [{country: 'Indonesia', city: 'Jakarta'}],
          }
        ]
      },
    ]

    expect(actual).to.eql(expected)
  })

  it('should parse object destructuring parameter with deep default value', () => {
    const actual = functionReflector(({a = [1,2], b = {name: 'ABC', age: 20},
                                      c = [{country: 'Indonesia', city: 'Jakarta'}]}) => {}).params
    const expected = [
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'object',
        keys: [
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'a',
            value: [1,2],
          },
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'b',
            value: {name: 'ABC', age: 20},
          },
          {
            type: 'KEY_WITH_DEFAULT',
            name: 'c',
            value: [{country: 'Indonesia', city: 'Jakarta'}],
          }
        ]
      },
    ]

    expect(actual).to.eql(expected)
  })

  it('should parse deep object destructuring parameter', () => {
    const deepDestructuringFn = ({ids: [firstId, ...restIds], names: {lastNames}}) => {}
    const actual = functionReflector(deepDestructuringFn).params
    const expected = [
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'object',
        keys: [
          {
            type: 'KEY_WITH_DEEPER_DESTRUCTURING',
            name: 'ids',
            value: {
              destructuring_type: 'array',
              keys: [
                {
                  type: 'KEY',
                  name: 'firstId',
                },
                {
                  type: 'REST',
                  name: 'restIds',
                },
              ]
            },
          },
          {
            type: 'KEY_WITH_DEEPER_DESTRUCTURING',
            name: 'names',
            value: {
              destructuring_type: 'object',
              keys: [
                {
                  type: 'KEY',
                  name: 'lastNames',
                },
              ]
            }
          }
        ]
      }
    ]

    expect(actual).to.eql(expected)
  })

  it('should parse deep array destructuring parameter', () => {
    const deepDestructuringFn = ([[firstId, ...restIds], {lastNames}]) => {}
    const actual = functionReflector(deepDestructuringFn).params
    const expected = [
      {
        type: 'DESTRUCTURING',
        destructuring_type: 'array',
        keys: [
          {
            type: 'KEY_WITH_DEEPER_DESTRUCTURING',
            value: {
              destructuring_type: 'array',
              keys: [
                {
                  type: 'KEY',
                  name: 'firstId',
                },
                {
                  type: 'REST',
                  name: 'restIds',
                },
              ]
            },
          },
          {
            type: 'KEY_WITH_DEEPER_DESTRUCTURING',
            value: {
              destructuring_type: 'object',
              keys: [
                {
                  type: 'KEY',
                  name: 'lastNames',
                },
              ]
            }
          }
        ]
      }
    ]

    expect(actual).to.eql(expected)
  })
})
