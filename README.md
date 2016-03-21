# js-function-reflector
Function Reflection in Javascript With Support for ES5 and ES6 Syntax

## Installation
`npm install js-function-reflector`

## Usage
`var reflector = require('js-function-reflector');`

## Example
```
function a() {};
console.log(functionReflector(a));
// { name: 'a', args: [], body: '' }

var b = function() {};
console.log(functionReflector(b));
// { name: 'anonymous', args: [], body: '' }

var c = function(foo, bar) {};
console.log(functionReflector(c));
// { name: 'anonymous', args: ['foo', 'bar'], body: '' }

const d = (foo, bar = true, baz = 'string', qux = 3) => {};
console.log(functionReflector(d));
// { name: 'anonymous', args: ['foo', ['bar', true], ['baz', 'string'], ['qux', 3]], body: '' }

const someVar = 5;
const e = (foo, bar = someVar) => {};
console.log(functionReflector(e));
// { name: 'anonymous', args: ['foo', ['bar', "var('someVar')"]], body: '' }

const f = (foo, ...bar) => {}
console.log(functionReflector(f));
// { name: 'anonymous', args: ['foo', ['bar', 'spread operator']], body: '' }

const g = (foo) => {
	return foo
}
console.log(functionReflector(g));
// { name: 'anonymous', args: ['foo'], body: 'return foo' }
```