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
  let obj = {tag: 'div', attrs: {class: [], style: ''}}
  var re = /[#.\[\]]/g
  var marks = []

  var find = str => {
    let i, m, c, len = str.length
    if (str[re.lastIndex - 1] == '[') {
      i = str.indexOf(']', re.lastIndex)
      if (i == -1)
        i = len
      c = ']'
      re.lastIndex = i + 1
    }
    else if (re.lastIndex >= len)
      return null
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

  // print(str)
  for (let prv, cur; cur = find(str);) {
    // print(cur)
    prv = prv == null && cur[1] > 0 ? ['', -1] : prv

    if (prv != null && prv[0] != ']') {
      // print(prv[0], str.slice(prv[1] + 1, cur[1]))

      // toks[prv[0]](str.substring(prv[1] + 1, cur[1]), obj)
      var s = str.substring(prv[1] + 1, cur[1])
      switch (prv[0]) {
        case '#':
          obj.attrs.id = s
          break
        case '.':
          obj.attrs.class.push(s)
          break
        case '[':
          var k = s.toLowerCase(), v = true, i = k.indexOf('=')
          if (i != -1)
            [k, v] = [k.substring(0, i), k.substring(i + 1, k.length)]

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
              obj.attrs[k] = v
          }
          break
        default:
          obj.tag = s
      }
    }

    prv = cur
  }
  re.lastIndex = 0

  // print(obj)
  return obj
}


// zenhand2('div#ident.foo.bar[style=background-color:#ff0000;position:absolute;left:calc(1vw - 10px)][data-name=temp]')
zenhand = zenhand2
export {kase, toStyleStr, fromStyleStr, zenhand}
