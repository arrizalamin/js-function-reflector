const getParameterBoundaryIndexes = fnString => {
  return [parameterStartIdx, parameterEndIdx]
}

const parseTraditionalFunction = fnString => {
  fnString = fnString.slice('function'.length).trim()

  isGenerator = fnString[0] === '*'
  if (isGenerator) {
    fnString = fnString.slice(1).trim()
  }

  const parameterStartIdx = fnString.indexOf('(')
  let parameterEndIdx
  let counter = 0
  for (var i = parameterStartIdx+1; i < fnString.length; i++) {
    const token = fnString[i]
    if (token == ')' && counter == 0) {
      parameterEndIdx = i
      break
    }
    if (token == '(') {
      counter += 1
    } else if (token == ')') {
      counter -= 1
    }
  }
  const isAnonymous = parameterStartIdx == 0
  const parameterString = fnString.slice(parameterStartIdx + 1, parameterEndIdx)
  
  const bodyStartIndex = fnString.indexOf('{', parameterEndIdx)
  const body = fnString.slice(bodyStartIndex + 1, fnString.length - 1).trim()
  fnString = fnString.slice(0, bodyStartIndex).trim()


  const name = isAnonymous ? null : fnString.slice(0, parameterStartIdx)

  return {
    type: isGenerator ? 'GENERATOR' : 'TRADITIONAL',
    name,
    parameterString,
    body,
  }
}

const parseArrowFunction = fnString => {
  const arrowIndex = fnString.indexOf('=>')

  let body = fnString.slice(arrowIndex+2).trim()
  const hasCurlyBrace = body[0] == '{'
  if (hasCurlyBrace) {
    body = body.slice(1,-1).trim()
  } else {
    body = 'return ' + body
  }

  const parameterWithParentheses = fnString.slice(0, arrowIndex).trim()
  const hasParentheses = fnString[0] == '('
  let parameterString
  if (hasParentheses) {
    parameterString = parameterWithParentheses.slice(1,-1)
  } else {
    parameterString = parameterWithParentheses
  }

  return {
    type: 'ARROW',
    name: null,
    parameterString,
    body,
  }
}

const parseFunction = fnString => {
  const isAsync = fnString.startsWith('async')
  if (isAsync) {
    fnString = fnString.slice('async'.length).trim()
  }

  const isTraditionalFunction = fnString.startsWith('function')
    
  let parsed
  if (isTraditionalFunction) {
    parsed = parseTraditionalFunction(fnString)
  } else {
    parsed = parseArrowFunction(fnString)
  }
  parsed['async'] = isAsync

  return parsed
}

module.exports = parseFunction
