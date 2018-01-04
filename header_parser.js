var Parser = require('./argument_parser');
var whitespaceRegex = /[\s\n\t]+/mg;

module.exports = function(stringFunction, regex) {
  var matches = regex.exec(stringFunction);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }
  var parser = new Parser();
  var args = parser.parse(matches[2], this)

  var name = matches[1] || 'anonymous';

  return {
    name: name,
    args: args
  };
}
