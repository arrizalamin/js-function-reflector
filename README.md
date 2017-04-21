# js-function-reflector
Function Reflection in Javascript With Support for ES6 Syntax and Babel Transpiled Code

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
// { name: 'anonymous', args: ['foo', ['bar', true], ['baz', 'string'], ['qux', 3], '...quux'], body: '' }

const b = (foo = [1, 2], bar = {a: 1, b : ['s', 't', 'r']}) => {};
// { name: 'anonymous', args: [['foo', [1, 2]], ['bar', {a: 1, b : ['s', 't', 'r']}]], body: '' }

const d = (foo) => {
	return foo
}
console.log(functionReflector(d));
// { name: 'anonymous', args: ['foo'], body: 'return foo' }

const e = foo => 'bar'
console.log(functionReflector(e));
// { name: 'anonymous', args: ['foo'], body: "return 'bar'" }
```
