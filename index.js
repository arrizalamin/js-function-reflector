var babelReflector = require('./babel-reflector');
var getNameAndArguments = require('./get-name-and-arguments');

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
    var nameAndArgs = getNameAndArguments(src, functionHeadRegex);
    var name = nameAndArgs.name;
    var args = nameAndArgs.args;
  }

  body = (inlineFunction) ? 'return ' + body : body.slice(body.indexOf('{') + 1, -1).trim()

  return {
    name: name,
    args: args,
    body: body
  };
};

reflector.babelReflector = babelReflector;

module.exports = reflector;
