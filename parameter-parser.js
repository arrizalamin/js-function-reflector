const state = {
  VARIABLE: Symbol('VARIABLE'),
  DEFAULT: Symbol('DEFAULT'),
  REST: Symbol('REST'),
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    for (var i in this) {
      if (this[i] == searchElement) {
        return true;
      }
    }
    return false;
  }
}

const isIn = tokens => token => tokens.includes(token)
const isWhitespace = isIn([' ', '\t', '\n'])
const isOpening = isIn(['[', '{'])
const isClosing = isIn([']', '}'])
const isStrWrap = isIn(["'", '"', '`'])

function betterEval(obj, scope = {}){
  try {
    return new Function(`
      "use strict";
      return (${obj});
    `).call(scope)
  } catch (e) {
    return new Function(`
      "use strict";
      return (this.${obj});
    `).call(scope)
  }
}

class ParameterParser {
  constructor(scope = null) {
    this.scope = scope
    this.state = state.VARIABLE
    this.counter = 0

    this.parsed = []
    this.buffer = ''
    this.destructuringType = null
    this.destructuringKeys = []
  }

  parse(fn) {
    let i = -1
    while (i < fn.length) {
      i += 1
      const token = fn[i]
      switch (this.state) {
        case state.VARIABLE:
          if (isWhitespace(token)) continue
          switch (token) {
            case '=':
              this.pushBuffer()
              this.state = state.DEFAULT
            continue
            case '{':
              this.destructuringType = 'object'
            continue
            case '[':
              this.destructuringType = 'array'
            continue
            case ',':
              this.pushBuffer()
  
            continue
            case '.':
              if (this.buffer === '') {
                i += 2
                this.state = state.REST
                continue
              }
          }
          if (isClosing(token) && this.counter == 0 && this.destructuringType != null) {
            this.pushBuffer()
            this.pushDestructuringKeys()
            continue
          }
          this.buffer += token
          if (i === fn.length - 1) {
            this.pushBuffer()
            if (this.destructuringType != null) {
              this.pushDestructuringKeys()
            }
          }
        break

        case state.DEFAULT:
          if (this.counter === 0 && isWhitespace(token)) continue
          if (isStrWrap(token)) {
            const closingIdx = fn.indexOf(token, i+1)
            this.buffer += fn.slice(i, closingIdx + 1)
            this.pushBuffer()
            i = closingIdx
            continue
          }
          if (isClosing(token) && this.counter == 0 && this.destructuringType != null) {
            this.pushBuffer()
            this.pushDestructuringKeys()
            continue
          }
          if (isOpening(token)) {
            this.counter += 1
          } else if (isClosing(token)) {
            this.counter -= 1
          }
          if (this.counter === 0 && token === ',') {
            this.pushBuffer()
            this.state = state.VARIABLE
            continue
          }
          this.buffer += token
          if (i === fn.length - 1) {
            this.pushBuffer()
            if (this.destructuringType != null) {
              this.pushDestructuringKeys()
            }
          }
        break

        case state.REST:
          if (isClosing(token) && this.counter == 0 && this.destructuringType != null) {
            this.pushBuffer()
            this.pushDestructuringKeys()
            continue
          }
          this.buffer += token
          if (i === fn.length - 1) {
            this.pushBuffer()
          }
        break
      }
    }
    return this.parsed
  }

  pushBuffer() {
    if (this.buffer === '') return

    switch (this.state) {
      case state.VARIABLE:
        if (this.destructuringType == null) {
          this.parsed.push({
            type: 'SIMPLE',
            name: this.buffer,
          })
        } else {
          this.destructuringKeys.push({
            type: 'KEY',
            name: this.buffer,
          })
        }
      break

      case state.DEFAULT:
        let topStack
        if (this.destructuringType == null) {
          topStack = this.parsed.pop()
        } else {
          topStack = this.destructuringKeys.pop()
        }

        const defaultParam = betterEval(this.buffer, this.scope)

        if (this.destructuringType == null) {
          this.parsed.push({
            type: 'DEFAULT',
            name: topStack.name,
            value: defaultParam,
          })
        } else {
          this.destructuringKeys.push({
            type: 'KEY_WITH_DEFAULT',
            name: topStack.name,
            value: defaultParam,
          })
        }
      break

      case state.REST:
        if (this.destructuringType == null) {
          this.parsed.push({
            type: 'REST',
            name: this.buffer,
          })
        } else {
          this.destructuringKeys.push({
            type: 'REST',
            name: this.buffer,
          })
        }
      break
    }
    this.buffer = ''
  }

  pushDestructuringKeys() {
    this.parsed.push({
      type: 'DESTRUCTURING',
      destructuring_type: this.destructuringType,
      keys: this.destructuringKeys,
    })
    this.destructuringKeys = []
    this.destructuringType = null
  }
}

module.exports = ParameterParser
