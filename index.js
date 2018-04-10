const parseFunction = require('./function-parser')
const ParameterParser = require('./parameter_parser');

function reflector(fn) {
  const fnString = Function.prototype.toString.call(fn);
  const parsed = parseFunction(fnString);

  const paramParser = new ParameterParser();
  const params = paramParser.parse(parsed.argument, this);

  return {
    name: parsed.name,
    params: params,
    body: parsed.body,
  };
};

module.exports = reflector;
