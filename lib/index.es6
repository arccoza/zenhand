var print = console.log.bind(console)


var cases = {
  camel: [/[a-z][A-Z]/, (a, b) => a.toLowerCase() + b.toUpperCase()],
  kebab: [/.-./, (a, b) => a + '-' + b.toLowerCase()],
  snake: [/._./, (a, b) => a + '_' + b.toLowerCase()],
}

function kase(from, to, str) {
  return str.replace(cases[from][0], m => cases[to][1](m[0], m[m.length - 1]))
}

function toStyleStr(obj, caseFrom, caseTo) {
  if (!obj) return
  var acc = []

  for (var keys = Object.keys(obj), i = 0, k, v; k = keys[i++], v = obj[k], k;) {
    if (caseFrom && caseTo)
      k = kase(caseFrom, caseTo, k)
    acc.push(`${k}:${v};`)
  }

  return acc.join(' ')
}

function fromStyleStr(str, caseFrom, caseTo) {
  if (!str) return
  var obj = {}
  var pairs = str.split(/\s*;\s*/)

  for (var i = 0, k, v, cur; cur = pairs[i++];) {
    [k, v] = cur.split(/\s*:\s*/, 2)
    if (caseFrom && caseTo)
      k = kase(caseFrom, caseTo, k)
    obj[k] = v
  }

  return obj
}

var re = /(^.*?(?=[#.\[]))|(?:[#.](.*?)(?=[#.\[]))|(?:\[((?:(.*?)=(.*?))|(.*?))(?=\]))/g
function zenhand(str, {changeStyleCase=true}={}) {
  let obj = {tag: 'div', attrs: {class: [], style: ''}}
  let t

  for (let m; m = re.exec(str);) {
    // print(m)
    t = m[0][0]
    switch (t) {
      case '#':
        obj.attrs.id = m[2]
        break
      case '.':
        obj.attrs.class.push(m[2])
        break
      case '[':
        var [,,,, k, v] = m
        k = k == null ? m[6] : k

        // Process style string into obj.
        switch (k) {
          case 'style':
            if (changeStyleCase)
              var caseFrom = 'kebab', caseTo = 'camel'
            v = fromStyleStr(v, caseFrom, caseTo)
            obj.attrs.style = v
            break
          case 'class':
            obj.attrs.class.push(v)
          default:
            obj.attrs[k] = v || true
        }
        break
      default:
        obj.tag = m[1]
    }
  }

  // print(obj)
  return obj
}


// zenhand('div#ident.foo.bar[style=background-color:#ff0000;position:absolute;left:calc(1vw - 10px)][data-nametemp]')

export {kase, toStyleStr, fromStyleStr, zenhand}
