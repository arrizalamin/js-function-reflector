# js-function-reflector
Function Reflection in Javascript With Support for ES2015+ Syntax

[![Build Status](https://travis-ci.org/arrizalamin/js-function-reflector.svg?branch=master)](https://travis-ci.org/arrizalamin/js-function-reflector)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Function with simple parameter](#function-with-simple-parameter)
  - [Arrow function](#arrow-function)
  - [Async function](#async-function)
  - [Generator function](#generator-function)
  - [Function with default value parameter](#function-with-default-value-parameter)
  - [Function with rest parameter](#function-with-rest-parameter)
  - [Function with destructuring parameter](#function-with-destructuring-parameter)
  - [Function with variable as default value](#function-with-variable-as-default-value)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation

```shell
npm install js-function-reflector
```

## Usage

```javascript
const functionReflector = require('js-function-reflector');
const parsedFunction = functionReflector(yourFunction, scope);
```

## Examples

### Function with simple parameter

```javascript
function add(a, b) {
	return a + b;
};
const output = functionReflector(add);
/* output = {
  type: "TRADITIONAL",
  name: "add",
  _rawParameter: "a, b",
  body: "return a + b;",
  async: false,
  params: [
    {
      type: "SIMPLE",
      name: "a"
    },
    {
      type: "SIMPLE",
      name: "b"
    }
  ]
} */
```

### Arrow function

```javascript
const arrowFn = (a, b) => {
	return a + b;
}
let output = functionReflector(arrowFn);
/* output = {
  type: "ARROW",
  name: null,
  _rawParameter: "a, b",
  body: "return a + b;",
  async: false,
  params: [
    {
      type: "SIMPLE",
      name: "a"
    },
    {
      type: "SIMPLE",
      name: "b"
    }
  ]
} */

// inline arrow function automatically added return statement
const arrowWithoutParenthesisAndCurlyBrace = name => 'hello ' + name
output = functionReflector(arrowWithoutParenthesisAndCurlyBrace);
/* output = {
  type: "ARROW",
  name: null,
  _rawParameter: "name",
  body: "return 'hello ' + name",
  async: false,
  params: [
    {
      type: "SIMPLE",
      name: "name"
    }
  ]
} */
```

### Async function

```javascript
const sleep = async function(time) {
	return new Promise(resolve, setTimeout(resolve, time))
}
const output = functionReflector(sleep))
/* output = {
  type: "TRADITIONAL",
  name: null,
  _rawParameter: "time",
  body: "return new Promise(resolve, setTimeout(resolve, time))",
  async: true,
  params: [
    {
      type: "SIMPLE",
      name: "time"
    }
  ]
}
```

### Generator function

```javascript
const generatorFn = function* (list) {
  for (var item of list) {
    yield item
  }
}
const output = functionReflector(generatorFn))
/* output = {
  type: "GENERATOR",
  name: null,
  _rawParameter: "list",
  body: "for (var item of list) {\r\n    yield item\r\n  }",
  async: false,
  params: [
    {
      type: "SIMPLE",
      name: "list"
    }
  ]
} */
```

### Function with default value parameter

```javascript
const pow = function(n, power = 2) {
	return Math.pow(n, power);
}
const output = functionReflector(pow).params
/* output = [
  {
    type: "SIMPLE",
    name: "n"
  },
  {
    type: "DEFAULT",
    name: "power",
    value: 2
  }
] */
```

### Function with rest parameter

```javascript
const dummyFn = (a, b = 5, ...c) => c
const output = functionReflector(dummyFn).params
/* output = [
  {
    type: "SIMPLE",
    name: "a"
  },
  {
    type: "DEFAULT",
    name: "b",
    value: 5
  },
  {
    type: "REST",
    name: "c"
  }
] */
```

### Function with destructuring parameter

```javascript
const destructuringFn = (a, {names: {firstNames, lastNames}, locations: [[country, city], ...restLocations], ...rest}) => {}
const output = functionReflector(destructuringFn).params
/* output = [
  {
    type: "SIMPLE",
    name: "a"
  },
  {
    type: "DESTRUCTURING",
    value: {
      type: "object",
      keys: [
        {
          type: "DESTRUCTURING",
          name: "names",
          value: {
            type: "object",
            keys: [
              {
                type: "KEY",
                name: "firstNames"
              },
              {
                type: "KEY",
                name: "lastNames"
              }
            ]
          }
        },
        {
          type: "DESTRUCTURING",
          name: "locations",
          value: {
            type: "array",
            keys: [
              {
                type: "DESTRUCTURING",
                value: {
                  type: "array",
                  keys: [
                    {
                      type: "KEY",
                      name: "country"
                    },
                    {
                      type: "KEY",
                      name: "city"
                    }
                  ]
                }
              },
              {
                type: "REST",
                name: "restLocations"
              }
            ]
          }
        },
        {
          type: "REST",
          name: "rest"
        }
      ]
    }
  }
] */
```

### Function with variable as default value

When parameter's default value contains a variable, we need to pass that variable on the second parameter

```javascript
const a = {
	number: 1
}
const b = 2

const dummyFn = function(x = a.number, y = b) {}
const output = functionReflector(dummyFn, { a, b }).params
/* output = [
  {
    type: "DEFAULT",
    name: "x",
    value: 1
  },
  {
    type: "DEFAULT",
    name: "y",
    value: 2
  }
] */
```