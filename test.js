var {zenhand} = require('./lib/index')
var print = console.log.bind(console)

var start = process.hrtime()
for (var i = 0; i < 100000; i++)
  var obj = zenhand('div#ex.exmpl.info[style=background:red;color:black][data-name=temp]')
print(process.hrtime(start))

print(obj)
