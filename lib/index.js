'use strict';

exports.__esModule = true;
var print = console.log.bind(console);

var cases = {
  camel: [/[a-z][A-Z]/, function (a, b) {
    return a.toLowerCase() + b.toUpperCase();
  }],
  kebab: [/.-./, function (a, b) {
    return a + '-' + b.toLowerCase();
  }],
  snake: [/._./, function (a, b) {
    return a + '_' + b.toLowerCase();
  }]
};

function kase(from, to, str) {
  return str.replace(cases[from][0], function (m) {
    return cases[to][1](m[0], m[m.length - 1]);
  });
}

function toStyleStr(obj, caseFrom, caseTo) {
  if (!obj) return;
  var acc = [];

  for (var keys = Object.keys(obj), i = 0, k, v; k = keys[i++], v = obj[k], k;) {
    if (caseFrom && caseTo) k = kase(caseFrom, caseTo, k);
    acc.push(k + ':' + v + ';');
  }

  return acc.join(' ');
}

function fromStyleStr(str, caseFrom, caseTo) {
  if (!str) return;
  var obj = {};
  var pairs = str.split(/\s*;\s*/);

  for (var i = 0, k, v, cur; cur = pairs[i++];) {
    var _cur$split = cur.split(/\s*:\s*/, 2);

    k = _cur$split[0];
    v = _cur$split[1];

    if (caseFrom && caseTo) k = kase(caseFrom, caseTo, k);
    obj[k] = v;
  }

  return obj;
}

var re = /(?:[#.](.*?)(?=[#.\[]|$))|(?:\[((?:(.*?)=(.*?))|(.*?))(?=\]))|(^[^#.\[]*?(?=[#.\[]|$))/g;
function zenhand(str) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$changeStyleCase = _ref.changeStyleCase,
      changeStyleCase = _ref$changeStyleCase === undefined ? true : _ref$changeStyleCase;

  var obj = { tag: 'div', attrs: { class: [], style: {} } };

  for (var m, t; m = re.exec(str);) {
    if (m.index === re.lastIndex) re.lastIndex++;
    t = m[0][0];
    switch (t) {
      case '#':
        obj.attrs.id = m[1];
        break;
      case '.':
        obj.attrs.class.push(m[1]);
        break;
      case '[':
        var _m = m,
            k = _m[3],
            v = _m[4];

        k = k == null ? m[5] : k;

        switch (k) {
          // Process style string into obj.
          case 'style':
            if (changeStyleCase) var caseFrom = 'kebab',
                caseTo = 'camel';
            v = fromStyleStr(v, caseFrom, caseTo);
            obj.attrs.style = v;
            break;
          case 'class':
            obj.attrs.class.push(v);
          default:
            obj.attrs[k] = v || true;
        }
        break;
      default:
        obj.tag = m[6];
    }
  }

  return obj;
}

exports.kase = kase;
exports.toStyleStr = toStyleStr;
exports.fromStyleStr = fromStyleStr;
exports.zenhand = zenhand;