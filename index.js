const parseFunction = require('./function-parser')
const ParameterParser = require('./parameter-parser');

function reflector(fn) {
  const fnString = Function.prototype.toString.call(fn);
  const parsed = parseFunction(fnString);

  const paramParser = new ParameterParser();
  const params = paramParser.parse(parsed.argument, this);

  return Object.assign(parsed, {params})
};

module.exports = reflector;
