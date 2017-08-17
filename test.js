var {zenhand} = require('./lib/index')

var obj = zenhand('div#ex.exmpl.info[style=background:red;color:black][data-name=temp]')
console.log(obj)
