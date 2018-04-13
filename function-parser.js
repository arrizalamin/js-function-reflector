const parseTraditionalFunction = fnString => {
  fnString = fnString.slice('function'.length).trim();

  isGenerator = fnString[0] === '*';
  if (isGenerator) {
    fnString = fnString.slice(1).trim()
  }
    
  const bodyStartIndex = fnString.lastIndexOf('{');
  const body = fnString.slice(bodyStartIndex+1, -1).trim();
  fnString = fnString.slice(0, bodyStartIndex).trim();

  const parameterStartIdx = fnString.indexOf('(');
  const isAnonymous = parameterStartIdx == 0;

  let name;
  if (isAnonymous) {
    name = null;
  } else {
    name = fnString.slice(0, parameterStartIdx);
  }
  parameterString = fnString.slice(parameterStartIdx+1, -1);

  return {
    type: isGenerator ? 'GENERATOR' : 'TRADITIONAL',
    name,
    parameterString,
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

  const parameterWithParentheses = fnString.slice(0, arrowIndex).trim();
  const hasParentheses = fnString[0] == '(';
  let parameterString;
  if (hasParentheses) {
    parameterString = parameterWithParentheses.slice(1,-1);
  } else {
    parameterString = parameterWithParentheses;
  }

  return {
    type: 'ARROW',
    name: null,
    parameterString,
    body,
  };
}

const parseFunction = fnString => {
  const isAsync = fnString.startsWith('async');
  if (isAsync) {
    fnString = fnString.slice('async'.length).trim()
  }

  const isTraditionalFunction = fnString.startsWith('function');
    
  let parsed;
  if (isTraditionalFunction) {
    parsed = parseTraditionalFunction(fnString);
  } else {
    parsed = parseArrowFunction(fnString);
  }
  parsed['async'] = isAsync

  return parsed;
}

module.exports = parseFunction;
