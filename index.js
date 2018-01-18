var babelReflector = require('./babel-preset-es2015-reflector');
var parseHeader = require('./header_parser');
var compilers = require('./compilers');

var functionHeadRegex = /^(?:function\s*)?(?:(\w+)\s*)?(?:\(?)\s*([^\)]*)(?:\)?)/;
var oneArgumentFunctionRegex = /^\w+/;

function reflector(fn) {
  var src;
  var body = src = fn.toString();
  var arrowIndex = src.lastIndexOf('=>');
  var arrowFunction = arrowIndex > -1;
  var inlineFunction = false;
  var oneArgumentFunction = false;

  if (arrowFunction) {
    body = src.substr(arrowIndex + 2).trim()
    if (body[0] != '{') {
      inlineFunction = true
    }
    if (src.substr(0,1) != '(') {
      oneArgumentFunction = true;
    }
  }

  if (oneArgumentFunction) {
    var matches = oneArgumentFunctionRegex.exec(src);
    if (matches.length < 1) {
      throw new Error('Invalid function');
    }
    var args = [matches[0]];
    var name = 'anonymous';
  } else {
    var header = parseHeader.call(this, src, functionHeadRegex);
    var name = header.name;
    var args = header.args;
  }

  body = (inlineFunction) ? 'return ' + body : body.slice(body.indexOf('{') + 1, -1).trim()

  return {
    name: name,
    args: args,
    body: body
  };
};

reflector.compiler = compilers;

module.exports = reflector;
