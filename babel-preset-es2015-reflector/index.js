var parseHeader = require('./header_parser');

var defaultParamsRegex = /var (\w+) = arguments.length > (\d+) && arguments\[(?:\2)\] !== undefined \? arguments\[(?:\2)\] : (.+);$/gm;
var paramRegex = /var (\w+) = arguments\[(\d+)\]/gm;
var spreadRegex = /(\w+)\[_key - (\d+)\] = arguments\[_key\];/gm;

module.exports = function(fn) {
  var src = fn.toString();
  var header = parseHeader(src);
  var args = header.args;

  var param;
  while ( (param = defaultParamsRegex.exec(src)) !== null ) {
    var name = param[1];
    var index = param[2];
    var value = param[3];
    try {
      value = eval('(' + value + ')');
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
    args.splice(param[2], 0, '...' + param[1]);
  }

  var body = src.slice(src.indexOf('{') + 1, -1).trim()

  return {
    name: header.name,
    args: args,
    body: body
  };
};
