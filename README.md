[travis]:       https://travis-ci.org/arccoza/zenhand
[travis-img]:   https://travis-ci.org/arccoza/zenhand.svg

# Zenhand [![Travis Build Status][travis-img]][travis]
Zenhand parses a shorthand CSS selector like string representing an HTML element, and returns an object describing that element.

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

## API

### zenhand(str[, opts])

* **str**
  The CSS selector like string to convert into an object representing the HTML element. The `str` is made up of the following parts:
  * The very first part of the string can be an HTML tag, if left out it defaults to `div`.
  * **#** defines an `id`, should only have one, duplicates will overwrite one another, can be placed anywhere in the string after the tag.
  * **.** defines a `class`, multiples allowed, duplicates will be added to the `class` property, can be placed anywhere in the string after the tag. 
  * **[attr=val]** place an attribute definition inside square brackets, multiples allowed, can be placed anywhere in the string after the tag.
* **opts**
  An options object.
  * **changeStyleCase**
    If true automatic conversion between camelCase and kebab-case for property names, default is `true`.
* **return**
  An object representing the HTML element.

The module also exports two helper functions; `toStyleStr` and `fromStyleStr`.

### toStyleStr(obj[, fromCase, toCase])
Convert an object representation of CSS styles into a string, optionally converting property case.

```js
var {toStyleStr, zenhand} = require('zenhand')
// Input.
var obj = {
  position: 'absolute',
  'backgroundColor': '#ff0000',
}

console.log(toStyleStr(obj, 'camel', 'kebab'))

// Output.
'position:absolute; background-color:#ff0000;'
```

Supports `camel` for camelCase, `kebab` for kebab-case, and `snake` for snake_case.

### fromStyleStr(str[, fromCase, toCase])
Convert a str representation of CSS styles into an object, optionally converting property case.

```js
var {fromStyleStr, zenhand} = require('zenhand')
// Input.
var str = 'position:absolute; background-color:#ff0000;'

console.log(fromStyleStr(str, 'kebab', 'camel'))

// Output.
{
  position: 'absolute',
  'backgroundColor': '#ff0000',
}
```

Supports `camel` for camelCase, `kebab` for kebab-case, and `snake` for snake_case.
