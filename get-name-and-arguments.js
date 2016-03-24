var whitespaceRegex = /[\s\n\t]+/mg;

module.exports = function(stringFunction, regex) {
  var matches = regex.exec(stringFunction);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }
  var args = matches[2] && matches[2].replace(whitespaceRegex, '').split(',') || [];
  var name = matches[1] || 'anonymous';

  args = args.map(function(argument) {
    var check = argument.split('=');
    if (check.length > 1) {
      try {
        check[1] = eval(check[1]);
      } catch(e) {
        check[1] = 'var(' + check[1] + ')';
      }
      return check;
    }
    if (argument.substr(0, 3) === '...') {
      return [argument.substr(3), 'spread operator']
    }
    return argument;
  });
  return {
    name: name,
    args: args
  };
}