const expect = require('expect.js')
const functionReflector = require('../index')

describe('Async Function', () => {
  before(function () {
    if (process.version.startsWith('v6.')) {
      this.skip()
    }
  })

  it('should have async to be true', () => {
    var fn = async function(a, b) {
      return a;
    }
    const actual = functionReflector(fn).async

    expect(actual).to.be(true)
  })

  it('should have async to be false for non-async function', () => {
    const actual = functionReflector(() => {}).async

    expect(actual).to.be(false)
  })
})
