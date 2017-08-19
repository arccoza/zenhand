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

  // tag = tag.replace(/(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m => {
  //   switch (m[0]) {
  //     case '#':
  //       obj.attrs.id = m.slice(1)
  //       break
  //     case '.':
  //       obj.attrs.class.push(m.slice(1))
  //       break
  //     case '[':
  //       var [key, val] = m.slice(1, -1).split('=')

  //       // Process style string into obj.
  //       if (key.toLowerCase() == 'style')
  //         val = fromStyleStr(val)

  //       obj.attrs[key] = val || true
  //       break
  //     default:
  //       obj.tag = m
  //   }
  // })

  var keys = []

  for( var i = 0; i < tag.length; i++) {
    switch (tag[i]) {
      case '.':
        keys.push(['attrs', 'class'])
        ++i
        break
      case '[':
        keys.push(['attrs'])
        ++i
        break
      case '#':
        keys.push(['attrs', 'id'])
        ++i
        break
      default:
        if (i == 0) {
          keys.push(['tag'])
          ++i
        }
    }
  }

  var values = tag.split(/[\.\[#]/)
  var ref = obj
  for (var i = 0, kp, j, k, v; (kp = keys[i], v = values[i]); i++) {
    ref = obj
    // print(kp)
    for (j = 0; (k = kp[j], j < kp.length - 1); j++)
      ref = ref[kp[j]]

    if (k == 'class')
      ref[k].push(v)
    else if (k == 'attrs') {
      var [att, val] = v.split('=')
      if (val[val.length - 1] == ']')
        val = val.slice(0, val.length - 1)
      if (att == 'style')
        val = fromStyleStr(val)
      ref[k][att] = val
    }
  }

  // obj = [types, tag.split(/[\.\[#]/)]


  return obj
}

export {toStyleStr, fromStyleStr, zenhand}


// print(zenhand('test#id.class[key=value].class2[style=color:red]'))
