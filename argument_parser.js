var Parser = function() {
  this.state = 'var' // var or val
  this.counter = 0
  this.lastStrOpening = null

  this.whitespaces = [' ', '\t', '\n']
  this.opening = ['[', '{']
  this.closing = [']', '}']
  this.strOpening = ["'", '"', '`']

  this.parsed = []
  this.buffer = ''
}

Parser.prototype.parse = function(str, scope) {
  Object.assign(this, scope)
  for (var i = 0; i < str.length; i++) {
    var ch = str.charAt(i)
    if (this.state === 'var') {
      if (this.contains(this.whitespaces, ch)) continue
      if (ch === '=') {
        this.pushBuffer()
        this.state = 'val'
        continue
      }
      if (ch === ',') {
        this.pushBuffer()
        continue
      }
      this.buffer += ch
      if (i === str.length - 1) {
        this.parsed.push(this.buffer)
        this.buffer = ''
      }
    } else if (this.state === 'val') {
      // if currently parsing a string add anything to the buffer
      if (this.lastStrOpening !== null) {
        if (this.lastStrOpening === ch) {
          this.lastStrOpening = null
        }

        this.buffer += ch

        var isLastElement = i === str.length - 1
        if(isLastElement) {
          this.pushBuffer()
        }

        continue
      }

      if (this.counter === 0 && this.contains(this.whitespaces, ch)) continue
      if (this.contains(this.opening, ch)) {
        this.counter++
      } else if (this.contains(this.closing, ch)) {
        this.counter--
      } else if (this.contains(this.strOpening, ch)) {
        this.lastStrOpening = ch
      }
      if (this.counter === 0 && ch === ',') {
        this.pushBuffer()
        this.state = 'var'
        continue
      }
      this.buffer += ch
      if (i === str.length - 1) {
        this.pushBuffer()
        this.state = 'var'
        continue
      }
    }
  }
  return this.parsed
}

Parser.prototype.contains = function(arr, ch) {
  for(var i in arr) {
    if (ch === arr[i]) {
      return true
    }
  }
  return false
}

Parser.prototype.pushBuffer = function() {
  if (this.state === 'var') {
    this.parsed.push(this.buffer)
  } else if (this.state === 'val') {
    var variable = this.parsed.pop()

    var defaultParam

    try{
      defaultParam = eval('(' + this.buffer + ')')
    } catch(e) {
      defaultParam = eval('(this.' + this.buffer + ')')
    }

    this.parsed.push([variable, defaultParam])
  }
  this.buffer = ''
}

module.exports = Parser
