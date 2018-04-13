const expect = require('expect.js')
const functionReflector = require('../index')

describe('Generator Function', () => {
  const fn = function * (list) {
    for (var item of list) {
      yield item
    }
  }
  
  it('should have generator type', () => {
    const actual = functionReflector(fn).type

    expect(actual).to.be('GENERATOR')
  })

  it('should parse parameters', () => {
    const actual = functionReflector(fn).params
    const expected = [
      {
        type: 'SIMPLE',
        name: 'list'
      }
    ]

    expect(actual).to.eql(expected)
  })
})
