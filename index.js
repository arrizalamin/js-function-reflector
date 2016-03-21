var functionHeadRegex = /^(?:function\s*)?(?:(\w+)\s*)?\(\s*([^\)]*)\)/;
var whitespaceRegex = /[\s\n\t]+/mg;

module.exports=function(fn)
{
  var matches,src = fn.toString();

  matches = functionHeadRegex.exec(src);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }

  var args = matches[2] && matches[2].replace(whitespaceRegex, '').split(',') || [];
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
    name: matches[1] || 'anonymous',
    args: args,
    body: src.slice(src.indexOf('{')+1,src.lastIndexOf('}')).trim()
  };
};