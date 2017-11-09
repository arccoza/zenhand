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
  var re = /[#.\[\]]/g
  var marks = []
  var find = str => {
    let i, m, c
    if (str[re.lastIndex - 1] == '[') {
      i = str.indexOf(']', re.lastIndex)
      if (i == -1)
        i = str.length
      c = ']'
      re.lastIndex = i + 1
    }
    else {
      m = re.exec(str)
      if (m == null)
        return m
      else {
        i = m.index
        c = m[0]
      }
    }

    return [c, i]
  }

  for (let i, m, s, b, r; m = find(str);) {
    print(m)
  }

  // for (let i, m, s, b, r; m = re.exec(str);) {
  // // while (i = re.exec(str)) {
  //   i = m.index, s = m[0]
  //   if (b != null) {
  //     r = [b, i]
  //     print(': ', str.slice(...r))
  //   }

  //   // marks.push([m, i])
  //   print(s, i)
  //   if (s == '[') {
  //     [s, i] = (i = str.indexOf(']', i), i != -1 ? [']', i] : [']', str.length - 1])
  //     ++i
  //     re.lastIndex = i + 1
  //     print(s, i)
  //   }

  //   b = i
  // }
}

zenhand2('div#ident.foo.bar[style=background-color:#ff0000;position:absolute;left:calc(1vw - 10px)][data-name=temp]')

export {kase, toStyleStr, fromStyleStr, zenhand}
