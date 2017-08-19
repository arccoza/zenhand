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

  var obj = {tag: 'div', attrs: {class: [], style: ''}}
  var target = ['tag']
  var bucket = []
  var fill = (t, b) => {
    var ref = obj
    var val = b.join('')
    var i = 0

    for (i = 0; i < t.length - 1; i++)
      ref = ref[t[i]]

    // print(t[i], ref[t[i]])

    switch (t[i]) {
      case 'class':
        ref[t[i]].push(val)
        break
      case 'attrs':
        ref[t[i]][val] = true
        break
      case 'style':
        val = fromStyleStr(val)
      case 'tag':
      case 'id':
      default:
        ref[t[i]] = val
        break
    }

    t.length = 0
    b.length = 0
  }

  for (var i = 0; i < tag.length; i++) {
    // print(tag[i])
    switch (tag[i]) {
      case '#':
        if (target.length)
          fill(target, bucket)
        target.push('attrs', 'id')
        ++i
        break
      case '.':
        if (target.length)
          fill(target, bucket)
        target.push('attrs', 'class')
        ++i
        break
      case '[':
        if (target.length)
          fill(target, bucket)
        target.push('attrs')
        ++i
        break
      case '=':
        target.push(bucket.join(''))
        bucket.length = 0
        ++i
        break
      case ']':
        if (target.length)
          fill(target, bucket)
        continue
      case '\\':
        ++i
        break
    }

    bucket.push(tag[i])
  }

  if (target.length)
    fill(target, bucket)

  return obj
}

export {toStyleStr, fromStyleStr, zenhand}


// print(zenhand('test#id.class[key=value].class2[style=color:red]'))
