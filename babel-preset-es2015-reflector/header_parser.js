var whitespaceRegex = /[\s\n\t]+/mg;
var functionHeadRegex = /^function\s*(?:(\w+)\s*)?\(\s*([^\)]*)\)/m;

module.exports = function(stringFunction, regex) {
  var matches = functionHeadRegex.exec(stringFunction);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }
  var args = matches[2] && matches[2].replace(whitespaceRegex, '').split(',') || [];
  var name = matches[1] || 'anonymous';

  return {
    name: name,
    args: args
  };
}