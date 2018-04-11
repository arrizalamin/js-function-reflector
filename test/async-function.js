const expect = require('expect.js')
const functionReflector = require('../index')

describe('Async Function', () => {
  var fn = async function(a, b) {
    return a;
  }

  it('should have async to be true', () => {
    const actual = functionReflector(fn).async

    expect(actual).to.be(true)
  })

  it('should have async to be false for non-async function', () => {
      const actual = functionReflector(() => {}).async

      expect(actual).to.be(false)
  })
})
