var functionHeadRegex = /^function\s*(?:(\w+)\s*)?\(\s*([^\)]*)\)/m;
var whitespaceRegex = /[\s\n\t]+/mg;
var defaultParamsRegex = /var (\w+) = arguments.length <= (\d+) \|\| arguments\[(?:\2)\] === undefined \? (.+) : arguments\[(?:\2)\]/gm;
var paramRegex = /var (\w+) = arguments\[(\d+)\]/gm;
var spreadRegex = /(\w+)\[_key - (\d+)\] = arguments\[_key\];/gm;

module.exports = function(fn) {
  var src;
  var body = src = fn.toString();

  var matches = functionHeadRegex.exec(src);
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

  var param;
  while ( (param = defaultParamsRegex.exec(src)) !== null ) {
    var name = param[1];
    var index = param[2];
    var value = param[3];
    try {
      value = eval(value);
    } catch(e) {
      value = 'var(' + value + ')';
    }
    args.splice(index, 0, [name, value]);
  }
  while ( (param = paramRegex.exec(src)) !== null ) {
    var name = param[1];
    var index = param[2];
    args.splice(index, 0, name);
  }
  while ( (param = spreadRegex.exec(src)) !== null ) {
    args.splice(param[2], 0, [param[1], 'spread operator']);
  }

  body = body.slice(body.indexOf('{') + 1, -1).trim()

  return {
    name: name,
    args: args,
    body: body
  };
};
