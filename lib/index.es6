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

  tag = tag.replace(/(?:[#\.\[]|^).*?(?=$|[#\.\[])|\]/g, m => {
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
  })



  // var ref = obj
  // var refb
  // var key
  // var keyb
  // var val
  // var eqi
  // var mark = 0
  // var collect = false

  // for( var i = 0; i < tag.length; i++) {
  //   // ref = obj
  //   switch (tag[i]) {
  //     case '.':
  //       collect = true
  //       refb = ref
  //       keyb = key
  //       ref = obj['attrs']['class']
  //       key = ref.length
  //       ++i
  //       break
  //     case '[':
  //       collect = true
  //       refb = ref
  //       keyb = key
  //       ref = obj['attrs']
  //       key = null
  //       ++i
  //       break
  //     case '#':
  //       collect = true
  //       refb = ref
  //       keyb = key
  //       ref = obj['attrs']
  //       key = 'id'
  //       ++i
  //       break
  //     default:
  //       if (i == 0) {
  //         ref = obj
  //         key = 'tag'
  //         continue
  //       }

  //     if (collect) {
  //       if (keyb === null) {
  //         val = tag.substring(mark, i - 3)
  //         eqi = val.indexOf('=')
  //         if (eqi != -1) {
  //           [keyb, val] = [val.substring(0, eqi), val.substring(eqi + 1, val.length)]
  //           if (keyb == 'style')
  //             val = fromStyleStr(val)
  //         }
  //       }
  //       else
  //         val = tag.substring(mark, i - 2)

  //       refb[keyb] = val

  //       mark = i - 1
  //       collect = false
  //     }
  //   }
  // }

  // refb = ref
  // keyb = key
  // if (keyb === null) {
  //   val = tag.substring(mark, i - 1)
  //   eqi = val.indexOf('=')
  //   if (eqi != -1) {
  //     [keyb, val] = [val.substring(0, eqi), val.substring(eqi + 1, val.length)]
  //     if (keyb == 'style')
  //       val = fromStyleStr(val)
  //   }
  // }
  // else
  //   val = tag.substring(mark, i)

  // refb[keyb] = val



  // var keys = []

  // for( var i = 0; i < tag.length; i++) {
  //   switch (tag[i]) {
  //     case '.':
  //       keys.push(['attrs', 'class'])
  //       ++i
  //       break
  //     case '[':
  //       keys.push(['attrs'])
  //       ++i
  //       break
  //     case '#':
  //       keys.push(['attrs', 'id'])
  //       ++i
  //       break
  //     default:
  //       if (i == 0) {
  //         keys.push(['tag'])
  //         ++i
  //       }
  //   }
  // }

  // var values = tag.split(/[\.\[#]/)
  // var ref = obj
  // for (var i = 0, kp, j, k, v; (kp = keys[i], v = values[i]); i++) {
  //   ref = obj
  //   // print(kp)
  //   for (j = 0; (k = kp[j], j < kp.length - 1); j++)
  //     ref = ref[kp[j]]

  //   if (k == 'class')
  //     ref[k].push(v)
  //   else if (k == 'attrs') {
  //     var [att, val] = v.split('=')
  //     if (val[val.length - 1] == ']')
  //       val = val.slice(0, val.length - 1)
  //     if (att == 'style')
  //       val = fromStyleStr(val)
  //     ref[k][att] = val
  //   }
  // }

  // obj = [types, tag.split(/[\.\[#]/)]


  return obj
}

export {toStyleStr, fromStyleStr, zenhand}


// print(zenhand('test#id.class[key=value].class2[style=color:red]'))
