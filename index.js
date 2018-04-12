const parseFunction = require('./function-parser')
const ParameterParser = require('./parameter-parser');

function reflector(fn, scope = {}) {
  const fnString = Function.prototype.toString.call(fn);
  const parsed = parseFunction(fnString);

  const paramParser = new ParameterParser(scope);
  const params = paramParser.parse(parsed.argument);

  return Object.assign(parsed, {params})
};

module.exports = reflector;
