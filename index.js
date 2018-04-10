const parseFunction = require('./function-parser')
const ArgParser = require('./argument_parser');

function reflector(fn) {
  const fnString = Function.prototype.toString.call(fn);
  const parsed = parseFunction(fnString);

  const argParser = new ArgParser();
  const args = argParser.parse(parsed.argument, this);

  return {
    name: parsed.name,
    args: args,
    body: parsed.body,
  };
};

module.exports = reflector;
