function toStyleStr(obj) {
  var ks = Object.keys(obj), vs = Object.values(obj)

  return ks.map((e, i) => [e, vs[i]].join(':')).join('; ')
}

function fromStyleStr(str) {
  var k, v
  return str.split(/\s*;\s*/)
  .filter(e => e)
  .reduce((acc, cur) => ([k, v] = cur.split(':'), {...acc, [k]: v}), {})
}

function zenhand(tag) {
  var ret = {tag: 'div', attrs: {class: [], style: ''}}

  tag = tag.replace(/(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m => {
    switch (m[0]) {
      case '#':
        ret.attrs.id = m.slice(1)
        break
      case '.':
        ret.attrs.class.push(m.slice(1))
        break
      case '[':
        var [key, val] = m.slice(1, -1).split('=')

        // Process style string into obj.
        if (key.toLowerCase() == 'style')
          val = fromStyleStr(val)

        ret.attrs[key] = val || true
        break
      default:
        ret.tag = m
    }
  })

  return ret
}

export {toStyleStr, fromStyleStr, zenhand}
