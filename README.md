# Zenhand
Zenhand parses a shorthand string representing an HTML element, and returns an object describing that element.

## Example
```js
var {zenhand} = require('zenhand')
// import {zenhand} from 'zenhand'  // If you're using es modules.

var obj = zenhand('div#ex.exmpl.info[style=background:red;color:black][data-name=temp]')
console.log(obj)
```
__output:__
```js
{ tag: 'div',
  attrs: 
   { class: [ 'exmpl', 'info' ],
     style: { background: 'red', color: 'black' },
     id: 'ex',
     'data-name': 'temp' } }
```

## Install
`npm install --save zenhand`

or

`yarn add zenhand`
