const parseTraditionalFunction = fnString => {
  fnString = fnString.slice('function'.length).trim();
    
  const bodyStartIndex = fnString.lastIndexOf('{');
  const body = fnString.slice(bodyStartIndex+1, -1).trim();
  fnString = fnString.slice(0, bodyStartIndex).trim();

  const argumentStartIndex = fnString.indexOf('(');
  const isAnonymous = argumentStartIndex == 0;

  let name;
  if (isAnonymous) {
    name = 'anonymous';
  } else {
    name = fnString.slice(0, argumentStartIndex);
  }
  argument = fnString.slice(argumentStartIndex+1, -1);

  return {
    name,
    argument,
    body,
  };
}

const parseArrowFunction = fnString => {
  const arrowIndex = fnString.indexOf('=>');

  let body = fnString.slice(arrowIndex+2).trim();
  const hasCurlyBrace = body[0] == '{';
  if (hasCurlyBrace) {
    body = body.slice(1,-1).trim();
  } else {
    body = 'return ' + body;
  }

  const argumentStr = fnString.slice(0, arrowIndex).trim();
  const hasParentheses = fnString[0] == '(';
  let argument;
  if (hasParentheses) {
    argument = argumentStr.slice(1,-1);
  } else {
    argument = argumentStr;
  }

  return {
    name: 'anonymous',
    argument,
    body,
  };
}

const parseFunction = fnString => {
  const isTraditionalFunction = fnString.startsWith('function');
    
  let parsed;
  if (isTraditionalFunction) {
    parsed = parseTraditionalFunction(fnString);
  } else {
    parsed = parseArrowFunction(fnString);
  }
  parsed['isArrowFunction'] = !isTraditionalFunction;

  return parsed;
}

module.exports = parseFunction;
