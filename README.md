# js-function-reflector
Function Reflection in Javascript With Support for ES5 and ES6 Syntax

[![Build Status](https://travis-ci.org/arrizalamin/js-function-reflector.svg?branch=master)](https://travis-ci.org/arrizalamin/js-function-reflector)

## Installation
```javascript
npm install js-function-reflector
```

## Usage
```javascript
var functionReflector = require('js-function-reflector');
// If you are using babel transpiler
functionReflector = reflector.compiler('babel-preset-es2015');
```

## Example
```javascript
function a(foo, bar) {};
console.log(functionReflector(a));
// { name: 'a', args: [foo, bar], body: '' }

const b = (foo, bar = true, baz = 'string', qux = 3, ...quux) => {};
console.log(functionReflector(b));
// { name: 'anonymous', args: ['foo', ['bar', true], ['baz', 'string'], ['qux', 3], ['quux', 'spread operator']], body: '' }

const someVar = 5;
const c = (foo, bar = someVar) => {};
console.log(functionReflector(c));
// { name: 'anonymous', args: ['foo', ['bar', "var('someVar')"]], body: '' }

const d = (foo) => {
	return foo
}
console.log(functionReflector(d));
// { name: 'anonymous', args: ['foo'], body: 'return foo' }

const e = foo => 'bar'
console.log(functionReflector(e));
// { name: 'anonymous', args: ['foo'], body: "return 'bar'" }
```
