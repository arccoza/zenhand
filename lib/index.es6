var print = console.log.bind(console)


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
  var obj = {tag: 'div', attrs: {class: [], style: ''}}

  tag = tag.replace(/(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m => {
    switch (m[0]) {
      case '#':
        obj.attrs.id = m.slice(1)
        break
      case '.':
        obj.attrs.class.push(m.slice(1))
        break
      case '[':
        var [key, val] = m.slice(1, -1).split('=')

        // Process style string into obj.
        if (key.toLowerCase() == 'style')
          val = fromStyleStr(val)

        obj.attrs[key] = val || true
        break
      default:
        obj.tag = m
    }
  })

  return obj
}

export {toStyleStr, fromStyleStr, zenhand}


// print(zenhand('test#id.class[key=value].class2[style=color:red]'))
