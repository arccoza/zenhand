const test = require('tape')
const print = console.log.bind(console)
const tapDiff = require('tap-diff')
const {toStyleStr, fromStyleStr, zenhand} = require('../lib/index')


if(!module.parent) {
  test.createStream()
    .pipe(tapDiff())
    .pipe(process.stdout);
}

let fix = {
  style: {
    obj: {
      kebab: {
        position: 'absolute',
        'background-color': '#ff0000',
      },
      camel: {
        position: 'absolute',
        backgroundColor: '#ff0000',
      },
    },
    toStr: {
      kebab: 'position:absolute; background-color:#ff0000;',
      camel: 'position:absolute; backgroundColor:#ff0000;',
    },
    fromStr: {
      kebab: 'position:  absolute; background-color:  #ff0000;',
      camel: 'position:  absolute; backgroundColor:  #ff0000;',
    }
  },
  obj: {
    tag: 'div',
    attrs: {
      class: [ 'foo', 'bar' ],
      style: {
        backgroundColor: '#ff0000',
        position: 'absolute',
        left: 'calc(1vw - 10px)',
      },
      id: 'ident',
      'data-name': 'temp'
    }
  }
}

function Results() {
  let ret = []
  Object.defineProperty(ret, 'last', { get: function(v) { return this[this.length - 1] } })
  return Object.defineProperty(ret, 'more', { set: function(v) { this.push(v) } })
}


test(`toStyleStr should return a string inline CSS style definition, \
when supplied with an object with style properties. Also should be able \
to safely convert between camel-case and kebab-case.`, function (t) {
  t.equal(r = toStyleStr(fix.style.obj.camel), fix.style.toStr.camel)
  t.equal(r = toStyleStr(fix.style.obj.kebab), fix.style.toStr.kebab)
  t.equal(r = toStyleStr(fix.style.obj.camel, 'camel', 'kebab'), fix.style.toStr.kebab)
  t.equal(r = toStyleStr(fix.style.obj.camel, 'camel', 'camel'), fix.style.toStr.camel)
  t.equal(r = toStyleStr(fix.style.obj.kebab, 'kebab', 'camel'), fix.style.toStr.camel)
  t.equal(r = toStyleStr(fix.style.obj.kebab, 'kebab', 'kebab'), fix.style.toStr.kebab)
  // t.comment(r)

  t.end()
})

test(`fromStyleStr should return an obj with style properties, \
when supplied with an inline CSS style string. Also should be able \
to safely convert between camel-case and kebab-case and manage whitespace.`, function (t) {
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.camel), fix.style.obj.camel)
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.kebab), fix.style.obj.kebab)
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.camel, 'camel', 'kebab'), fix.style.obj.kebab)
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.camel, 'camel', 'camel'), fix.style.obj.camel)
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.kebab, 'kebab', 'camel'), fix.style.obj.camel)
  t.deepEqual(r = fromStyleStr(fix.style.fromStr.kebab, 'kebab', 'kebab'), fix.style.obj.kebab)
  // t.comment(JSON.stringify(r))

  t.end()
})

// TODO: Fix the error that # in a hex colour code creates when parsing
// the zenhand string.
test(`fromStyleStr should return an obj with style properties, \
when supplied with an inline CSS style string. Also should be able \
to safely convert between camel-case and kebab-case and manage whitespace.`, function (t) {
  var r
  r = zenhand('div#ident.foo.bar[style=background-color:#ff0000;position:absolute;left:calc(1vw - 10px)][data-name=temp]',
    {changeStyleCase: true})

  t.deepEqual(r, fix.obj)
  console.log(r)



  t.end()
})
