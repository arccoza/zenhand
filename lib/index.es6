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

function zenhand(tag, {changeStyleCase=true}={}) {
  let obj = {tag: 'div', attrs: {class: [], style: ''}}
  let re = /(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m

  while ((m = re.exec(tag)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === re.lastIndex) {
        re.lastIndex++;
    }

    m = m[0]
    switch (m[0]) {
      case '#':
        obj.attrs.id = m.slice(1)
        break
      case '.':
        obj.attrs.class.push(m.slice(1))
        break
      case '[':
        var key = m.slice(1, -1), val = true
        var eqi = key.indexOf('=')
        if (eqi != -1)
          [key, val] = [key.substring(0, eqi), key.substring(eqi + 1, key.length)]

        // Process style string into obj.
        if (key.toLowerCase() == 'style') {
          if (changeStyleCase)
            var caseFrom = 'kebab', caseTo = 'camel'
          val = fromStyleStr(val, caseFrom, caseTo)
        }

        obj.attrs[key] = val || true
        break
      default:
        obj.tag = m
    }
  }

  return obj
}

function zenhand2(str, {changeStyleCase=true}={}) {
  let m = ['[', ']']
  for (let i = 0, a, b; i = str.indexOf(m[0], i), i != -1; i++) {
    print(i)
    if (m[0] == '[')
      a = i
    else {
      b = i
      print(str.slice(a, b + 1))
    }

    print(a, b)
    m = [m[1], m[0]]
  }
}

zenhand2('div#ident.foo.bar[style=background-color:#ff0000;position:absolute;left:calc(1vw - 10px)][data-name=temp]')

export {kase, toStyleStr, fromStyleStr, zenhand}
