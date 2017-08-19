var print = console.log.bind(console)


function toStyleStr(obj) {
  var ks = Object.keys(obj), vs = Object.values(obj)

  return ks.map((e, i) => [e, vs[i]].join(':')).join('; ')
}

function fromStyleStr(str) {
  var k, v
  var obj = {}
  var cur, eqi

  for (cur of str.split(/\s*;\s*/)) {
    eqi = cur.indexOf(':')
    if (cur && eqi != -1) {
      [k, v] = [cur.substring(0, eqi), cur.substring(eqi + 1, cur.length)]
      obj[k] = v
    }
  }

  return obj
}

function zenhand(tag) {
  var obj = {tag: 'div', attrs: {class: [], style: ''}}
  var re = /(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m

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
        if (key.toLowerCase() == 'style')
          val = fromStyleStr(val)

        obj.attrs[key] = val || true
        break
      default:
        obj.tag = m
    }
  }

  return obj
}

export {toStyleStr, fromStyleStr, zenhand}


// print(zenhand('test#id.class[key=value].class2[style=color:red]'))
