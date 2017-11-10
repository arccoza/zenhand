var {zenhand, toStyleStr} = require('./lib/index')
var print = console.log.bind(console)

var start = process.hrtime()
for (var i = 0; i < 100000; i++)
  var obj = zenhand('div#ex.exmpl.info[style=background-color:red;color:black][data-name=temp]', {changeStyleCase: true})
print(process.hrtime(start))

print(obj)

var start = process.hrtime()
for (var i = 0; i < 100000; i++)
  var str = toStyleStr({
    background: 'red',
    color: 'black',
  })
print(process.hrtime(start))

print(str)
