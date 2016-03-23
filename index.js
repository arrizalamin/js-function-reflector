var functionHeadRegex = /^(?:function\s*)?(?:(\w+)\s*)?(?:\(?)\s*([^\)]*)(?:\)?)/;
var oneArgumentFunctionRegex = /^\w+/;
var whitespaceRegex = /[\s\n\t]+/mg;

module.exports=function(fn)
{
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
  }

  body = (inlineFunction) ? 'return ' + body : body.slice(body.indexOf('{') + 1, -1).trim()

  return {
    name: name,
    args: args,
    body: body
  };
};
