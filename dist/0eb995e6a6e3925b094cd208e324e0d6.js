// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped, ModuleConfig) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(ModuleConfig);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({231:[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],237:[function(require,module,exports) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],288:[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],281:[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":288}],261:[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],235:[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":261}],266:[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],258:[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":266}],285:[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":261,"./_global":231}],279:[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":258,"./_fails":266,"./_dom-create":285}],270:[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":261}],255:[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":235,"./_ie8-dom-define":279,"./_to-primitive":270,"./_descriptors":258}],256:[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],232:[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":255,"./_property-desc":256,"./_descriptors":258}],257:[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":231,"./_core":237,"./_ctx":281,"./_hide":232}],252:[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],262:[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],278:[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":262}],244:[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],248:[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":278,"./_defined":244}],246:[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],290:[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":246}],291:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":246}],289:[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":248,"./_to-length":290,"./_to-absolute-index":291}],259:[function(require,module,exports) {

var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":231}],260:[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],282:[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":259,"./_uid":260}],286:[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":252,"./_to-iobject":248,"./_array-includes":289,"./_shared-key":282}],284:[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],274:[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":286,"./_enum-bug-keys":284}],277:[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],276:[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],280:[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":244}],263:[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_object-keys":274,"./_object-gops":277,"./_object-pie":276,"./_to-object":280,"./_iobject":278,"./_fails":266}],239:[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":257,"./_object-assign":263}],226:[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":239,"../../modules/_core":237}],206:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":226}],203:[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":206}],43:[function(require,module,exports) {
var global = (1,eval)("this");
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function (_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: 'development' !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: 'development' !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

if ('development' !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if ('development' !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if ('development' !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    'development' !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if ('development' !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    'development' !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if ('development' !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      'development' !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    'development' !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if ('development' !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && 'development' !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if ('development' !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else if ('development' !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if ('development' !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if ('development' !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ('development' !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if ('development' !== 'production' &&
  // skip validation for weex recycle-list child component props
  !(false && isObject(value) && '@binding' in value)) {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ('development' !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ('development' !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if ('development' !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ('development' !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      'development' !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if ('development' !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      'development' !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject('development' !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if ('development' !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if ('development' !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ('development' !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ('development' !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ('development' !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if ('development' !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ('development' !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = 'development' !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      'development' !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if ('development' !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);
  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    'development' !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if ('development' !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      'development' !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ('development' !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ('development' !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  if ('development' !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if ('development' !== 'production') {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if ('development' !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ('development' !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ('development' !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if ('development' !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ('development' !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      'development' !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree;
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      'development' !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if ('development' !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    'development' !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if ('development' !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef(data)) {
      registerDeepBindings(data);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if ('development' !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if ('development' !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ('development' !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ('development' !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ('development' !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if ('development' !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ('development' !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue(options) {
  if ('development' !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if ('development' !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ('development' !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive

  /*  */

};function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if ('development' !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      'development' !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if ('development' !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ('development' !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ('development' !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if ('development' !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if ('development' !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ('development' !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ('development' !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ('development' !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs

  /*  */

};function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass

  /*  */

  /*  */

  // add a raw attr (use this in preTransforms)


  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
};var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners

  /*  */

};function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps

  /*  */

};var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle

  /*  */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
};function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ('development' !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ('development' !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    'development' !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show

  /*  */

  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)

};var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if ('development' !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if ('development' !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function () {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }

  /*  */

  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.

  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.

};var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if ('development' !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup

  /*  */

  // install platform specific utils
};Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ('development' !== 'production' && 'development' !== 'test' && isChrome) {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }
    if ('development' !== 'production' && 'development' !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}

/*  */

exports.default = Vue;
},{}],42:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],7:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":42}],5:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],45:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],228:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":246,"./_defined":244}],249:[function(require,module,exports) {
module.exports = true;

},{}],250:[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":232}],233:[function(require,module,exports) {
module.exports = {};

},{}],283:[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":255,"./_an-object":235,"./_object-keys":274,"./_descriptors":258}],287:[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":231}],271:[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":235,"./_object-dps":283,"./_enum-bug-keys":284,"./_shared-key":282,"./_dom-create":285,"./_html":287}],234:[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":259,"./_uid":260,"./_global":231}],254:[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":255,"./_has":252,"./_wks":234}],251:[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":271,"./_property-desc":256,"./_set-to-string-tag":254,"./_hide":232,"./_wks":234}],253:[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":252,"./_to-object":280,"./_shared-key":282}],229:[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":249,"./_export":257,"./_redefine":250,"./_hide":232,"./_has":252,"./_iterators":233,"./_iter-create":251,"./_set-to-string-tag":254,"./_object-gpo":253,"./_wks":234}],223:[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":228,"./_iter-define":229}],245:[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],247:[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],230:[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":245,"./_iter-step":247,"./_iterators":233,"./_to-iobject":248,"./_iter-define":229}],222:[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":230,"./_global":231,"./_hide":232,"./_iterators":233,"./_wks":234}],267:[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":234}],296:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":223,"../../modules/web.dom.iterable":222,"../../modules/_wks-ext":267}],215:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":296}],265:[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":260,"./_is-object":261,"./_has":252,"./_object-dp":255,"./_fails":266}],264:[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":231,"./_core":237,"./_library":249,"./_wks-ext":267,"./_object-dp":255}],268:[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":274,"./_object-gops":277,"./_object-pie":276}],269:[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":262}],275:[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":286,"./_enum-bug-keys":284}],272:[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":248,"./_object-gopn":275}],273:[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":276,"./_property-desc":256,"./_to-iobject":248,"./_to-primitive":270,"./_has":252,"./_ie8-dom-define":279,"./_descriptors":258}],240:[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":231,"./_has":252,"./_descriptors":258,"./_export":257,"./_redefine":250,"./_meta":265,"./_fails":266,"./_shared":259,"./_set-to-string-tag":254,"./_uid":260,"./_wks":234,"./_wks-ext":267,"./_wks-define":264,"./_enum-keys":268,"./_is-array":269,"./_an-object":235,"./_is-object":261,"./_to-iobject":248,"./_to-primitive":270,"./_property-desc":256,"./_object-create":271,"./_object-gopn-ext":272,"./_object-gopd":273,"./_object-dp":255,"./_object-keys":274,"./_object-gopn":275,"./_object-pie":276,"./_object-gops":277,"./_library":249,"./_hide":232}],241:[function(require,module,exports) {

},{}],242:[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":264}],243:[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":264}],227:[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":240,"../../modules/es6.object.to-string":241,"../../modules/es7.symbol.async-iterator":242,"../../modules/es7.symbol.observable":243,"../../modules/_core":237}],214:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":227}],212:[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol/iterator":215,"../core-js/symbol":214}],305:[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":257,"./_core":237,"./_fails":266}],304:[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":280,"./_object-keys":274,"./_object-sap":305}],302:[function(require,module,exports) {
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/es6.object.keys":304,"../../modules/_core":237}],219:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":302}],170:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var red50 = exports.red50 = '#ffebee';
var red100 = exports.red100 = '#ffcdd2';
var red200 = exports.red200 = '#ef9a9a';
var red300 = exports.red300 = '#e57373';
var red400 = exports.red400 = '#ef5350';
var red500 = exports.red500 = '#f44336';
var red600 = exports.red600 = '#e53935';
var red700 = exports.red700 = '#d32f2f';
var red800 = exports.red800 = '#c62828';
var red900 = exports.red900 = '#b71c1c';
var redA100 = exports.redA100 = '#ff8a80';
var redA200 = exports.redA200 = '#ff5252';
var redA400 = exports.redA400 = '#ff1744';
var redA700 = exports.redA700 = '#d50000';
var red = exports.red = red500;

var pink50 = exports.pink50 = '#fce4ec';
var pink100 = exports.pink100 = '#f8bbd0';
var pink200 = exports.pink200 = '#f48fb1';
var pink300 = exports.pink300 = '#f06292';
var pink400 = exports.pink400 = '#ec407a';
var pink500 = exports.pink500 = '#e91e63';
var pink600 = exports.pink600 = '#d81b60';
var pink700 = exports.pink700 = '#c2185b';
var pink800 = exports.pink800 = '#ad1457';
var pink900 = exports.pink900 = '#880e4f';
var pinkA100 = exports.pinkA100 = '#ff80ab';
var pinkA200 = exports.pinkA200 = '#ff4081';
var pinkA400 = exports.pinkA400 = '#f50057';
var pinkA700 = exports.pinkA700 = '#c51162';
var pink = exports.pink = pink500;

var purple50 = exports.purple50 = '#f3e5f5';
var purple100 = exports.purple100 = '#e1bee7';
var purple200 = exports.purple200 = '#ce93d8';
var purple300 = exports.purple300 = '#ba68c8';
var purple400 = exports.purple400 = '#ab47bc';
var purple500 = exports.purple500 = '#9c27b0';
var purple600 = exports.purple600 = '#8e24aa';
var purple700 = exports.purple700 = '#7b1fa2';
var purple800 = exports.purple800 = '#6a1b9a';
var purple900 = exports.purple900 = '#4a148c';
var purpleA100 = exports.purpleA100 = '#ea80fc';
var purpleA200 = exports.purpleA200 = '#e040fb';
var purpleA400 = exports.purpleA400 = '#d500f9';
var purpleA700 = exports.purpleA700 = '#aa00ff';
var purple = exports.purple = purple500;

var deepPurple50 = exports.deepPurple50 = '#ede7f6';
var deepPurple100 = exports.deepPurple100 = '#d1c4e9';
var deepPurple200 = exports.deepPurple200 = '#b39ddb';
var deepPurple300 = exports.deepPurple300 = '#9575cd';
var deepPurple400 = exports.deepPurple400 = '#7e57c2';
var deepPurple500 = exports.deepPurple500 = '#673ab7';
var deepPurple600 = exports.deepPurple600 = '#5e35b1';
var deepPurple700 = exports.deepPurple700 = '#512da8';
var deepPurple800 = exports.deepPurple800 = '#4527a0';
var deepPurple900 = exports.deepPurple900 = '#311b92';
var deepPurpleA100 = exports.deepPurpleA100 = '#b388ff';
var deepPurpleA200 = exports.deepPurpleA200 = '#7c4dff';
var deepPurpleA400 = exports.deepPurpleA400 = '#651fff';
var deepPurpleA700 = exports.deepPurpleA700 = '#6200ea';
var deepPurple = exports.deepPurple = deepPurple500;

var indigo50 = exports.indigo50 = '#e8eaf6';
var indigo100 = exports.indigo100 = '#c5cae9';
var indigo200 = exports.indigo200 = '#9fa8da';
var indigo300 = exports.indigo300 = '#7986cb';
var indigo400 = exports.indigo400 = '#5c6bc0';
var indigo500 = exports.indigo500 = '#3f51b5';
var indigo600 = exports.indigo600 = '#3949ab';
var indigo700 = exports.indigo700 = '#303f9f';
var indigo800 = exports.indigo800 = '#283593';
var indigo900 = exports.indigo900 = '#1a237e';
var indigoA100 = exports.indigoA100 = '#8c9eff';
var indigoA200 = exports.indigoA200 = '#536dfe';
var indigoA400 = exports.indigoA400 = '#3d5afe';
var indigoA700 = exports.indigoA700 = '#304ffe';
var indigo = exports.indigo = indigo500;

var blue50 = exports.blue50 = '#e3f2fd';
var blue100 = exports.blue100 = '#bbdefb';
var blue200 = exports.blue200 = '#90caf9';
var blue300 = exports.blue300 = '#64b5f6';
var blue400 = exports.blue400 = '#42a5f5';
var blue500 = exports.blue500 = '#2196f3';
var blue600 = exports.blue600 = '#1e88e5';
var blue700 = exports.blue700 = '#1976d2';
var blue800 = exports.blue800 = '#1565c0';
var blue900 = exports.blue900 = '#0d47a1';
var blueA100 = exports.blueA100 = '#82b1ff';
var blueA200 = exports.blueA200 = '#448aff';
var blueA400 = exports.blueA400 = '#2979ff';
var blueA700 = exports.blueA700 = '#2962ff';
var blue = exports.blue = blue500;

var lightBlue50 = exports.lightBlue50 = '#e1f5fe';
var lightBlue100 = exports.lightBlue100 = '#b3e5fc';
var lightBlue200 = exports.lightBlue200 = '#81d4fa';
var lightBlue300 = exports.lightBlue300 = '#4fc3f7';
var lightBlue400 = exports.lightBlue400 = '#29b6f6';
var lightBlue500 = exports.lightBlue500 = '#03a9f4';
var lightBlue600 = exports.lightBlue600 = '#039be5';
var lightBlue700 = exports.lightBlue700 = '#0288d1';
var lightBlue800 = exports.lightBlue800 = '#0277bd';
var lightBlue900 = exports.lightBlue900 = '#01579b';
var lightBlueA100 = exports.lightBlueA100 = '#80d8ff';
var lightBlueA200 = exports.lightBlueA200 = '#40c4ff';
var lightBlueA400 = exports.lightBlueA400 = '#00b0ff';
var lightBlueA700 = exports.lightBlueA700 = '#0091ea';
var lightBlue = exports.lightBlue = lightBlue500;

var cyan50 = exports.cyan50 = '#e0f7fa';
var cyan100 = exports.cyan100 = '#b2ebf2';
var cyan200 = exports.cyan200 = '#80deea';
var cyan300 = exports.cyan300 = '#4dd0e1';
var cyan400 = exports.cyan400 = '#26c6da';
var cyan500 = exports.cyan500 = '#00bcd4';
var cyan600 = exports.cyan600 = '#00acc1';
var cyan700 = exports.cyan700 = '#0097a7';
var cyan800 = exports.cyan800 = '#00838f';
var cyan900 = exports.cyan900 = '#006064';
var cyanA100 = exports.cyanA100 = '#84ffff';
var cyanA200 = exports.cyanA200 = '#18ffff';
var cyanA400 = exports.cyanA400 = '#00e5ff';
var cyanA700 = exports.cyanA700 = '#00b8d4';
var cyan = exports.cyan = cyan500;

var teal50 = exports.teal50 = '#e0f2f1';
var teal100 = exports.teal100 = '#b2dfdb';
var teal200 = exports.teal200 = '#80cbc4';
var teal300 = exports.teal300 = '#4db6ac';
var teal400 = exports.teal400 = '#26a69a';
var teal500 = exports.teal500 = '#009688';
var teal600 = exports.teal600 = '#00897b';
var teal700 = exports.teal700 = '#00796b';
var teal800 = exports.teal800 = '#00695c';
var teal900 = exports.teal900 = '#004d40';
var tealA100 = exports.tealA100 = '#a7ffeb';
var tealA200 = exports.tealA200 = '#64ffda';
var tealA400 = exports.tealA400 = '#1de9b6';
var tealA700 = exports.tealA700 = '#00bfa5';
var teal = exports.teal = teal500;

var green50 = exports.green50 = '#e8f5e9';
var green100 = exports.green100 = '#c8e6c9';
var green200 = exports.green200 = '#a5d6a7';
var green300 = exports.green300 = '#81c784';
var green400 = exports.green400 = '#66bb6a';
var green500 = exports.green500 = '#4caf50';
var green600 = exports.green600 = '#43a047';
var green700 = exports.green700 = '#388e3c';
var green800 = exports.green800 = '#2e7d32';
var green900 = exports.green900 = '#1b5e20';
var greenA100 = exports.greenA100 = '#b9f6ca';
var greenA200 = exports.greenA200 = '#69f0ae';
var greenA400 = exports.greenA400 = '#00e676';
var greenA700 = exports.greenA700 = '#00c853';
var green = exports.green = green500;

var lightGreen50 = exports.lightGreen50 = '#f1f8e9';
var lightGreen100 = exports.lightGreen100 = '#dcedc8';
var lightGreen200 = exports.lightGreen200 = '#c5e1a5';
var lightGreen300 = exports.lightGreen300 = '#aed581';
var lightGreen400 = exports.lightGreen400 = '#9ccc65';
var lightGreen500 = exports.lightGreen500 = '#8bc34a';
var lightGreen600 = exports.lightGreen600 = '#7cb342';
var lightGreen700 = exports.lightGreen700 = '#689f38';
var lightGreen800 = exports.lightGreen800 = '#558b2f';
var lightGreen900 = exports.lightGreen900 = '#33691e';
var lightGreenA100 = exports.lightGreenA100 = '#ccff90';
var lightGreenA200 = exports.lightGreenA200 = '#b2ff59';
var lightGreenA400 = exports.lightGreenA400 = '#76ff03';
var lightGreenA700 = exports.lightGreenA700 = '#64dd17';
var lightGreen = exports.lightGreen = lightGreen500;

var lime50 = exports.lime50 = '#f9fbe7';
var lime100 = exports.lime100 = '#f0f4c3';
var lime200 = exports.lime200 = '#e6ee9c';
var lime300 = exports.lime300 = '#dce775';
var lime400 = exports.lime400 = '#d4e157';
var lime500 = exports.lime500 = '#cddc39';
var lime600 = exports.lime600 = '#c0ca33';
var lime700 = exports.lime700 = '#afb42b';
var lime800 = exports.lime800 = '#9e9d24';
var lime900 = exports.lime900 = '#827717';
var limeA100 = exports.limeA100 = '#f4ff81';
var limeA200 = exports.limeA200 = '#eeff41';
var limeA400 = exports.limeA400 = '#c6ff00';
var limeA700 = exports.limeA700 = '#aeea00';
var lime = exports.lime = lime500;

var yellow50 = exports.yellow50 = '#fffde7';
var yellow100 = exports.yellow100 = '#fff9c4';
var yellow200 = exports.yellow200 = '#fff59d';
var yellow300 = exports.yellow300 = '#fff176';
var yellow400 = exports.yellow400 = '#ffee58';
var yellow500 = exports.yellow500 = '#ffeb3b';
var yellow600 = exports.yellow600 = '#fdd835';
var yellow700 = exports.yellow700 = '#fbc02d';
var yellow800 = exports.yellow800 = '#f9a825';
var yellow900 = exports.yellow900 = '#f57f17';
var yellowA100 = exports.yellowA100 = '#ffff8d';
var yellowA200 = exports.yellowA200 = '#ffff00';
var yellowA400 = exports.yellowA400 = '#ffea00';
var yellowA700 = exports.yellowA700 = '#ffd600';
var yellow = exports.yellow = yellow500;

var amber50 = exports.amber50 = '#fff8e1';
var amber100 = exports.amber100 = '#ffecb3';
var amber200 = exports.amber200 = '#ffe082';
var amber300 = exports.amber300 = '#ffd54f';
var amber400 = exports.amber400 = '#ffca28';
var amber500 = exports.amber500 = '#ffc107';
var amber600 = exports.amber600 = '#ffb300';
var amber700 = exports.amber700 = '#ffa000';
var amber800 = exports.amber800 = '#ff8f00';
var amber900 = exports.amber900 = '#ff6f00';
var amberA100 = exports.amberA100 = '#ffe57f';
var amberA200 = exports.amberA200 = '#ffd740';
var amberA400 = exports.amberA400 = '#ffc400';
var amberA700 = exports.amberA700 = '#ffab00';
var amber = exports.amber = amber500;

var orange50 = exports.orange50 = '#fff3e0';
var orange100 = exports.orange100 = '#ffe0b2';
var orange200 = exports.orange200 = '#ffcc80';
var orange300 = exports.orange300 = '#ffb74d';
var orange400 = exports.orange400 = '#ffa726';
var orange500 = exports.orange500 = '#ff9800';
var orange600 = exports.orange600 = '#fb8c00';
var orange700 = exports.orange700 = '#f57c00';
var orange800 = exports.orange800 = '#ef6c00';
var orange900 = exports.orange900 = '#e65100';
var orangeA100 = exports.orangeA100 = '#ffd180';
var orangeA200 = exports.orangeA200 = '#ffab40';
var orangeA400 = exports.orangeA400 = '#ff9100';
var orangeA700 = exports.orangeA700 = '#ff6d00';
var orange = exports.orange = orange500;

var deepOrange50 = exports.deepOrange50 = '#fbe9e7';
var deepOrange100 = exports.deepOrange100 = '#ffccbc';
var deepOrange200 = exports.deepOrange200 = '#ffab91';
var deepOrange300 = exports.deepOrange300 = '#ff8a65';
var deepOrange400 = exports.deepOrange400 = '#ff7043';
var deepOrange500 = exports.deepOrange500 = '#ff5722';
var deepOrange600 = exports.deepOrange600 = '#f4511e';
var deepOrange700 = exports.deepOrange700 = '#e64a19';
var deepOrange800 = exports.deepOrange800 = '#d84315';
var deepOrange900 = exports.deepOrange900 = '#bf360c';
var deepOrangeA100 = exports.deepOrangeA100 = '#ff9e80';
var deepOrangeA200 = exports.deepOrangeA200 = '#ff6e40';
var deepOrangeA400 = exports.deepOrangeA400 = '#ff3d00';
var deepOrangeA700 = exports.deepOrangeA700 = '#dd2c00';
var deepOrange = exports.deepOrange = deepOrange500;

var brown50 = exports.brown50 = '#efebe9';
var brown100 = exports.brown100 = '#d7ccc8';
var brown200 = exports.brown200 = '#bcaaa4';
var brown300 = exports.brown300 = '#a1887f';
var brown400 = exports.brown400 = '#8d6e63';
var brown500 = exports.brown500 = '#795548';
var brown600 = exports.brown600 = '#6d4c41';
var brown700 = exports.brown700 = '#5d4037';
var brown800 = exports.brown800 = '#4e342e';
var brown900 = exports.brown900 = '#3e2723';
var brown = exports.brown = brown500;

var blueGrey50 = exports.blueGrey50 = '#eceff1';
var blueGrey100 = exports.blueGrey100 = '#cfd8dc';
var blueGrey200 = exports.blueGrey200 = '#b0bec5';
var blueGrey300 = exports.blueGrey300 = '#90a4ae';
var blueGrey400 = exports.blueGrey400 = '#78909c';
var blueGrey500 = exports.blueGrey500 = '#607d8b';
var blueGrey600 = exports.blueGrey600 = '#546e7a';
var blueGrey700 = exports.blueGrey700 = '#455a64';
var blueGrey800 = exports.blueGrey800 = '#37474f';
var blueGrey900 = exports.blueGrey900 = '#263238';
var blueGrey = exports.blueGrey = blueGrey500;

var grey50 = exports.grey50 = '#fafafa';
var grey100 = exports.grey100 = '#f5f5f5';
var grey200 = exports.grey200 = '#eeeeee';
var grey300 = exports.grey300 = '#e0e0e0';
var grey400 = exports.grey400 = '#bdbdbd';
var grey500 = exports.grey500 = '#9e9e9e';
var grey600 = exports.grey600 = '#757575';
var grey700 = exports.grey700 = '#616161';
var grey800 = exports.grey800 = '#424242';
var grey900 = exports.grey900 = '#212121';
var grey = exports.grey = grey500;

var black = exports.black = '#000000';
var white = exports.white = '#ffffff';

var transparent = exports.transparent = 'rgba(0, 0, 0, 0)';
var fullBlack = exports.fullBlack = 'rgba(0, 0, 0, 1)';
var darkBlack = exports.darkBlack = 'rgba(0, 0, 0, 0.87)';
var lightBlack = exports.lightBlack = 'rgba(0, 0, 0, 0.54)';
var minBlack = exports.minBlack = 'rgba(0, 0, 0, 0.26)';
var faintBlack = exports.faintBlack = 'rgba(0, 0, 0, 0.12)';
var fullWhite = exports.fullWhite = 'rgba(255, 255, 255, 1)';
var darkWhite = exports.darkWhite = 'rgba(255, 255, 255, 0.87)';
var lightWhite = exports.lightWhite = 'rgba(255, 255, 255, 0.54)';
},{}],185:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.getColor = getColor;
exports.isNotNull = isNotNull;
exports.isNull = isNull;
exports.getWidth = getWidth;
exports.isPc = isPc;
exports.retina = retina;
exports.convertClass = convertClass;
exports.createSimpleFunctional = createSimpleFunctional;
exports.getFirstComponentChild = getFirstComponentChild;

var _colors = require('../theme/colors');

var colorsObj = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = (0, _keys2.default)(colorsObj);
function getColor(color) {
  if (!color || ['primary', 'secondary', 'success', 'warning', 'info', 'error'].indexOf(color) !== -1) return '';
  return colors.indexOf(color) !== -1 ? colorsObj[color] : color;
};

function isNotNull(val) {
  return val !== undefined && val !== null;
}

function isNull(val) {
  return val === undefined || val === null;
}

function getWidth(w) {
  var width = String(w);
  if (width && width.indexOf('%') === -1 && width.indexOf('px') === -1) width += 'px';
  return width;
}

function isPc() {
  var uaInfo = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
  var flag = true;
  for (var i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function retina() {
  // 处理retina屏幕显示效果
  if (isPc()) return;
  var classNames = [];
  var pixelRatio = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== undefined && window.devicePixelRatio || 1;
  classNames.push('pixel-ratio-' + Math.floor(pixelRatio));
  if (pixelRatio >= 2) {
    classNames.push('retina');
  }

  var html = document.getElementsByTagName('html')[0];

  classNames.forEach(function (className) {
    return html.classList.add(className);
  });
}

/**
 * 将 String, Object, Array 转成 Array
 */
function convertClass(classes) {
  var newClasses = [];
  if (!classes) return newClasses;
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes);
  } else if (classes instanceof Object) {
    for (var name in classes) {
      if (classes[name]) newClasses.push(name);
    }
  } else {
    newClasses = newClasses.concat(classes.split(' '));
  }
  return newClasses;
}

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var name = arguments[2];

  return {
    name: name,
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = (c + ' ' + (data.staticClass || '')).trim();

      return h(el, data, children);
    }
  };
}

function getFirstComponentChild(children) {
  return children && children.filter(function (c) {
    return c && c.tag;
  })[0];
};
},{"babel-runtime/helpers/typeof":212,"babel-runtime/core-js/object/keys":219,"../theme/colors":170}],165:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

exports.default = {
  props: {
    color: String
  },
  methods: {
    getColorClass: function getColorClass() {
      return this.getNormalColorClass(this.color);
    },
    getTextColorClass: function getTextColorClass() {
      return this.getNormalColorClass(this.textColor, true);
    },
    getNormalColorClass: function getNormalColorClass(color, text) {
      var classObj = {};
      var themes = ['primary', 'secondary', 'success', 'warning', 'info', 'error'];

      themes.forEach(function (theme) {
        classObj['mu-' + theme + (text ? '-text' : '') + '-color'] = color === theme;
      });
      if (!text) classObj['mu-inverse'] = !!color;

      return (0, _utils.convertClass)(classObj).join(' ');
    }
  }
};
},{"../../utils":185}],303:[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":261,"./_object-sap":305}],301:[function(require,module,exports) {
require('../../modules/es6.object.is-extensible');
module.exports = require('../../modules/_core').Object.isExtensible;

},{"../../modules/es6.object.is-extensible":303,"../../modules/_core":237}],218:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/is-extensible"), __esModule: true };
},{"core-js/library/fn/object/is-extensible":301}],186:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],188:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],156:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/expand-transition.less');

exports.default = {
  name: 'mu-expand-transition',
  methods: {
    beforeEnter: function beforeEnter(el) {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = '0';
    },
    enter: function enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }
      el.style.overflow = 'hidden';
    },
    afterEnter: function afterEnter(el) {
      el.style.display = '';
      // uc浏览器上设置height会闪屏
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    },
    beforeLeave: function beforeLeave(el) {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      }
      el.style.overflow = 'hidden';
    },
    leave: function leave(el) {
      if (el.scrollHeight !== 0) {
        setTimeout(function () {
          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        });
      }
    },
    afterLeave: function afterLeave(el) {
      el.style.display = 'none';
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  },
  render: function render(h) {
    return h('transition', {
      props: {
        name: 'mu-expand'
      },
      on: {
        'before-enter': this.beforeEnter,
        enter: this.enter,
        'after-enter': this.afterEnter,
        'before-leave': this.beforeLeave,
        leave: this.leave,
        'after-leave': this.afterLeave
      }
    }, this.$slots.default);
  }
};
},{"../styles/components/expand-transition.less":188}],154:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleTransition = exports.BottomSheetTransition = exports.PopoverTransiton = exports.SlideBottomTransition = exports.SlideTopTransition = exports.FadeTransition = exports.ExpandTransition = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _isExtensible = require('babel-runtime/core-js/object/is-extensible');

var _isExtensible2 = _interopRequireDefault(_isExtensible);

var _ExpandTransition = require('./ExpandTransition');

Object.defineProperty(exports, 'ExpandTransition', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_ExpandTransition).default;
  }
});

require('../styles/transitions.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTransition(name, mode) {
  return {
    name: name,
    functional: true,
    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!(0, _isExtensible2.default)(context.data.on)) {
        context.data.on = (0, _extends3.default)({}, context.data.on);
      }

      if (mode) context.data.props.mode = mode;

      return h('transition', context.data, context.children);
    }
  };
}

var FadeTransition = exports.FadeTransition = createTransition('mu-fade-transition');
var SlideTopTransition = exports.SlideTopTransition = createTransition('mu-slide-top-transition');
var SlideBottomTransition = exports.SlideBottomTransition = createTransition('mu-slide-bottom-transition');
var PopoverTransiton = exports.PopoverTransiton = createTransition('mu-popover-transition');
var BottomSheetTransition = exports.BottomSheetTransition = createTransition('mu-bottom-sheet-transition');
var ScaleTransition = exports.ScaleTransition = createTransition('mu-scale-transition');
},{"babel-runtime/helpers/extends":203,"babel-runtime/core-js/object/is-extensible":218,"../styles/transitions.less":186,"./ExpandTransition":156}],46:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

var _transitions = require('../internal/transitions');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-alert',
  mixins: [_color2.default],
  props: {
    delete: Boolean,
    show: Boolean
  },
  methods: {
    handleDelete: function handleDelete(e) {
      e.stopPropagation();
      this.$emit('update:show', false);
      this.$emit('delete');
    }
  },
  render: function render(h) {
    var deleteIcon = h('svg', {
      staticClass: 'mu-alert-delete-icon',
      attrs: {
        viewBox: '0 0 24 24'
      },
      on: {
        click: this.handleDelete
      }
    }, [h('path', {
      attrs: {
        d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
      }
    })]);
    return h(_transitions.FadeTransition, [this.show ? h('div', {
      staticClass: 'mu-alert ' + this.getColorClass(),
      props: {
        'background-color': (0, _utils.getColor)(this.color)
      },
      on: this.$listeners
    }, [this.$slots.default, this.delete ? deleteIcon : undefined]) : undefined]);
  }
};
},{"../internal/mixins/color":165,"../internal/transitions":154,"../utils":185}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/alert.less');

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Alert2.default.install = function (Vue) {
  Vue.component(_Alert2.default.name, _Alert2.default);
};

exports.default = _Alert2.default;
},{"../styles/components/alert.less":45,"./Alert":46}],47:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],79:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],294:[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":257,"./_descriptors":258,"./_object-dp":255}],292:[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":294,"../../modules/_core":237}],211:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":292}],209:[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":211}],83:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-paper',
  functional: true,
  props: {
    circle: Boolean,
    rounded: {
      type: Boolean,
      default: true
    },
    zDepth: Number
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    var classObj = (0, _defineProperty3.default)({
      'mu-paper-circle': props.circle,
      'mu-paper-round': props.rounded
    }, 'mu-paper-' + props.zDepth, !!props.zDepth);
    data.staticClass = 'mu-paper ' + (data.staticClass || '') + ' ' + (0, _utils.convertClass)(classObj).join(' ');
    return h('div', data, children);
  }
};
},{"babel-runtime/helpers/defineProperty":209,"../utils":185}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/paper.less');

var _Paper = require('./Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Paper2.default.install = function (Vue) {
  Vue.component(_Paper2.default.name, _Paper2.default);
};

exports.default = _Paper2.default;
},{"../styles/components/paper.less":79,"./Paper":83}],44:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-appbar',
  mixins: [_color2.default],
  props: {
    zDepth: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    }
  },
  render: function render(h) {
    var slots = this.$slots;
    var left = slots.left && slots.left.length > 0 ? h('div', { staticClass: 'left' }, slots.left) : undefined;
    var right = slots.right && slots.right.length > 0 ? h('div', { staticClass: 'right' }, slots.right) : undefined;
    var center = h('div', { staticClass: 'mu-appbar-title' }, slots.default && slots.default.length > 0 ? slots.default : this.title);

    return h(_Paper2.default, {
      staticClass: 'mu-appbar ' + this.getColorClass(),
      style: {
        'background-color': (0, _utils.getColor)(this.color)
      },
      props: {
        zDepth: this.zDepth
      }
    }, [left, center, right]);
  }
};
},{"../Paper":26,"../internal/mixins/color":165,"../utils":185}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/appbar.less');

var _AppBar = require('./AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_AppBar2.default.install = function (Vue) {
  Vue.component(_AppBar2.default.name, _AppBar2.default);
};

exports.default = _AppBar2.default;
},{"../styles/components/appbar.less":47,"./AppBar":44}],51:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],53:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-avatar',
  mixins: [_color2.default],
  props: {
    textColor: String,
    size: {
      type: [Number, String],
      default: 48
    }
  },
  render: function render(h) {
    var size = (0, _utils.getWidth)(this.size);
    return h('div', {
      staticClass: 'mu-avatar ' + this.getColorClass() + ' ' + this.getTextColorClass(),
      style: {
        width: size,
        height: size,
        'background-color': (0, _utils.getColor)(this.color),
        'color': (0, _utils.getColor)(this.textColor)
      },
      on: this.$listeners
    }, [h('div', { class: 'mu-avatar-inner' }, this.$slots.default)]);
  }
};
},{"../utils":185,"../internal/mixins/color":165}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/avatar.less');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Avatar2.default.install = function (Vue) {
  Vue.component(_Avatar2.default.name, _Avatar2.default);
};

exports.default = _Avatar2.default;
},{"../styles/components/avatar.less":51,"./Avatar":53}],54:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],57:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-badge',
  mixins: [_color2.default],
  props: {
    content: {
      type: String,
      default: ''
    },
    circle: Boolean,
    badgeClass: [String, Object, Array]
  },
  render: function render(h) {
    var slots = this.$slots;
    var isFloat = slots.default && slots.default.length > 0;
    var badge = h('em', {
      staticClass: 'mu-badge ' + (0, _utils.convertClass)(this.badgeClass).join(' ') + ' ' + this.getColorClass(),
      style: {
        'background-color': (0, _utils.getColor)(this.color)
      },
      class: {
        'mu-badge-circle': this.circle,
        'mu-badge-float': isFloat
      }
    }, slots.content && slots.content.length > 0 ? slots.content : this.content);

    return h('div', {
      staticClass: 'mu-badge-container',
      on: this.$listeners
    }, [slots.default, badge]);
  }
};
},{"../utils":185,"../internal/mixins/color":165}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/badge.less');

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Badge2.default.install = function (Vue) {
  Vue.component(_Badge2.default.name, _Badge2.default);
};

exports.default = _Badge2.default;
},{"../styles/components/badge.less":54,"./Badge":57}],48:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],201:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],205:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],202:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

require('../styles/components/circle-ripple.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    mergeStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    styles: function styles() {
      return (0, _extends3.default)({
        color: this.color,
        opacity: this.opacity
      }, this.mergeStyle);
    }
  },
  render: function render(h) {
    return h('transition', {
      props: {
        name: 'mu-ripple'
      }
    }, [h('div', {
      class: 'mu-circle-ripple',
      style: this.styles
    })]);
  }
};
},{"babel-runtime/helpers/extends":203,"../styles/components/circle-ripple.less":205}],187:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/touch-ripple.less');

var _CircleRipple = require('./CircleRipple');

var _CircleRipple2 = _interopRequireDefault(_CircleRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    centerRipple: {
      type: Boolean,
      default: true
    },
    rippleWrapperClass: {},
    color: {
      type: String,
      default: ''
    },
    opacity: Number
  },
  data: function data() {
    return {
      nextKey: 0,
      ripples: []
    };
  },

  methods: {
    start: function start(event, isRippleTouchGenerated) {
      if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
        this.ignoreNextMouseDown = false;
        return;
      }
      this.ripples.push({
        key: this.nextKey++,
        color: this.color,
        opacity: this.opacity,
        style: this.centerRipple ? {} : this.getRippleStyle(event)
      });
      this.ignoreNextMouseDown = isRippleTouchGenerated;
    },
    end: function end() {
      if (this.ripples.length === 0) return;
      this.ripples.splice(0, 1);
      this.stopListeningForScrollAbort();
    },
    stopListeningForScrollAbort: function stopListeningForScrollAbort() {
      if (!this.handleMove) this.handleMove = this.handleTouchMove.bind(this);
      document.body.removeEventListener('touchmove', this.handleMove, false);
    },
    startListeningForScrollAbort: function startListeningForScrollAbort(event) {
      this.firstTouchY = event.touches[0].clientY;
      this.firstTouchX = event.touches[0].clientX;
      document.body.addEventListener('touchmove', this.handleMove, false);
    },
    handleMouseDown: function handleMouseDown(event) {
      if (event.button === 0) {
        this.start(event, false);
      }
    },
    handleTouchStart: function handleTouchStart(event) {
      if (event.touches) {
        this.startListeningForScrollAbort(event);
        this.startTime = Date.now();
      }
      this.start(event.touches[0], true);
    },
    handleTouchMove: function handleTouchMove(event) {
      var deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY);
      var deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX);
      // 判断滚动 6px
      if (deltaY > 6 || deltaX > 6) this.end();
      // const timeSinceStart = Math.abs(Date.now() - this.startTime)
      // if (timeSinceStart > 300) {
      //   this.stopListeningForScrollAbort()
      //   return
      // }
    },
    getRippleStyle: function getRippleStyle(event) {
      var el = this.$refs.holder;
      if (!el) return;
      var react = el.getBoundingClientRect();
      var elHeight = react.height;
      var elWidth = react.width;
      var isTouchEvent = event.touches && event.touches.length;
      var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
      var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
      var pointerX = pageX - react.left;
      var pointerY = pageY - react.top;
      var topLeftDiag = this.calcDiag(pointerX, pointerY);
      var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
      var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
      var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
      var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
      var rippleSize = rippleRadius * 2;
      var left = pointerX - rippleRadius;
      var top = pointerY - rippleRadius;
      return {
        directionInvariant: true,
        height: rippleSize + 'px',
        width: rippleSize + 'px',
        top: top + 'px',
        left: left + 'px'
      };
    },
    calcDiag: function calcDiag(a, b) {
      return Math.sqrt(a * a + b * b);
    },
    createCircleRipple: function createCircleRipple(h) {
      return this.ripples.map(function (ripple) {
        return h(_CircleRipple2.default, {
          props: {
            color: ripple.color,
            opacity: ripple.opacity,
            mergeStyle: ripple.style
          },
          key: ripple.key
        });
      });
    }
  },
  render: function render(h) {
    return h('div', {
      on: {
        mousedown: this.handleMouseDown,
        mouseup: this.end,
        mouseleave: this.end,
        touchstart: this.handleTouchStart,
        touchend: this.end,
        touchcancel: this.end
      }
    }, [h('div', {
      class: this.rippleWrapperClass,
      attrs: {
        class: 'mu-ripple-wrapper'
      },
      ref: 'holder'
    }, this.createCircleRipple(h)), this.$slots.default]);
  }
};
},{"../styles/components/touch-ripple.less":201,"./CircleRipple":202}],192:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],161:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/focus-ripple.less');

exports.default = {
  props: {
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    style: function style() {
      return {
        color: this.color,
        opacity: this.opacity
      };
    }
  },
  methods: {
    setRippleSize: function setRippleSize() {
      var el = this.$refs.innerCircle;
      var height = el.offsetHeight;
      var width = el.offsetWidth;
      var size = Math.max(height, width);

      var oldTop = 0;

      if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
        oldTop = parseInt(el.style.top);
      }

      el.style.height = size + 'px';
      el.style.top = height / 2 - size / 2 + oldTop + 'px';
    }
  },
  mounted: function mounted() {
    this.setRippleSize();
  },
  updated: function updated() {
    this.setRippleSize();
  },
  render: function render(h) {
    return h('div', {
      class: 'mu-focus-ripple-wrapper'
    }, [h('div', {
      ref: 'innerCircle',
      style: this.style,
      class: 'mu-focus-ripple'
    })]);
  }
};
},{"../styles/components/focus-ripple.less":192}],168:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    href: String,
    target: String,
    to: {
      type: [String, Object]
    },
    tag: {
      type: String,
      default: 'a'
    },
    activeClass: {
      type: String,
      default: 'router-link-active'
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    exact: Boolean,
    exactActiveClass: {
      type: String,
      default: 'router-link-exact-active'
    },
    append: Boolean,
    replace: Boolean
  },
  methods: {
    generateRouteProps: function generateRouteProps() {
      return {
        href: this.href,
        target: this.target,
        to: this.to,
        tag: this.tag,
        activeClass: this.activeClass,
        event: this.event,
        exact: this.exact,
        exactActiveClass: this.exactActiveClass,
        append: this.append,
        replace: this.replace
      };
    }
  }
};
},{}],169:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    ripple: {
      type: Boolean,
      default: true
    },
    rippleColor: {
      type: String,
      default: ''
    },
    rippleOpacity: {
      type: Number
    }
  }
};
},{}],207:[function(require,module,exports) {
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],155:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _TouchRipple = require('./TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _FocusRipple = require('./FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

var _route = require('./mixins/route');

var _route2 = _interopRequireDefault(_route);

var _ripple = require('./mixins/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabPressed = false;
var listening = false;

function listenForTabPresses() {
  if (!listening) {
    typeof window !== 'undefined' && window.addEventListener('keydown', function (event) {
      tabPressed = (0, _keycode2.default)(event) === 'tab';
    });
    listening = true;
  }
}

exports.default = {
  mixins: [_route2.default, _ripple2.default],
  props: {
    disabled: Boolean,
    centerRipple: Boolean,
    containerElement: String,
    disableKeyboardFocus: Boolean,
    wrapperClass: String,
    wrapperStyle: [String, Object],
    type: {
      type: String,
      default: 'button'
    },
    keyboardFocused: Boolean
  },
  data: function data() {
    return {
      hover: false,
      isKeyboardFocused: false
    };
  },

  computed: {
    buttonClass: function buttonClass() {
      var classNames = [];
      if (this.disabled) classNames.push('disabled');
      if (!this.disabled && (this.hover || this.isKeyboardFocused)) classNames.push('hover');
      return classNames.join(' ');
    }
  },
  beforeMount: function beforeMount() {
    var disabled = this.disabled,
        disableKeyboardFocus = this.disableKeyboardFocus,
        keyboardFocused = this.keyboardFocused;

    if (!disabled && keyboardFocused && !disableKeyboardFocus) {
      this.isKeyboardFocused = true;
    }
  },
  mounted: function mounted() {
    listenForTabPresses();
    if (this.isKeyboardFocused) {
      this.$el.focus();
      this.$emit('keyboardFocus', true);
    }
  },
  beforeUpdate: function beforeUpdate() {
    if ((this.disabled || this.disableKeyboardFocus) && this.isKeyboardFocused) {
      this.isKeyboardFocused = false;
      this.$emit('keyboardFocus', false);
    }
  },
  beforeDestory: function beforeDestory() {
    this.cancelFocusTimeout();
  },

  methods: {
    handleHover: function handleHover(event) {
      if (!this.disabled && (0, _utils.isPc)()) {
        this.hover = true;
        this.$emit('hover', event);
      }
    },
    handleOut: function handleOut(event) {
      if (!this.disabled && (0, _utils.isPc)()) {
        this.hover = false;
        this.$emit('hoverExit', event);
      }
    },
    removeKeyboardFocus: function removeKeyboardFocus(event) {
      if (this.isKeyboardFocused) {
        this.isKeyboardFocused = false;
        this.$emit('KeyboardFocus', false);
      }
    },
    setKeyboardFocus: function setKeyboardFocus(event) {
      if (!this.isKeyboardFocused) {
        this.isKeyboardFocused = true;
        this.$emit('KeyboardFocus', true);
      }
    },
    cancelFocusTimeout: function cancelFocusTimeout() {
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
    },
    handleKeydown: function handleKeydown(event) {
      if (!this.disabled && !this.disableKeyboardFocus) {
        if ((0, _keycode2.default)(event) === 'enter' && this.isKeyboardFocused) {
          this.$el.click();
        }
        if ((0, _keycode2.default)(event) === 'esc' && this.isKeyboardFocused) {
          this.removeKeyboardFocus(event);
        }
      }
    },
    handleFocus: function handleFocus(event) {
      var _this = this;

      if (!this.disabled && !this.disableKeyboardFocus) {
        this.focusTimeout = setTimeout(function () {
          if (tabPressed) {
            _this.setKeyboardFocus(event);
            tabPressed = false;
          }
        }, 150);
      }
    },
    handleBlur: function handleBlur(event) {
      this.cancelFocusTimeout();
      this.removeKeyboardFocus(event);
    },
    handleClick: function handleClick(event) {
      if (!this.disabled) {
        tabPressed = false;
        // this.$el.blur(); // 点击之后失去焦点
        this.removeKeyboardFocus(event);
        this.$emit('click', event);
      }
    },
    getTagName: function getTagName() {
      var defaultTag = 'button';
      switch (true) {
        case !!this.to:
          return 'router-link';
        case !!this.href:
          return 'a';
        case !!this.containerElement:
          return this.containerElement;
        default:
          return defaultTag;
      }
    },
    createButtonChildren: function createButtonChildren(h) {
      var isKeyboardFocused = this.isKeyboardFocused,
          disabled = this.disabled,
          ripple = this.ripple,
          disableKeyboardFocus = this.disableKeyboardFocus,
          rippleColor = this.rippleColor,
          rippleOpacity = this.rippleOpacity;

      var children = [];
      children = children.concat(this.$slots.default);
      var FocusRippleEL = isKeyboardFocused && !disableKeyboardFocus && !disabled && ripple ? h(_FocusRipple2.default, {
        color: rippleColor,
        opacity: rippleOpacity
      }) : undefined;

      if (!disabled && ripple) {
        children = [h(_TouchRipple2.default, {
          class: this.wrapperClass,
          style: this.wrapperStyle,
          props: {
            color: this.rippleColor,
            centerRipple: this.centerRipple,
            opacity: this.rippleOpacity
          }
        }, this.$slots.default)];
      } else {
        children = [h('div', {
          class: this.wrapperClass,
          style: this.wrapperStyle
        }, this.$slots.default)];
      }
      children.unshift(FocusRippleEL);
      return children;
    }
  },
  watch: {
    disabled: function disabled(val) {
      if (!val) this.hover = false;
    }
  },
  render: function render(h) {
    var tagName = this.getTagName();
    var attrs = {
      tagret: this.target,
      tabindex: !this.disabled ? this.$attrs.tabindex || 0 : -1
    };

    if (tagName === 'button') {
      attrs.disabled = this.disabled;
      attrs.type = this.type;
    }

    if (this.href && !this.disabled) {
      attrs.href = this.href;
    }

    var props = this.to ? {
      to: this.to,
      tag: this.tag,
      activeClass: this.activeClass,
      event: this.event,
      exact: this.exact,
      append: this.append,
      replace: this.replace,
      exactActiveClass: this.exactActiveClass
    } : {};

    return h(tagName, (0, _defineProperty3.default)({
      class: this.buttonClass,
      attrs: attrs,
      props: props,
      style: tagName === 'button' ? {
        'user-select': this.disabled ? '' : 'none',
        '-webkit-user-select': this.disabled ? '' : 'none',
        'outline': 'none',
        'appearance': 'none'
      } : {}
    }, tagName === 'router-link' ? 'nativeOn' : 'on', {
      mouseenter: this.handleHover,
      mouseleave: this.handleOut,
      touchend: this.handleOut,
      touchcancel: this.handleOut,
      click: this.handleClick,
      focus: this.handleFocus,
      blur: this.handleBlur,
      keydown: this.handleKeydown
    }), this.createButtonChildren(h));
  }
};
},{"babel-runtime/helpers/defineProperty":209,"./TouchRipple":187,"./FocusRipple":161,"./mixins/route":168,"./mixins/ripple":169,"keycode":207,"../utils":185}],50:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-bottom-nav',
  provide: function provide() {
    return {
      getBottomNavValue: this.getBottomNavValue,
      getBottomNavShift: this.getBottomNavShift,
      bottomNavItemClick: this.bottomNavItemClick,
      getDefaultVal: this.getDefaultVal
    };
  },

  props: {
    shift: Boolean,
    value: {}
  },
  data: function data() {
    return {
      activeValue: this.value || 0
    };
  },

  methods: {
    getBottomNavValue: function getBottomNavValue() {
      return this.activeValue;
    },
    getBottomNavShift: function getBottomNavShift() {
      return this.shift;
    },
    getDefaultVal: function getDefaultVal() {
      if (!this.index) this.index = 0;
      return this.index++;
    },
    bottomNavItemClick: function bottomNavItemClick(value) {
      this.activeValue = value;
    }
  },
  watch: {
    val: function val(_val) {
      this.activeValue = _val;
    },
    activeValue: function activeValue(val) {
      this.$emit('update:value', val);
      this.$emit('change', val);
    }
  },
  render: function render(h) {
    return h(_AbstractButton2.default, {
      class: {
        'mu-bottom-nav': true,
        'mu-bottom-nav-shift': this.shift
      },
      props: {
        ripple: this.shift,
        wrapperClass: 'mu-bottom-nav-shift-wrapper',
        containerElement: 'div',
        rippleOpacity: 0.3
      }
    }, this.$slots.default);
  }
};
},{"../internal/AbstractButton":155}],81:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-icon',
  functional: true,
  props: {
    value: String,
    left: Boolean,
    right: Boolean,
    size: Number,
    color: String
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;

    if (!props.value) return null;
    data.style = data.style || {};
    data.style = (0, _extends3.default)({}, data.style, {
      'font-size': props.size + 'px',
      'width': props.size + 'px',
      'height': props.size + 'px',
      'color': (0, _utils.getColor)(props.color)
    });
    var isMaterial = props.value.indexOf(':') !== 0;
    var text = isMaterial ? props.value : '';

    data.staticClass = (data.staticClass || '') + ' mu-icon ' + (isMaterial ? 'material-icons' : props.value.substring(1)) + ' ' + (props.left ? 'mu-icon-left' : '') + ' ' + (props.right ? 'mu-icon-right' : '');
    return h('i', data, text);
  }
};
},{"babel-runtime/helpers/extends":203,"../utils":185}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Icon2.default.install = function (Vue) {
  Vue.component(_Icon2.default.name, _Icon2.default);
};

exports.default = _Icon2.default;
},{"./Icon":81}],49:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _route = require('../internal/mixins/route');

var _route2 = _interopRequireDefault(_route);

var _ripple = require('../internal/mixins/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-bottom-nav-item',
  mixins: [_route2.default, _ripple2.default],
  inject: ['getBottomNavValue', 'getBottomNavShift', 'getDefaultVal', 'bottomNavItemClick'],
  props: {
    icon: String,
    title: String,
    value: {}
  },
  data: function data() {
    return {
      itemVal: null
    };
  },
  created: function created() {
    this.itemVal = (0, _utils.isNotNull)(this.value) ? this.value : this.getDefaultVal();
  },

  computed: {
    active: function active() {
      return this.getBottomNavValue() === this.itemVal;
    },
    shift: function shift() {
      return this.getBottomNavShift();
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.bottomNavItemClick(this.itemVal);
    }
  },
  watch: {
    value: function value(val) {
      this.itemVal = val;
    }
  },
  render: function render(h) {
    var icon = this.icon ? h(_Icon2.default, { class: 'mu-bottom-item-icon', props: { value: this.icon } }) : undefined;
    var title = this.title ? h('span', { staticClass: 'mu-bottom-item-text' }, this.title) : undefined;
    return h(_AbstractButton2.default, {
      staticClass: 'mu-bottom-item',
      class: {
        'mu-bottom-item-active': this.active
      },
      props: (0, _extends3.default)({
        ripple: !this.shift && this.ripple,
        containerElement: 'div',
        wrapperClass: 'mu-bottom-item-wrapper'
      }, this.generateRouteProps()),
      on: {
        click: this.handleClick
      }
    }, [icon, title]);
  }
};
},{"babel-runtime/helpers/extends":203,"../internal/AbstractButton":155,"../Icon":23,"../internal/mixins/route":168,"../internal/mixins/ripple":169,"../utils":185}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomNavItem = exports.BottomNav = undefined;

require('../styles/components/bottom-nav.less');

var _BottomNav = require('./BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _BottomNavItem = require('./BottomNavItem');

var _BottomNavItem2 = _interopRequireDefault(_BottomNavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BottomNav2.default.install = function (Vue) {
  Vue.component(_BottomNav2.default.name, _BottomNav2.default);
  Vue.component(_BottomNavItem2.default.name, _BottomNavItem2.default);
};

exports.BottomNav = _BottomNav2.default;
exports.BottomNavItem = _BottomNavItem2.default;
exports.default = _BottomNav2.default;
},{"../styles/components/bottom-nav.less":48,"./BottomNav":50,"./BottomNavItem":49}],52:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],204:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],199:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../../../styles/components/overlay.less');

var _transitions = require('../../transitions');

exports.default = {
  name: 'mu-overlay',
  props: {
    show: Boolean,
    fixed: Boolean,
    onClick: Function,
    opacity: {
      type: Number,
      default: 0.4
    },
    color: String,
    zIndex: Number
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        'opacity': this.opacity,
        'background-color': this.color,
        'position': this.fixed ? 'fixed' : '',
        'z-index': this.zIndex
      };
    }
  },
  methods: {
    prevent: function prevent(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handleClick: function handleClick() {
      if (this.onClick) {
        this.onClick();
      }
    }
  },
  render: function render(h) {
    return h(_transitions.FadeTransition, [h('div', {
      staticClass: 'mu-overlay',
      style: this.overlayStyle,
      directives: [{
        name: 'show',
        value: this.show
      }],
      on: {
        click: this.handleClick,
        touchmove: this.prevent
      }
    })]);
  }
};
},{"../../../styles/components/overlay.less":204,"../../transitions":154}],183:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Overlay = _vue2.default.extend(_Overlay2.default);

var PopupManager = {
  instances: [],
  overlay: false,

  open: function open(instance) {
    if (!instance || this.instances.indexOf(instance) !== -1) return;
    if (!this.overlay && instance.overlay) {
      this.showOverlay(instance);
    }
    this.instances.push(instance);
    this.changeOverlayStyle();
  },
  close: function close(instance) {
    var _this = this;

    var index = this.instances.indexOf(instance);
    if (index === -1) return;
    this.instances.splice(index, 1);
    _vue2.default.nextTick(function () {
      if (_this.instances.length === 0) {
        _this.closeOverlay();
      }
      _this.changeOverlayStyle();
    });
  },
  showOverlay: function showOverlay(instance) {
    var overlay = this.overlay = new Overlay({
      el: document.createElement('div')
    });
    overlay.fixed = true;
    overlay.color = instance.overlayColor;
    overlay.opacity = instance.overlayOpacity;
    overlay.zIndex = instance.overlayZIndex;
    overlay.onClick = this.handleOverlayClick.bind(this);
    document.body.appendChild(overlay.$el);
    this.preventScrolling();
    _vue2.default.nextTick(function () {
      overlay.show = true;
    });
  },

  // 还原滚动设置
  preventScrolling: function preventScrolling() {
    if (this.locked) return;
    // body 操作
    var body = document.getElementsByTagName('body')[0];
    var html = document.getElementsByTagName('html')[0];
    this.bodyOverflow = body.style.overflow;
    this.htmlOverflow = html.style.overflow;
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    this.locked = true;
  },


  // 禁止滚动
  allowScrolling: function allowScrolling() {
    var body = document.getElementsByTagName('body')[0];
    var html = document.getElementsByTagName('html')[0];
    body.style.overflow = this.bodyOverflow || '';
    html.style.overflow = this.htmlOverflow || '';
    this.bodyOverflow = null;
    this.htmlOverflow = null;
    this.locked = false;
  },
  closeOverlay: function closeOverlay() {
    if (!this.overlay) return;
    this.allowScrolling();
    var overlay = this.overlay;
    overlay.show = false;
    this.overlay = null;
    setTimeout(function () {
      document.body.removeChild(overlay.$el);
      overlay.$destroy();
    }, 450);
  },
  changeOverlayStyle: function changeOverlayStyle() {
    var instance = this.instances[this.instances.length - 1];
    if (!this.overlay || this.instances.length === 0) return;
    if (instance.overlay) {
      this.overlay.color = instance.overlayColor;
      this.overlay.opacity = instance.overlayOpacity;
      this.overlay.zIndex = instance.overlayZIndex;
    } else {
      this.closeOverlay();
    }
  },
  handleOverlayClick: function handleOverlayClick() {
    if (this.instances.length === 0) return;
    var instance = this.instances[this.instances.length - 1];
    if (instance.overlayClick) {
      instance.overlayClick();
    }
  }
};

typeof window !== 'undefined' && window.addEventListener('keydown', function (e) {
  if (PopupManager.instances.length === 0 || (0, _keycode2.default)(e) !== 'esc') return;
  var instance = PopupManager.instances[PopupManager.instances.length - 1];
  if (instance.escPress) {
    instance.escPress();
  }
});

exports.default = PopupManager;
},{"vue":43,"keycode":207,"./Overlay":199}],184:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var zIndex = 20141223;

var getZIndex = exports.getZIndex = function getZIndex() {
  return zIndex++;
};

var getDOM = exports.getDOM = function getDOM(dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};
},{}],200:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    open: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    overlayClose: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: Number,
      default: 0.4
    },
    overlayColor: {
      type: String,
      default: '#000'
    },
    escPressClose: { // 按退出键是否触发关闭事件
      type: Boolean,
      default: true
    },
    appendBody: { // 是否添加到 body 元素后, 内部使用
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      overlayZIndex: (0, _utils.getZIndex)(),
      zIndex: (0, _utils.getZIndex)()
    };
  },

  methods: {
    overlayClick: function overlayClick(e) {
      if (!this.overlay || !this.overlayClose) return;
      this.$emit('update:open', false);
      this.$emit('close', 'overlay');
    },
    escPress: function escPress(e) {
      if (!this.escPressClose) return;
      this.$emit('update:open', false);
      this.$emit('close', 'esc');
    },
    setZIndex: function setZIndex() {
      var dom = this.$el;
      if (!this.zIndex) this.zIndex = (0, _utils.getZIndex)();
      if (dom) dom.style.zIndex = this.zIndex;
    },
    resetZIndex: function resetZIndex() {
      this.overlayZIndex = (0, _utils.getZIndex)();
      this.zIndex = (0, _utils.getZIndex)();
    },
    popupEl: function popupEl() {
      return this.$el;
    },
    appendPopupElToBody: function appendPopupElToBody() {
      var _this = this;

      if (!this.appendBody) return;
      this.$nextTick(function () {
        var popupEl = _this.popupEl();
        if (!popupEl) {
          console.warn('必须有一个 ref=‘popup’ 的元素');
          return;
        }
        document.body.appendChild(popupEl);
      });
    }
  },
  mounted: function mounted() {
    if (this.open) {
      _manager2.default.open(this);
      this.appendPopupElToBody();
    }
  },
  updated: function updated() {
    if (!this.overlay && this.open) {
      this.setZIndex();
    }
  },
  beforeDestroy: function beforeDestroy() {
    _manager2.default.close(this);
    if (this.appendBody) {
      var popupEl = this.popupEl();
      if (!popupEl) return;
      if (popupEl.parentNode) popupEl.parentNode.removeChild(popupEl);
    }
  },

  watch: {
    open: function open(val, oldVal) {
      if (val) {
        this.resetZIndex();
        _manager2.default.open(this);
        this.appendPopupElToBody();
      } else {
        _manager2.default.close(this);
      }
    }
  }
};
},{"./manager":183,"./utils":184}],55:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _transitions = require('../internal/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-bottom-sheet',
  mixins: [_popup2.default],
  render: function render(h) {
    return h(_transitions.BottomSheetTransition, [this.open ? h('div', {
      staticClass: 'mu-bottom-sheet',
      style: {
        'z-index': this.zIndex
      }
    }, this.$slots.default) : undefined]);
  }
};
},{"../internal/mixins/popup":200,"../internal/transitions":154}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/bottom-sheet.less');

var _BottomSheet = require('./BottomSheet');

var _BottomSheet2 = _interopRequireDefault(_BottomSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BottomSheet2.default.install = function (Vue) {
  Vue.component(_BottomSheet2.default.name, _BottomSheet2.default);
};

exports.default = _BottomSheet2.default;
},{"../styles/components/bottom-sheet.less":52,"./BottomSheet":55}],56:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],58:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-breadcrumbs',
  props: {
    divider: {
      type: String,
      default: '/'
    }
  },
  methods: {
    createChildren: function createChildren(h) {
      var _this = this;

      if (!this.$slots.default) return;
      var divider = this.$slots.divider ? this.$slots.divider : this.divider;
      var children = [];
      var length = this.$slots.default.length;
      var dividerData = { staticClass: 'mu-breadcrumbs-divider' };

      this.$slots.default.forEach(function (el, i) {
        children.push(el);
        if (!el.componentOptions || el.componentOptions.tag !== 'mu-breadcrumbs-item' || i === length - 1) return;

        children.push(_this.$createElement('li', dividerData, divider));
      });
      return children;
    }
  },
  render: function render(h) {
    return h('ul', {
      staticClass: 'mu-breadcrumbs'
    }, this.createChildren(h));
  }
};
},{}],59:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _route = require('../internal/mixins/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-breadcrumbs-item',
  mixins: [_route2.default],
  props: {
    disabled: Boolean
  },
  render: function render(h) {
    var props = this.to ? this.generateRouteProps() : {};
    return h('li', [h(this.to ? 'router-link' : 'a', {
      staticClass: 'mu-breadcrumbs-item',
      class: this.disabled ? 'is-disbaled' : '',
      props: props
    }, this.$slots.default)]);
  }
};
},{"../internal/mixins/route":168}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbsItem = exports.Breadcrumbs = undefined;

require('../styles/components/breadcrumbs.less');

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _BreadcrumbsItem = require('./BreadcrumbsItem');

var _BreadcrumbsItem2 = _interopRequireDefault(_BreadcrumbsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Breadcrumbs2.default.install = function (Vue) {
  Vue.component(_Breadcrumbs2.default.name, _Breadcrumbs2.default);
  Vue.component(_BreadcrumbsItem2.default.name, _BreadcrumbsItem2.default);
};

exports.Breadcrumbs = _Breadcrumbs2.default;
exports.BreadcrumbsItem = _BreadcrumbsItem2.default;
exports.default = _Breadcrumbs2.default;
},{"../styles/components/breadcrumbs.less":56,"./Breadcrumbs":58,"./BreadcrumbsItem":59}],71:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],172:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    disabled: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    keyboardFocused: Boolean
  },
  data: function data() {
    return {
      focus: this.focus
    };
  },

  methods: {
    handleClick: function handleClick(e) {
      this.$emit('click', e);
    },
    handleKeyboardFocus: function handleKeyboardFocus(isFocus) {
      this.focus = isFocus;
      this.$emit('keyboard-focus', isFocus);
    },
    handleHover: function handleHover(e) {
      this.$emit('hover', e);
    },
    handleHoverExit: function handleHoverExit(e) {
      this.$emit('hover-exit', e);
    },
    getListener: function getListener() {
      return {
        click: this.handleClick,
        keyboardFocus: this.handleKeyboardFocus,
        hover: this.handleHover,
        hoverExit: this.handleHoverExit
      };
    }
  }
};
},{}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _route = require('../internal/mixins/route');

var _route2 = _interopRequireDefault(_route);

var _ripple = require('../internal/mixins/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _button = require('../internal/mixins/button');

var _button2 = _interopRequireDefault(_button);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-button',
  mixins: [_route2.default, _ripple2.default, _button2.default, _color2.default],
  props: {
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    small: Boolean,
    large: Boolean,
    round: Boolean,
    fullWidth: Boolean
  },
  computed: {
    buttonClass: function buttonClass() {
      var _ref;

      return _ref = {
        'mu-fab-button': this.fab,
        'mu-flat-button': this.flat,
        'mu-icon-button': this.icon,
        'mu-raised-button': !this.icon && !this.flat && !this.fab,
        'mu-button-small': this.small,
        'mu-button-large': this.large,
        'mu-button-full-width': !this.fab && !this.icon && this.fullWidth
      }, (0, _defineProperty3.default)(_ref, this.getColorClass(), true), (0, _defineProperty3.default)(_ref, 'mu-button-round', this.round), (0, _defineProperty3.default)(_ref, 'is-focus', this.focus), _ref;
    }
  },
  render: function render(h) {
    return h(_AbstractButton2.default, {
      staticClass: 'mu-button',
      class: this.buttonClass,
      style: (0, _defineProperty3.default)({}, this.flat || this.icon ? 'color' : 'background-color', !this.disabled ? (0, _utils.getColor)(this.color) : ''),
      props: (0, _extends3.default)({
        wrapperClass: 'mu-button-wrapper',
        disabled: this.disabled,
        keyboardFocused: this.keyboardFocused,
        type: this.type,
        centerRipple: this.icon,
        ripple: this.ripple,
        rippleOpacity: this.rippleOpacity,
        rippleColor: this.rippleColor
      }, this.generateRouteProps()),
      on: (0, _extends3.default)({}, this.getListener())
    }, this.$slots.default);
  }
};
},{"babel-runtime/helpers/extends":203,"babel-runtime/helpers/defineProperty":209,"../internal/mixins/route":168,"../internal/mixins/ripple":169,"../internal/mixins/button":172,"../internal/mixins/color":165,"../internal/AbstractButton":155,"../utils":185}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/button.less');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Button2.default.install = function (Vue) {
  Vue.component(_Button2.default.name, _Button2.default);
};

exports.default = _Button2.default;
},{"../styles/components/button.less":71,"./Button":70}],64:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],60:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-card-header',
  props: {
    title: String,
    subTitle: String
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        slots = _ref.slots;

    var title = props.title || props.subTitle ? h('div', {
      staticClass: 'mu-card-header-title'
    }, [h('div', { staticClass: 'mu-card-title' }, props.title), h('div', { staticClass: 'mu-card-sub-title' }, props.subTitle)]) : undefined;

    data.staticClass = (data.staticClass || '') + ' mu-card-header';
    return h('div', data, [slots.avatar, title, slots.default]);
  }
};
},{}],61:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-card-media',
  props: {
    title: String,
    subTitle: String
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    var title = props.title || props.subTitle ? h('div', {
      staticClass: 'mu-card-media-title'
    }, [h('div', { staticClass: 'mu-card-title' }, props.title), h('div', { staticClass: 'mu-card-sub-title' }, props.subTitle)]) : undefined;

    data.staticClass = (data.staticClass || '') + ' mu-card-media';
    return h('div', data, [children, title]);
  }
};
},{}],62:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-card-title',
  props: {
    title: String,
    subTitle: String
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;

    data.staticClass = (data.staticClass || '') + ' mu-card-title-container';
    return h('div', data, [h('div', { staticClass: 'mu-card-title' }, props.title), h('div', { staticClass: 'mu-card-sub-title' }, props.subTitle)]);
  }
};
},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardText = exports.CardActions = exports.Card = exports.CardTitle = exports.CardMedia = exports.CardHeader = undefined;

require('../styles/components/card.less');

var _CardHeader = require('./CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardMedia = require('./CardMedia');

var _CardMedia2 = _interopRequireDefault(_CardMedia);

var _CardTitle = require('./CardTitle');

var _CardTitle2 = _interopRequireDefault(_CardTitle);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CardHeader = _CardHeader2.default;
exports.CardMedia = _CardMedia2.default;
exports.CardTitle = _CardTitle2.default;
var Card = exports.Card = (0, _utils.createSimpleFunctional)('mu-card', 'div', 'mu-card');
var CardActions = exports.CardActions = (0, _utils.createSimpleFunctional)('mu-card-actions', 'div', 'mu-card-actions');
var CardText = exports.CardText = (0, _utils.createSimpleFunctional)('mu-card-text', 'div', 'mu-card-text');

Card.install = function (Vue) {
  Vue.component(Card.name, Card);
  Vue.component(_CardHeader2.default.name, _CardHeader2.default);
  Vue.component(_CardMedia2.default.name, _CardMedia2.default);
  Vue.component(_CardTitle2.default.name, _CardTitle2.default);
  Vue.component(CardActions.name, CardActions);
  Vue.component(CardText.name, CardText);
};

exports.default = Card;
},{"../styles/components/card.less":64,"./CardHeader":60,"./CardMedia":61,"./CardTitle":62,"../utils":185}],65:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],297:[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":235}],298:[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":233,"./_wks":234}],299:[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":255,"./_property-desc":256}],238:[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":262,"./_wks":234}],236:[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":238,"./_wks":234,"./_iterators":233,"./_core":237}],300:[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":234}],295:[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":281,"./_export":257,"./_to-object":280,"./_iter-call":297,"./_is-array-iter":298,"./_to-length":290,"./_create-property":299,"./core.get-iterator-method":236,"./_iter-detect":300}],293:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":223,"../../modules/es6.array.from":295,"../../modules/_core":237}],210:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":293}],208:[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":210}],171:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'checkbox';
  // checkbox
  var iconProps = type === 'switch' ? {} : { uncheckIcon: String, checkedIcon: String };
  return {
    inheritAttrs: false,
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: (0, _extends3.default)({
      label: String,
      labelLeft: Boolean
    }, iconProps, {
      disabled: Boolean,
      tabIndex: [Number, String]
    }),
    methods: {
      start: function start(event) {
        if (this.disabled) return;
        if (event.type !== 'mousedown' || event.button === 0) {
          this.$refs.ripple.start(event);
        }
        this.$emit(event.type, event);
      },
      end: function end(event) {
        if (this.disabled) return;
        this.$refs.ripple.end();
        this.$emit(event.type, event);
      },
      handleClick: function handleClick(e) {
        if (this.disabled) return;
        this.toggle();
        this.$emit('click', e);
      },
      handleKeydown: function handleKeydown(e) {
        if (this.disabled) return;
        this.end(e);
        if ((0, _keycode2.default)(e) === 'enter') this.handleClick(e);
      },
      createRipple: function createRipple(h, staticClass, children) {
        return this.disabled ? h('div', {
          staticClass: staticClass
        }, children) : h(_TouchRipple2.default, {
          staticClass: staticClass,
          props: {
            rippleWrapperClass: 'mu-' + type + '-ripple-wrapper',
            centerRipple: true
          },
          ref: 'ripple'
        }, children);
      },
      createInputElement: function createInputElement(h) {
        return h('input', {
          attrs: (0, _extends3.default)({}, this.$attrs, {
            type: type === 'switch' ? 'checkbox' : type,
            disabled: this.disabled,
            checked: this.checked,
            tabindex: -1
          })
        });
      },
      createSelect: function createSelect(h, view) {
        var label = this.label ? h('div', { staticClass: 'mu-' + type + '-label' }, this.label) : undefined;
        var wrapper = h('div', {
          staticClass: 'mu-' + type + '-wrapper'
        }, this.labelLeft ? [label, view] : [view, label]);

        return h('div', {
          staticClass: 'mu-' + type,
          attrs: {
            tabindex: this.disabled ? -1 : this.tabIndex ? this.tabIndex : 0
          },
          class: {
            'label-left': this.labelLeft,
            'disabled': this.disabled,
            'no-label': !this.label
          },
          on: (0, _extends3.default)({}, this.$listeners, {
            click: this.handleClick,
            keydown: this.handleKeydown,
            mousedown: this.start,
            mouseleave: this.end,
            mouseup: this.end,
            touchstart: this.start,
            touchend: this.end,
            touchcancel: this.end,
            focus: this.start,
            blur: this.end
          })
        }, [this.createInputElement(h), wrapper]);
      }
    }
  };
};

var _TouchRipple = require('../TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"babel-runtime/helpers/extends":203,"../TouchRipple":187,"keycode":207}],63:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _select = require('../internal/mixins/select');

var _select2 = _interopRequireDefault(_select);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

var _utils = require('../utils');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-checkbox',
  mixins: [(0, _select2.default)('checkbox'), _color2.default],
  props: {
    inputValue: [Boolean, Array]
  },
  computed: {
    checked: function checked() {
      if (!this.inputValue) return false;
      var inputValue = this.inputValue;
      var value = this.$attrs.value;
      if (inputValue instanceof Array) return inputValue.indexOf(value) !== -1;
      return inputValue;
    }
  },
  methods: {
    toggle: function toggle() {
      var inputValue = this.inputValue;
      var value = this.$attrs.value;
      if (!inputValue || typeof inputValue === 'boolean') {
        this.$emit('change', !inputValue);
        return;
      }
      if (this.checked) {
        inputValue.splice(inputValue.indexOf(value), 1);
        this.$emit('change', inputValue);
      } else {
        this.$emit('change', [].concat((0, _toConsumableArray3.default)(inputValue), [value]));
      }
    }
  },
  render: function render(h) {
    var colorClass = this.getNormalColorClass(this.color, true);
    var colorStyle = (0, _utils.getColor)(this.color);
    var defaultSvgUnCheckIcon = h('svg', {
      staticClass: 'mu-checkbox-icon-uncheck mu-checkbox-svg-icon ' + (this.checked ? colorClass : ''),
      style: {
        color: this.checked ? colorStyle : ''
      },
      attrs: {
        viewBox: '0 0 24 24'
      }
    }, [h('path', {
      attrs: {
        d: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'
      }
    })]);
    var defaultSvgCheckedIcon = h('svg', {
      staticClass: 'mu-checkbox-icon-checked mu-checkbox-svg-icon ' + colorClass,
      style: {
        color: colorStyle
      },
      attrs: {
        viewBox: '0 0 24 24'
      }
    }, [h('path', {
      attrs: {
        d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      }
    })]);
    var view = this.createRipple(h, 'mu-checkbox-icon', [this.uncheckIcon ? h(_Icon2.default, {
      staticClass: 'mu-checkbox-icon-uncheck ' + (this.checked ? colorClass : ''),
      style: {
        color: this.checked ? colorStyle : ''
      },
      props: {
        value: this.uncheckIcon
      }
    }) : defaultSvgUnCheckIcon, this.checkedIcon ? h(_Icon2.default, {
      staticClass: 'mu-checkbox-icon-checked ' + colorClass,
      style: {
        color: colorStyle
      },
      props: {
        value: this.checkedIcon
      }
    }) : defaultSvgCheckedIcon]);
    return this.createSelect(h, view);
  }
};
},{"babel-runtime/helpers/toConsumableArray":208,"../internal/mixins/select":171,"../internal/mixins/color":165,"../utils":185,"../Icon":23}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/checkbox.less');

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Checkbox2.default.install = function (Vue) {
  Vue.component(_Checkbox2.default.name, _Checkbox2.default);
};

exports.default = _Checkbox2.default;
},{"../styles/components/checkbox.less":65,"./Checkbox":63}],67:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],69:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-chip',
  mixins: [_color2.default],
  props: {
    delete: Boolean,
    selected: Boolean,
    textColor: String
  },
  methods: {
    handleDelete: function handleDelete(e) {
      e.stopPropagation();
      this.$emit('delete');
    }
  },
  render: function render(h) {
    var svgDeleteIcon = h('svg', {
      staticClass: 'mu-chip-delete-icon',
      attrs: {
        viewBox: '0 0 24 24'
      },
      on: {
        click: this.handleDelete
      }
    }, [h('path', {
      attrs: {
        d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
      }
    })]);

    return h('span', {
      staticClass: 'mu-chip ' + this.getColorClass() + ' ' + this.getTextColorClass(),
      class: {
        'is-deletable': this.selected
      },
      attrs: {
        tabindex: 0
      },
      style: {
        color: (0, _utils.getColor)(this.textColor),
        backgroundColor: (0, _utils.getColor)(this.color)
      },
      on: this.$listeners
    }, [this.$slots.default, this.delete ? svgDeleteIcon : undefined]);
  }
};
},{"../utils":185,"../internal/mixins/color":165}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/chip.less');

var _Chip = require('./Chip');

var _Chip2 = _interopRequireDefault(_Chip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Chip2.default.install = function (Vue) {
  Vue.component(_Chip2.default.name, _Chip2.default);
};

exports.default = _Chip2.default;
},{"../styles/components/chip.less":67,"./Chip":69}],95:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],157:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    dateTimeFormat: Object,
    monthDaySelected: {
      type: Boolean,
      default: true
    },
    selectedDate: Date
  },
  data: function data() {
    return {
      displayDates: [this.selectedDate],
      slideType: 'next'
    };
  },

  methods: {
    replaceSelected: function replaceSelected(date) {
      var oldDate = this.displayDates[0];
      this.slideType = date.getTime() > oldDate.getTime() ? 'next' : 'prev';
      this.displayDates.push(date);
      this.displayDates.splice(0, 1);
    },
    createYearSlide: function createYearSlide(h) {
      var _this = this;

      return this.displayDates.map(function (displayDate, index) {
        var fullYear = displayDate.getFullYear();
        return h('transition', {
          props: {
            name: 'mu-date-display-' + _this.slideType
          },
          key: index
        }, [h('div', {
          staticClass: 'mu-date-display-slideIn-wrapper',
          key: fullYear
        }, [h('div', { staticClass: 'mu-date-display-year-title' }, fullYear)])]);
      });
    },
    createMonthSlide: function createMonthSlide(h) {
      var _this2 = this;

      return this.displayDates.map(function (displayDate, index) {
        var displayMonthDay = _this2.dateTimeFormat.formatDisplay(displayDate);
        return h('transition', {
          props: {
            name: 'mu-date-display-' + _this2.slideType
          },
          key: index
        }, [h('div', {
          staticClass: 'mu-date-display-slideIn-wrapper',
          key: displayMonthDay
        }, [h('div', { staticClass: 'mu-date-display-monthday-title' }, displayMonthDay)])]);
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    var displayYear = h('div', {
      staticClass: 'mu-date-display-year',
      on: {
        click: function click() {
          return _this3.$emit('changeView', 'year');
        }
      }
    }, this.createYearSlide(h));
    var displayMonthDay = h('div', {
      staticClass: 'mu-date-display-monthday',
      on: {
        click: function click() {
          return _this3.$emit('changeView', 'monthDay');
        }
      }
    }, this.createMonthSlide(h));

    return h('div', {
      staticClass: 'mu-date-display',
      class: {
        'selected-year': !this.monthDaySelected
      }
    }, [displayYear, displayMonthDay]);
  },

  watch: {
    selectedDate: function selectedDate(val) {
      this.replaceSelected(val);
    }
  }
};
},{}],189:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    selected: Boolean,
    date: Date,
    disabled: Boolean
  },
  data: function data() {
    return {
      hover: false
    };
  },

  computed: {
    isNow: function isNow() {
      var now = new Date();
      return this.date && this.date.getYear() === now.getYear() && this.date.getMonth() === now.getMonth() && this.date.getDate() === now.getDate();
    },
    dayButtonClass: function dayButtonClass() {
      return {
        selected: this.selected,
        disabled: this.disabled,
        now: this.isNow
      };
    }
  },
  render: function render(h) {
    return this.date ? h('button', {
      staticClass: 'mu-day-button',
      class: this.dayButtonClass,
      on: this.$listeners,
      domProps: {
        disabled: this.disabled
      }
    }, [h('div', { class: 'mu-day-button-bg' }), h('span', {
      class: 'mu-day-button-text',
      domProps: {
        innerHTML: this.date.getDate()
      }
    })]) : h('span', { class: 'mu-day-empty' });
  }
};
},{}],190:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    dateTimeFormat: Object,
    displayDates: Array,
    nextMonth: {
      type: Boolean,
      default: true
    },
    prevMonth: {
      type: Boolean,
      default: true
    },
    slideType: String
  },
  methods: {
    createTitleSlide: function createTitleSlide(h) {
      var _this = this;

      return this.displayDates.map(function (displayDate, index) {
        var title = _this.dateTimeFormat.formatMonth(displayDate);
        return h('transition', {
          props: {
            name: 'mu-datepicker-slide-' + _this.slideType
          },
          key: index
        }, [h('div', {
          staticClass: 'mu-datepicker-toolbar-title',
          key: title
        }, title)]);
      });
    },
    createPrevIcon: function createPrevIcon(h) {
      return h('svg', {
        staticClass: 'mu-datepicker-svg-icon',
        attrs: {
          viewBox: '0 0 24 24'
        }
      }, [h('path', {
        attrs: {
          d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
        }
      })]);
    },
    createNextIcon: function createNextIcon(h) {
      return h('svg', {
        staticClass: 'mu-datepicker-svg-icon',
        attrs: {
          viewBox: '0 0 24 24'
        }
      }, [h('path', {
        attrs: {
          d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'
        }
      })]);
    }
  },
  render: function render(h) {
    var _this2 = this;

    return h('div', {
      staticClass: 'mu-datepicker-toolbar'
    }, [h(_Button2.default, {
      props: {
        icon: true,
        disabled: !this.prevMonth
      },
      on: {
        click: function click() {
          return _this2.$emit('monthChange', -1);
        }
      }
    }, [this.createPrevIcon(h)]), h('div', {
      staticClass: 'mu-datepicker-toolbar-title-wrapper',
      on: {
        click: function click() {
          return _this2.$emit('changeView', 'month');
        }
      }
    }, [this.createTitleSlide(h)]), h(_Button2.default, {
      props: {
        icon: true,
        disabled: !this.nextMonth
      },
      on: {
        click: function click() {
          return _this2.$emit('monthChange', 1);
        }
      }
    }, [this.createNextIcon(h)])]);
  }
};
},{"../Button":19}],160:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDaysInMonth = getDaysInMonth;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getWeekArray = getWeekArray;
exports.addDays = addDays;
exports.addMonths = addMonths;
exports.addYears = addYears;
exports.cloneDate = cloneDate;
exports.cloneAsDate = cloneAsDate;
exports.isBeforeDate = isBeforeDate;
exports.isAfterDate = isAfterDate;
exports.isBetweenDates = isBetweenDates;
exports.isEqualDate = isEqualDate;
exports.monthDiff = monthDiff;
exports.yearDiff = yearDiff;
exports.dateToStr = dateToStr;
/**
 * material-ui dateUtils.js
 * https://github.com/callemall/material-ui/blob/master/src/DatePicker/dateUtils.js
 */
var localConfig = {
  dayAbbreviation: ['日', '一', '二', '三', '四', '五', '六'],
  dayList: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthLongList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};

var dateTimeFormat = exports.dateTimeFormat = {
  formatDisplay: function formatDisplay(date) {
    var day = date.getDate();
    return localConfig.monthList[date.getMonth()] + '-' + (day > 9 ? day : '0' + day) + ' ' + localConfig.dayList[date.getDay()];
  },
  formatMonth: function formatMonth(date) {
    return date.getFullYear() + ' ' + localConfig.monthLongList[date.getMonth()];
  },
  getWeekDayArray: function getWeekDayArray(firstDayOfWeek) {
    var beforeArray = [];
    var afterArray = [];
    var dayAbbreviation = localConfig.dayAbbreviation;
    for (var i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i]);
      } else {
        beforeArray.push(dayAbbreviation[i]);
      }
    }
    return beforeArray.concat(afterArray);
  }
};

function getDaysInMonth(d) {
  var resultDate = getFirstDayOfMonth(d);

  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);

  return resultDate.getDate();
}

function getFirstDayOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function getWeekArray(d, firstDayOfWeek) {
  var dayArray = [];
  var daysInMonth = getDaysInMonth(d);
  var weekArray = [];
  var week = [];

  for (var i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
  }

  var addWeek = function addWeek(week) {
    var emptyDays = 7 - week.length;
    for (var _i = 0; _i < emptyDays; ++_i) {
      week[weekArray.length ? 'push' : 'unshift'](null);
    }
    weekArray.push(week);
  };

  dayArray.forEach(function (day) {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      addWeek(week);
      week = [];
    }
    week.push(day);
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(week);
    }
  });

  return weekArray;
}

function addDays(d, days) {
  var newDate = cloneDate(d);
  newDate.setDate(d.getDate() + days);
  return newDate;
}

function addMonths(d, months) {
  var newDate = cloneDate(d);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
}

function addYears(d, years) {
  var newDate = cloneDate(d);
  newDate.setFullYear(d.getFullYear() + years);
  return newDate;
}

function cloneDate(d) {
  return new Date(d.getTime());
}

function cloneAsDate(d) {
  var clonedDate = cloneDate(d);
  clonedDate.setHours(0, 0, 0, 0);
  return clonedDate;
}

function isBeforeDate(d1, d2) {
  var date1 = cloneAsDate(d1);
  var date2 = cloneAsDate(d2);

  return date1.getTime() < date2.getTime();
}

function isAfterDate(d1, d2) {
  var date1 = cloneAsDate(d1);
  var date2 = cloneAsDate(d2);

  return date1.getTime() > date2.getTime();
}

function isBetweenDates(dateToCheck, startDate, endDate) {
  return !isBeforeDate(dateToCheck, startDate) && !isAfterDate(dateToCheck, endDate);
}

function isEqualDate(d1, d2) {
  return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function monthDiff(d1, d2) {
  var m = void 0;
  m = (d1.getFullYear() - d2.getFullYear()) * 12;
  m += d1.getMonth();
  m -= d2.getMonth();
  return m;
}

function yearDiff(d1, d2) {
  return ~~(monthDiff(d1, d2) / 12);
}

/**
 * 日期对象转换为指定格式的字符串
 * @param date Date日期对象, 如果缺省，则为当前时间
 * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
 *
 * YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 * @return string 指定格式的时间字符串
 */
function dateToStr(date, formatStr) {
  formatStr = formatStr || 'yyyy-MM-dd';
  date = date || new Date();
  var str = formatStr;
  str = str.replace(/yyyy|YYYY/, date.getFullYear());
  str = str.replace(/yy|YY/, date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + date.getYear() % 100);
  str = str.replace(/MM/, addZero(date.getMonth() + 1));
  str = str.replace(/M/g, date.getMonth() + 1);
  str = str.replace(/w|W/g, localConfig.dayAbbreviation[date.getDay()]);
  str = str.replace(/dd|DD/, addZero(date.getDate()));
  str = str.replace(/d|D/g, date.getDate());
  str = str.replace(/hh|HH/, addZero(date.getHours()));
  str = str.replace(/h|H/g, date.getHours());
  str = str.replace(/mm/, addZero(date.getMinutes()));
  str = str.replace(/m/g, date.getMinutes());
  str = str.replace(/ss|SS/, addZero(date.getSeconds()));
  str = str.replace(/s|S/g, date.getSeconds());
  return str;
}

function addZero(val) {
  return val > 9 ? val : '0' + val;
}
},{}],158:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DayButton = require('./DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _dateUtils = require('./dateUtils');

var dateUtils = _interopRequireWildcard(_dateUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    dateTimeFormat: Object,
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    maxDate: Date,
    minDate: Date,
    selectedDate: Date,
    shouldDisableDate: Function
  },
  data: function data() {
    var displayDate = dateUtils.cloneDate(this.selectedDate);
    displayDate.setDate(1);
    return {
      weekTexts: this.dateTimeFormat.getWeekDayArray(this.firstDayOfWeek),
      displayDates: [displayDate],
      slideType: 'next'
    };
  },

  computed: {
    prevMonth: function prevMonth() {
      return this.displayDates && dateUtils.monthDiff(this.displayDates[0], this.minDate) > 0;
    },
    nextMonth: function nextMonth() {
      return this.displayDates && dateUtils.monthDiff(this.displayDates[0], this.maxDate) < 0;
    }
  },
  methods: {
    equalsDate: function equalsDate(date) {
      return dateUtils.isEqualDate(date, this.selectedDate);
    },
    isDisableDate: function isDisableDate(day) {
      if (day === null) return false;
      var disabled = false;
      if (this.maxDate && this.minDate) disabled = !dateUtils.isBetweenDates(day, this.minDate, this.maxDate);
      if (!disabled && this.shouldDisableDate) disabled = this.shouldDisableDate(day);
      return disabled;
    },
    handleClick: function handleClick(date) {
      if (date) this.$emit('select', date);
    },
    handleMonthChange: function handleMonthChange(val) {
      var displayDate = dateUtils.addMonths(this.displayDates[0], val);
      this.changeDisplayDate(displayDate);
    },
    changeDisplayDate: function changeDisplayDate(date) {
      var oldDate = this.displayDates[0];
      if (date.getFullYear() === oldDate.getFullYear() && date.getMonth() === oldDate.getMonth()) return;
      this.slideType = date.getTime() > oldDate.getTime() ? 'next' : 'prev';
      var displayDate = dateUtils.cloneDate(date);
      displayDate.setDate(1);
      this.displayDates.push(displayDate);
      this.displayDates.splice(0, 1);
    },
    createWeek: function createWeek(h) {
      return h('div', {
        staticClass: 'mu-datepicker-week'
      }, this.weekTexts.map(function (weekText, index) {
        return h('span', {
          staticClass: 'mu-datepicker-week-day',
          key: index
        }, weekText);
      }));
    },
    createMonthDay: function createMonthDay(h) {
      var _this = this;

      return h('div', {
        staticClass: 'mu-datepicker-monthday'
      }, this.displayDates.map(function (displayDate, index) {
        return h('transition', {
          props: {
            name: 'mu-datepicker-slide-' + _this.slideType
          },
          key: index
        }, [h('div', {
          staticClass: 'mu-datepicker-monthday-slide',
          key: displayDate.getTime()
        }, [_this.createContent(h, displayDate)])]);
      }));
    },
    createContent: function createContent(h, displayDate) {
      var _this2 = this;

      var weeksArray = dateUtils.getWeekArray(displayDate || new Date(), this.firstDayOfWeek);
      return h('div', {
        staticClass: 'mu-datepicker-monthday-content'
      }, weeksArray.map(function (week, i) {
        return h('div', {
          staticClass: 'mu-datepicker-monthday-row',
          key: i
        }, week.map(function (date, j) {
          return h(_DayButton2.default, {
            props: {
              disabled: _this2.isDisableDate(date),
              selected: _this2.equalsDate(date),
              date: date
            },
            on: {
              click: function click() {
                return _this2.handleClick(date);
              }
            },
            key: 'dayButton' + i + j
          });
        }));
      }));
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-datepicker-monthday-container'
    }, [h(_Toolbar2.default, {
      props: {
        slideType: this.slideType,
        nextMonth: this.nextMonth,
        prevMonth: this.prevMonth,
        displayDates: this.displayDates,
        dateTimeFormat: this.dateTimeFormat
      },
      on: {
        monthChange: this.handleMonthChange
      }
    }), this.createWeek(h), this.createMonthDay(h)]);
  },

  watch: {
    selectedDate: function selectedDate(val) {
      this.changeDisplayDate(val);
    }
  }
};
},{"./DayButton":189,"./Toolbar":190,"./dateUtils":160}],191:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    year: [String, Number],
    selected: Boolean
  },
  mounted: function mounted() {
    if (this.selected) this.$parent.scrollToSelectedYear(this.$el);
  },
  render: function render(h) {
    return h('button', {
      staticClass: 'mu-year-button',
      class: {
        selected: this.selected
      },
      on: this.$listeners
    }, [h('span', {
      staticClass: 'mu-year-button-text'
    }, this.year)]);
  },

  watch: {
    selected: function selected(val) {
      if (val) this.$parent.scrollToSelectedYear(this.$el);
    }
  }

};
},{}],159:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _YearButton = require('./YearButton');

var _YearButton2 = _interopRequireDefault(_YearButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    maxDate: Date,
    minDate: Date,
    selectedDate: Date
  },
  computed: {
    years: function years() {
      var minYear = this.minDate.getFullYear();
      var maxYear = this.maxDate.getFullYear();
      var years = [];
      for (var year = minYear; year <= maxYear; year++) {
        years.push(year);
      }
      return years;
    }
  },
  methods: {
    scrollToSelectedYear: function scrollToSelectedYear(yearButtonNode) {
      var container = this.$refs.container;
      var containerHeight = container.clientHeight;
      var yearButtonNodeHeight = yearButtonNode.clientHeight || 32;
      var scrollYOffset = yearButtonNode.offsetTop + yearButtonNodeHeight / 2 - containerHeight / 2;
      container.scrollTop = scrollYOffset;
    },
    createYearButtons: function createYearButtons(h) {
      var _this = this;

      return this.years.map(function (year) {
        return h(_YearButton2.default, {
          props: {
            year: year,
            selected: year === _this.selectedDate.getFullYear()
          },
          on: {
            click: function click(e) {
              _this.$emit('change', year);
            }
          }
        });
      });
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-datepicker-year-container'
    }, [h('div', {
      staticClass: 'mu-datepicker-year',
      ref: 'container'
    }, [h('div', {
      staticClass: 'mu-datepicker-year-list'
    }, this.createYearButtons(h))])]);
  }
};
},{"./YearButton":191}],96:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateDisplay = require('./DateDisplay');

var _DateDisplay2 = _interopRequireDefault(_DateDisplay);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _MonthDayView = require('./MonthDayView');

var _MonthDayView2 = _interopRequireDefault(_MonthDayView);

var _YearView = require('./YearView');

var _YearView2 = _interopRequireDefault(_YearView);

var _dateUtils = require('./dateUtils');

var dateUtils = _interopRequireWildcard(_dateUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-date-picker',
  props: {
    dateTimeFormat: {
      type: Object,
      default: function _default() {
        return dateUtils.dateTimeFormat;
      }
    },
    autoOk: Boolean,
    okLabel: {
      type: String,
      default: '确定'
    },
    cancelLabel: {
      type: String,
      default: '取消'
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    initialDate: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    maxDate: {
      type: Date,
      default: function _default() {
        return dateUtils.addYears(new Date(), 100);
      }
    },
    minDate: {
      type: Date,
      default: function _default() {
        return dateUtils.addYears(new Date(), -100);
      }
    },
    mode: {
      type: String,
      default: 'portrait',
      validator: function validator(val) {
        return val && ['portrait', 'landscape'].indexOf(val) !== -1;
      }
    },
    shouldDisableDate: {
      type: Function
    }
  },
  data: function data() {
    return {
      selectedDate: this.initialDate,
      view: 'monthDay'
    };
  },

  methods: {
    handleYearChange: function handleYearChange(year) {
      if (this.selectedDate.getFullYear() === year) return;
      var date = dateUtils.cloneAsDate(this.selectedDate);
      date.setFullYear(year);
      this.setSelected(date);
      this.changeView('monthDay');
    },
    handleSelect: function handleSelect(date) {
      this.setSelected(date);
      if (this.autoOk) this.handleOk();
    },
    handleCancel: function handleCancel() {
      this.$emit('dismiss');
    },
    handleOk: function handleOk() {
      var selectedDate = this.selectedDate,
          maxDate = this.maxDate,
          minDate = this.minDate;

      if (selectedDate.getTime() > maxDate.getTime()) this.selectedDate = new Date(maxDate.getTime());
      if (selectedDate.getTime() < minDate.getTime()) this.selectedDate = new Date(minDate.getTime());
      this.$emit('accept', this.selectedDate);
    },
    setSelected: function setSelected(date) {
      this.selectedDate = date;
    },
    changeView: function changeView(view) {
      this.view = view;
    }
  },
  render: function render(h) {
    var monthdayView = h(_MonthDayView2.default, {
      props: {
        dateTimeFormat: this.dateTimeFormat,
        firstDayOfWeek: this.firstDayOfWeek,
        maxDate: this.maxDate,
        minDate: this.minDate,
        selectedDate: this.selectedDate,
        shouldDisableDate: this.shouldDisableDate
      },
      on: {
        select: this.handleSelect
      }
    });
    var yearView = h(_YearView2.default, {
      props: {
        selectedDate: this.selectedDate,
        maxDate: this.maxDate,
        minDate: this.minDate
      },
      on: {
        change: this.handleYearChange
      }
    });
    var actions = !this.autoOk ? h('div', {
      staticClass: 'mu-datepicker-actions'
    }, [h(_Button2.default, {
      props: {
        flat: true,
        color: 'primary'
      },
      on: {
        click: this.handleCancel
      }
    }, this.cancelLabel), h(_Button2.default, {
      props: {
        flat: true,
        color: 'primary'
      },
      on: {
        click: this.handleOk
      }
    }, this.okLabel)]) : undefined;
    return h('div', {
      staticClass: 'mu-datepicker',
      class: {
        'mu-datepicker-landspace': this.mode === 'landspace'
      }
    }, [h(_DateDisplay2.default, {
      props: {
        monthDaySelected: this.view !== 'year',
        selectedDate: this.selectedDate,
        dateTimeFormat: this.dateTimeFormat
      },
      on: {
        changeView: this.changeView
      }
    }), h('div', {
      staticClass: 'mu-datepicker-container'
    }, [this.view === 'monthDay' ? monthdayView : yearView, actions])]);
  },

  watch: {
    initialDate: function initialDate(val) {
      this.selectedDate = val;
    }
  }
};
},{"./DateDisplay":157,"../Button":19,"./MonthDayView":158,"./YearView":159,"./dateUtils":160}],33:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/date-picker.less');

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DatePicker2.default.install = function (Vue) {
  Vue.component(_DatePicker2.default.name, _DatePicker2.default);
};

exports.default = _DatePicker2.default;
},{"../styles/components/date-picker.less":95,"./DatePicker":96}],66:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],68:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-dialog',
  mixins: [_popup2.default],
  props: {
    dialogClass: [String, Array, Object],
    title: String,
    scrollable: Boolean,
    fullscreen: Boolean,
    width: [String, Number],
    maxWidth: [String, Number],
    transition: {
      type: String,
      default: 'scale',
      validator: function validator(val) {
        return ['slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fade', 'scale'];
      }
    }
  },
  mounted: function mounted() {
    this.setMaxDialogContentHeight();
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      _this.setMaxDialogContentHeight();
    });
  },

  methods: {
    handleWrapperClick: function handleWrapperClick(e) {
      if (this.$el !== e.target) return;
      this.overlayClick(e);
    },
    setMaxDialogContentHeight: function setMaxDialogContentHeight() {
      var dialogEl = this.$refs.dialog;
      if (!dialogEl) return;
      if (!this.scrollable) {
        dialogEl.style.maxHeight = '';
        return;
      }

      var maxDialogContentHeight = window.innerHeight - 2 * 64;
      var _$refs = this.$refs,
          footer = _$refs.footer,
          title = _$refs.title,
          elBody = _$refs.elBody;

      if (footer) maxDialogContentHeight -= footer.offsetHeight;
      if (title) maxDialogContentHeight -= title.offsetHeight;
      if (elBody) {
        var maxBodyHeight = maxDialogContentHeight;
        if (footer) maxBodyHeight -= footer.offsetHeight;
        if (title) maxBodyHeight -= title.offsetHeight;
        elBody.style.maxHeight = maxBodyHeight + 'px';
      }
      dialogEl.style.maxHeight = maxDialogContentHeight + 'px';
    },
    show: function show() {
      this.$emit('show');
    },
    hide: function hide() {
      this.$emit('hide');
    }
  },
  watch: {
    open: function open(newValue) {
      var _this2 = this;

      if (!newValue) return;
      this.$nextTick(function () {
        _this2.setMaxDialogContentHeight();
      });
    }
  },
  render: function render(h) {
    var isShowTitle = this.title || this.$slots.title && this.$slots.title.length > 0;
    var dialogTitle = isShowTitle ? h('div', {
      staticClass: 'mu-dialog-title',
      ref: 'title'
    }, this.$slots.title && this.slots.title.length > 0 ? this.slots.title : this.title) : undefined;

    var dialogBody = h('div', {
      staticClass: 'mu-dialog-body',
      ref: 'elBody'
    }, this.$slots.default);

    var dialogActions = this.$slots.actions && this.$slots.actions.length > 0 ? h('div', {
      staticClass: 'mu-dialog-actions',
      ref: 'footer'
    }, this.$slots.actions) : undefined;

    var data = {
      staticClass: 'mu-dialog ' + (0, _utils.convertClass)(this.dialogClass).join(' '),
      class: (0, _defineProperty3.default)({
        'mu-dialog-fullscreen': this.fullscreen,
        'mu-dialog-scrollable': this.scrollable
      }, 'mu-' + this.transition, true),
      ref: 'dialog'
    };

    if (!this.fullscreen) {
      data.style = {
        'max-width': this.maxWidth === 'auto' ? undefined : (0, _utils.getWidth)(this.maxWidth),
        'width': this.width === 'auto' ? undefined : (0, _utils.getWidth)(this.width)
      };
    }
    var dialog = h('div', data, [dialogTitle, dialogBody, dialogActions]);

    return this.open ? h('transition', {
      props: {
        name: 'mu-dialog-transition'
      }
    }, [h('div', {
      staticClass: 'mu-dialog-wrapper',
      style: {
        'z-index': this.zIndex
      },
      on: {
        click: this.handleWrapperClick
      }
    }, [dialog])]) : null;
  }
};
},{"babel-runtime/helpers/defineProperty":209,"../internal/mixins/popup":200,"../utils":185}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/dialog.less');

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Dialog2.default.install = function (Vue) {
  Vue.component(_Dialog2.default.name, _Dialog2.default);
};

exports.default = _Dialog2.default;
},{"../styles/components/dialog.less":66,"./Dialog":68}],73:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],78:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-divider',
  functional: true,
  props: {
    inset: Boolean,
    shallowInset: Boolean
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;

    data.staticClass = (data.staticClass || '') + ' mu-divider ' + (props.inset ? 'inset' : '') + ' ' + (props.shallowInset ? 'shallow-inset' : '');

    return h('hr', data);
  }
};
},{}],20:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/divider.less');

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Divider2.default.install = function (Vue) {
  Vue.component(_Divider2.default.name, _Divider2.default);
};

exports.default = _Divider2.default;
},{"../styles/components/divider.less":73,"./Divider":78}],72:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],77:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _manager = require('../internal/mixins/popup/manager');

var _manager2 = _interopRequireDefault(_manager);

var _utils = require('../internal/mixins/popup/utils');

var _utils2 = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transitionEvents = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
exports.default = {
  name: 'mu-drawer',
  props: {
    right: Boolean,
    open: Boolean,
    docked: {
      type: Boolean,
      default: true
    },
    width: [Number, String],
    zDepth: {
      type: Number,
      default: 2
    }
  },
  data: function data() {
    return {
      overlayZIndex: (0, _utils.getZIndex)(),
      zIndex: (0, _utils.getZIndex)()
    };
  },

  computed: {
    drawerStyle: function drawerStyle() {
      return {
        width: (0, _utils2.getWidth)(this.width),
        'z-index': this.docked ? '' : this.zIndex
      };
    },
    overlay: function overlay() {
      return !this.docked;
    }
  },
  mounted: function mounted() {
    if (this.open && !this.docked) _manager2.default.open(this);
    this.bindTransition();
  },

  methods: {
    overlayClick: function overlayClick() {
      this.close('overlay');
    },
    escPress: function escPress(e) {
      if (this.docked) return;
      this.close('esc');
    },
    close: function close(reason) {
      this.$emit('update:open', false);
      this.$emit('close', reason);
    },
    bindTransition: function bindTransition() {
      var _this = this;

      this.handleTransition = function (e) {
        if (e.propertyName !== 'transform') return;
        _this.$emit(_this.open ? 'show' : 'hide');
      };
      transitionEvents.forEach(function (eventName) {
        _this.$el.addEventListener(eventName, _this.handleTransition);
      });
    },
    unBindTransition: function unBindTransition() {
      var _this2 = this;

      if (!this.handleTransition) return;
      transitionEvents.forEach(function (eventName) {
        _this2.$el.removeEventListener(eventName, _this2.handleTransition);
      });
    },
    resetZIndex: function resetZIndex() {
      this.overlayZIndex = (0, _utils.getZIndex)();
      this.zIndex = (0, _utils.getZIndex)();
    }
  },
  beforeDestroy: function beforeDestroy() {
    _manager2.default.close(this);
    this.unBindTransition();
  },

  watch: {
    open: function open(val) {
      if (val && !this.docked) {
        _manager2.default.open(this);
      } else {
        _manager2.default.close(this);
      }
    },
    docked: function docked(val, oldVal) {
      if (val && !oldVal) {
        _manager2.default.close(this);
      }
    }
  },
  render: function render(h) {
    return h(_Paper2.default, {
      class: {
        'mu-drawer': true,
        'is-open': this.open,
        'is-right': this.right
      },
      style: this.drawerStyle,
      props: {
        zDepth: this.zDepth
      }
    }, this.$slots.default);
  }
};
},{"../Paper":26,"../internal/mixins/popup/manager":183,"../internal/mixins/popup/utils":184,"../utils":185}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/drawer.less');

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Drawer2.default.install = function (Vue) {
  Vue.component(_Drawer2.default.name, _Drawer2.default);
};

exports.default = _Drawer2.default;
},{"../styles/components/drawer.less":72,"./Drawer":77}],74:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],76:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-grid-list',
  provide: function provide() {
    return {
      getGridListCellHeight: this.getGridListCellHeight,
      getGridListCols: this.getGridListCols,
      getGridListPadding: this.getGridListPadding
    };
  },

  props: {
    cellHeight: {
      type: Number,
      default: 180
    },
    cols: {
      type: Number,
      default: 2
    },
    padding: {
      type: Number,
      default: 4
    }
  },
  methods: {
    getGridListCellHeight: function getGridListCellHeight() {
      return this.cellHeight;
    },
    getGridListCols: function getGridListCols() {
      return this.cols;
    },
    getGridListPadding: function getGridListPadding() {
      return this.padding;
    }
  },
  renter: function renter(h) {
    return h('div', {
      staticClass: 'mu-grid-list',
      style: {
        margin: -this.padding / this.cols + 'px'
      },
      on: this.$listeners
    }, this.$slots.default);
  }
};
},{}],75:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-grid-tile',
  inject: ['getGridListCellHeight', 'getGridListCols', 'getGridListPadding'],
  props: {
    actionPosition: {
      type: String,
      default: 'right',
      validator: function validator(val) {
        return ['left', 'right'].indexOf(val) !== -1;
      }
    },
    cols: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 1
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    titlePosition: {
      type: String,
      default: 'bottom',
      validator: function validator(val) {
        return ['top', 'bottom'].indexOf(val) !== -1;
      }
    }
  },
  computed: {
    tileClass: function tileClass() {
      return {
        'is-top': this.titlePosition === 'top',
        'action-left': this.actionPosition === 'left',
        'multiline': this.$slots.title && this.$slots.subTitle && this.$slots.title.length > 0 && this.$slots.subTitle.length > 0
      };
    },
    style: function style() {
      return {
        width: this.cols / this.getGridListCols() * 100 + '%',
        padding: this.getGridListPadding() / 2 + 'px',
        height: this.getGridListCellHeight() * this.rows + 'px'
      };
    }
  },
  render: function render(h) {
    var title = h('div', {
      staticClass: 'mu-grid-tile-title'
    }, this.$slots.title && this.$slots.title.length > 0 ? this.$slots.title : this.title);

    var subTitle = h('div', {
      staticClass: 'mu-grid-tile-subtitle'
    }, this.$slots.subTitle && this.$slots.subTitle.length > 0 ? this.$slots.subTitle : this.subTitle);

    return h('div', {
      style: this.style,
      on: this.$listeners
    }, [h('div', {
      staticClass: 'mu-grid-tile',
      class: this.tileClass
    }, [this.$slots.default, h('div', { staticClass: 'mu-grid-tile-titlebar' }, [h('div', { staticClass: 'mu-grid-tile-title-container' }, [title, subTitle]), h('div', { staticClass: 'mu-grid-tile-action' }, this.$slots.action)])])]);
  }
};
},{}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridTile = exports.GridList = undefined;

require('../styles/components/grid-list.less');

var _GridList = require('./GridList');

var _GridList2 = _interopRequireDefault(_GridList);

var _GridTile = require('./GridTile');

var _GridTile2 = _interopRequireDefault(_GridTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_GridList2.default.install = function (Vue) {
  Vue.component(_GridList2.default.name, _GridList2.default);
  Vue.component(_GridTile2.default.name, _GridTile2.default);
};

exports.GridList = _GridList2.default;
exports.GridTile = _GridTile2.default;
exports.default = _GridList2.default;
},{"../styles/components/grid-list.less":74,"./GridList":76,"./GridTile":75}],80:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],86:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-list',
  provide: function provide() {
    return {
      listItemClick: this.listItemClick,
      getNestedLevel: this.getNestedLevel,
      getToggleNestedType: this.getToggleNestedType,
      getListValue: this.getListValue
    };
  },

  props: {
    nestedLevel: {
      type: Number,
      default: 0
    },
    textline: {
      type: String,
      default: '',
      validator: function validator(val) {
        return ['', 'two-line', 'three-line'].indexOf(val) !== -1;
      }
    },
    toggleNestedType: {
      type: String,
      default: 'expand'
    },
    dense: Boolean,
    value: {}
  },
  methods: {
    listItemClick: function listItemClick(item) {
      this.$emit('change', item.value);
      this.$emit('item-click', item);
    },
    getListValue: function getListValue() {
      return this.value;
    },
    getNestedLevel: function getNestedLevel() {
      return this.nestedLevel;
    },
    getToggleNestedType: function getToggleNestedType() {
      return this.toggleNestedType;
    }
  },
  render: function render(h) {
    var _class;

    return h('ul', {
      staticClass: 'mu-list',
      class: (_class = {}, (0, _defineProperty3.default)(_class, 'mu-list-' + this.textline, this.textline), (0, _defineProperty3.default)(_class, 'mu-list-dense', this.dense), _class),
      on: this.$listeners
    }, this.$slots.default);
  }
};
},{"babel-runtime/helpers/defineProperty":209}],84:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],198:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollEventTarget = getScrollEventTarget;
exports.getScrollTop = getScrollTop;
function getScrollEventTarget(element) {
  var currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
    var overflowY = window.getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
};

function getScrollTop(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  } else {
    return element.scrollTop;
  }
};
},{}],173:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('../../utils/dom');

function bindScroll(el, binding) {
  var callback = typeof binding.value === 'function' ? binding.value : binding.value.callback;
  var options = binding.value.options || { passive: true };
  var target = binding.value.target || window;
  if (target === 'undefined') return;
  if (target instanceof Element) {
    target = (0, _dom.getScrollEventTarget)(target);
  } else if (target !== window) {
    target = document.querySelector(target);
  }
  if (el._onScroll && target !== el._onScroll.target) unbind(el, binding);

  target.addEventListener('scroll', callback, options);

  el._onScroll = {
    callback: callback,
    options: options,
    target: target
  };
}

function unbind(el, binding) {
  var _el$_onScroll = el._onScroll,
      callback = _el$_onScroll.callback,
      options = _el$_onScroll.options,
      target = _el$_onScroll.target;

  if (!target) return;
  target.removeEventListener('scroll', callback, options);
}
exports.default = {
  name: 'scroll',
  inserted: bindScroll,
  update: bindScroll,
  unbind: unbind
};
},{"../../utils/dom":198}],174:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * vuetify resize.js
 * https://github.com/vuetifyjs/vuetify/blob/dev/src/directives/resize.js
 */
exports.default = {
  name: 'resize',
  inserted: function inserted(el, binding) {
    var cb = binding.value;
    var debounce = 200;
    var callOnLoad = true;

    if (typeof binding.value !== 'function') {
      cb = binding.value.value;
      debounce = binding.value.debounce || debounce;
      callOnLoad = binding.value.quiet !== null ? false : callOnLoad;
    }

    var debounceTimeout = null;
    var onResize = function onResize() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(cb, debounce);
    };

    window.addEventListener('resize', onResize, { passive: true });
    el._onResize = onResize;

    callOnLoad && onResize();
  },
  unbind: function unbind(el, binding) {
    window.removeEventListener('resize', el._onResize);
  }
};
},{}],175:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clickoutsideContext = '@@clickoutsideContext';

exports.default = {
  name: 'click-outside',
  bind: function bind(el, binding, vnode) {
    var documentHandler = function documentHandler(e) {
      if (!vnode.context || el.contains(e.target)) return;
      if (binding.expression) {
        vnode.context[el[clickoutsideContext].methodName](e);
      } else {
        el[clickoutsideContext].bindingFn(e);
      }
    };
    el[clickoutsideContext] = {
      documentHandler: documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    };
    setTimeout(function () {
      document.addEventListener('click', documentHandler);
    }, 0);
  },
  update: function update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression;
    el[clickoutsideContext].bindingFn = binding.value;
  },
  unbind: function unbind(el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler);
  }
};
},{}],94:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _scroll = require('../internal/directives/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _resize = require('../internal/directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _clickOutside = require('../internal/directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _transitions = require('../internal/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-popover',
  mixins: [_popup2.default],
  directives: {
    scroll: _scroll2.default,
    resize: _resize2.default,
    'click-outside': _clickOutside2.default
  },
  props: {
    overlay: {
      default: false
    },
    trigger: {},
    autoPosition: {
      type: Boolean,
      default: true
    },
    anchorOrigin: {
      type: Object,
      default: function _default() {
        return {
          vertical: 'bottom',
          horizontal: 'left'
        };
      }
    },
    targetOrigin: {
      type: Object,
      default: function _default() {
        return {
          vertical: 'top',
          horizontal: 'left'
        };
      }
    }
  },
  methods: {
    getAnchorPosition: function getAnchorPosition(el) {
      var rect = el.getBoundingClientRect();
      var a = {
        top: rect.top,
        left: rect.left,
        width: el.width,
        height: el.height
      };

      a.right = rect.right || a.left + a.width;
      a.bottom = rect.bottom || a.top + a.height;
      a.middle = a.left + (a.right - a.left) / 2;
      a.center = a.top + (a.bottom - a.top) / 2;

      return a;
    },
    getTargetPosition: function getTargetPosition(targetEl) {
      return {
        top: 0,
        center: targetEl.offsetHeight / 2,
        bottom: targetEl.offsetHeight,
        left: 0,
        middle: targetEl.offsetWidth / 2,
        right: targetEl.offsetWidth
      };
    },
    getElInfo: function getElInfo(el) {
      var box = el.getBoundingClientRect();
      return {
        left: box.left,
        top: box.top,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    },
    setStyle: function setStyle() {
      if (!this.open) return;
      var targetOrigin = this.targetOrigin,
          anchorOrigin = this.anchorOrigin;

      var el = this.$el;
      var anchor = this.getAnchorPosition(this.trigger);
      var target = this.getTargetPosition(el);
      var targetPosition = {
        top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
        left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal]
      };
      if (anchor.top < 0 || anchor.top > window.innerHeight || anchor.left < 0 || anchor.left > window.innerWidth) {
        this.close('overflow');
        return;
      };
      if (this.autoPosition) {
        target = this.getTargetPosition(el); // update as height may have changed
        targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
      }
      el.style.left = Math.max(0, targetPosition.left) + 'px';
      el.style.top = Math.max(0, targetPosition.top) + 'px';
    },
    getOverlapMode: function getOverlapMode(anchor, target, median) {
      if ([anchor, target].indexOf(median) >= 0) return 'auto';
      if (anchor === target) return 'inclusive';
      return 'exclusive';
    },
    getPositions: function getPositions(anchor, target) {
      var a = (0, _extends3.default)({}, anchor);
      var t = (0, _extends3.default)({}, target);

      var positions = {
        x: ['left', 'right'].filter(function (p) {
          return p !== t.horizontal;
        }),
        y: ['top', 'bottom'].filter(function (p) {
          return p !== t.vertical;
        })
      };

      var overlap = {
        x: this.getOverlapMode(a.horizontal, t.horizontal, 'middle'),
        y: this.getOverlapMode(a.vertical, t.vertical, 'center')
      };

      positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
      positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

      if (overlap.y !== 'auto') {
        a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
        if (overlap.y === 'inclusive') {
          t.vertical = t.vertical;
        }
      }

      if (overlap.x !== 'auto') {
        a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
        if (overlap.y === 'inclusive') {
          t.horizontal = t.horizontal;
        }
      }

      return {
        positions: positions,
        anchorPos: a
      };
    },
    applyAutoPositionIfNeeded: function applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition) {
      var _getPositions = this.getPositions(anchorOrigin, targetOrigin),
          positions = _getPositions.positions,
          anchorPos = _getPositions.anchorPos;

      if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
        var newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
        if (newTop + target.bottom <= window.innerHeight) {
          targetPosition.top = Math.max(0, newTop);
        } else {
          newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
          if (newTop + target.bottom <= window.innerHeight) targetPosition.top = Math.max(0, newTop);
        }
      }
      if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
        var newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
        if (newLeft + target.right <= window.innerWidth) {
          targetPosition.left = Math.max(0, newLeft);
        } else {
          newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
          if (newLeft + target.right <= window.innerWidth) targetPosition.left = Math.max(0, newLeft);
        }
      }
      return targetPosition;
    },
    close: function close(reason) {
      this.$emit('update:open', false);
      this.$emit('close', reason);
    },
    clickOutSide: function clickOutSide(e) {
      if (this.trigger && this.trigger.contains(e.target)) return;
      this.close('clickOutSide');
    }
  },
  mounted: function mounted() {
    this.setStyle();
  },
  updated: function updated() {
    var _this = this;

    setTimeout(function () {
      _this.setStyle();
    }, 0);
  },
  render: function render(h) {
    return h(_transitions.PopoverTransiton, [h('div', {
      staticClass: 'mu-popover',
      style: {
        'z-index': this.zIndex
      },
      directives: [{
        name: 'show',
        value: this.open
      }, {
        name: 'resize',
        value: this.setStyle
      }, {
        name: 'scroll',
        value: {
          target: this.trigger,
          callback: this.setStyle
        }
      }, {
        name: 'click-outside',
        value: this.clickOutSide
      }]
    }, this.$slots.default)]);
  }
};
},{"babel-runtime/helpers/extends":203,"../internal/mixins/popup":200,"../internal/directives/scroll":173,"../internal/directives/resize":174,"../internal/directives/click-outside":175,"../internal/transitions":154}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/popover.less');

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Popover2.default.install = function (Vue) {
  Vue.component(_Popover2.default.name, _Popover2.default);
};

exports.default = _Popover2.default;
},{"../styles/components/popover.less":84,"./Popover":94}],89:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

var _route = require('../internal/mixins/route');

var _route2 = _interopRequireDefault(_route);

var _ripple = require('../internal/mixins/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _ExpandTransition = require('../internal/ExpandTransition');

var _ExpandTransition2 = _interopRequireDefault(_ExpandTransition);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-list-item',
  mixins: [_route2.default, _ripple2.default],
  inject: ['listItemClick', 'getNestedLevel', 'getListValue', 'getToggleNestedType'],
  props: {
    button: Boolean,
    nestedListClass: [String, Object, Array],
    open: {
      type: Boolean,
      default: true
    },
    avatar: Boolean,
    nested: Boolean, // 是否允许嵌套
    tabIndex: [String, Number],
    toggleNested: Boolean,
    toggleNestedType: {
      type: String,
      default: 'expand',
      validator: function validator(val) {
        return ['expand', 'popover'].indexOf !== -1;
      }
    },
    value: {}
  },
  data: function data() {
    return {
      nestedOpen: this.toggleNestedType === 'popover' ? false : this.open
    };
  },

  computed: {
    nestedLevel: function nestedLevel() {
      return this.getNestedLevel();
    }
  },
  methods: {
    handleClick: function handleClick(e) {
      this.$emit('click', e);
      this.listItemClick(this);
      if (this.toggleNested) this.handleToggleNested();
    },
    handleKeyboardFocus: function handleKeyboardFocus(isFocus) {
      this.$emit('keyboard-focus', isFocus);
    },
    handleHover: function handleHover(event) {
      this.$emit('hover', event);
    },
    handleHoverExit: function handleHoverExit(event) {
      this.$emit('hover-exit', event);
    },
    handleToggleNested: function handleToggleNested() {
      this.nestedOpen = !this.nestedOpen;
      this.$emit('toggle-nested', this.nestedOpen);
    },
    handleNestedClick: function handleNestedClick(item) {
      this.listItemClick(item);
    },
    createItem: function createItem(h) {
      var listValue = this.getListValue();
      var nestedPadding = this.getToggleNestedType() === 'expand' ? 18 * this.nestedLevel : 0;
      return h(_AbstractButton2.default, {
        class: 'mu-item-wrapper',
        ref: 'button',
        attrs: {
          tabindex: this.tabIndex
        },
        props: (0, _extends3.default)({
          containerElement: this.button ? 'a' : 'div',
          wrapperStyle: {
            'margin-left': nestedPadding ? nestedPadding + 'px' : ''
          },
          disabled: !this.button,
          ripple: this.button && this.ripple,
          rippleColor: this.rippleColor,
          rippleOpacity: this.rippleOpacity,
          centerRipple: false
        }, this.generateRouteProps()),
        on: {
          click: this.handleClick,
          keyboardFocus: this.handleKeyboardFocus,
          hover: this.handleHover,
          hoverExit: this.handleHoverExit
        }
      }, [h('div', {
        class: ['mu-item', this.nestedOpen && this.nested ? 'is-open' : '', this.avatar ? 'has-avatar' : '', this.textline, (0, _utils.isNotNull)(listValue) && (0, _utils.isNotNull)(this.value) && listValue === this.value ? 'is-selected' : '']
      }, this.$slots.default)]);
    },
    createNestedList: function createNestedList(h) {
      var _this = this;

      if (!this.nested) return null;
      var list = h(_List2.default, {
        class: this.nestedListClass,
        props: {
          toggleNestedType: this.toggleNestedType,
          nestedLevel: this.nestedLevel + 1,
          value: this.getListValue()
        },
        on: {
          'item-click': this.handleNestedClick
        }
      }, this.$slots.nested);

      switch (this.toggleNestedType) {
        case 'expand':
          return h(_ExpandTransition2.default, {}, [this.nestedOpen ? list : undefined]);
        case 'popover':
          return h(_Popover2.default, {
            props: {
              open: this.nestedOpen,
              trigger: this.$el,
              appendBody: false,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }
            },
            on: {
              'update:open': function updateOpen(val) {
                _this.nestedOpen = val;
              }
            }
          }, [list]);
      }
      return null;
    }
  },
  render: function render(h) {
    return h('li', [this.createItem(h), this.createNestedList(h)]);
  }
};
},{"babel-runtime/helpers/extends":203,"../internal/AbstractButton":155,"../internal/mixins/route":168,"../internal/mixins/ripple":169,"../internal/ExpandTransition":156,"./List":86,"../Popover":27,"../utils":185}],90:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-list-item-action',
  functional: true,
  props: {
    avatar: Boolean
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = 'mu-item-action ' + (props.avatar ? 'is-avatar' : '') + ' ' + (children && children.length > 1 ? 'is-more' : '') + ' ' + (data.staticClass || '');
    return h('div', data, children);
  }
};
},{}],25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemAfterText = exports.ListItemSubTitle = exports.ListItemTitle = exports.ListItemContent = exports.ListAction = exports.ListItem = exports.List = undefined;

require('../styles/components/list.less');

var _utils = require('../utils');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListAction = require('./ListAction');

var _ListAction2 = _interopRequireDefault(_ListAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.List = _List2.default;
exports.ListItem = _ListItem2.default;
exports.ListAction = _ListAction2.default;
var ListItemContent = exports.ListItemContent = (0, _utils.createSimpleFunctional)('mu-item-content', 'div', 'mu-list-item-content');
var ListItemTitle = exports.ListItemTitle = (0, _utils.createSimpleFunctional)('mu-item-title', 'div', 'mu-list-item-title');
var ListItemSubTitle = exports.ListItemSubTitle = (0, _utils.createSimpleFunctional)('mu-item-sub-title', 'div', 'mu-list-item-sub-title');
var ListItemAfterText = exports.ListItemAfterText = (0, _utils.createSimpleFunctional)('mu-item-after-text', 'span', 'mu-list-item-after-text');

_List2.default.install = function (Vue) {
  Vue.component(_List2.default.name, _List2.default);
  Vue.component(_ListItem2.default.name, _ListItem2.default);
  Vue.component(_ListAction2.default.name, _ListAction2.default);
  Vue.component(ListItemContent.name, ListItemContent);
  Vue.component(ListItemTitle.name, ListItemTitle);
  Vue.component(ListItemSubTitle.name, ListItemSubTitle);
  Vue.component(ListItemAfterText.name, ListItemAfterText);
};

exports.default = _List2.default;
},{"../styles/components/list.less":80,"../utils":185,"./List":86,"./ListItem":89,"./ListAction":90}],82:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-menu',
  props: {
    popoverClass: [String, Object, Array],
    anchorOrigin: {
      type: Object,
      default: function _default() {
        return {
          vertical: 'top',
          horizontal: 'left'
        };
      }
    },
    targetOrigin: {
      type: Object,
      default: function _default() {
        return {
          vertical: 'top',
          horizontal: 'left'
        };
      }
    },
    open: Boolean,
    openOnHover: Boolean
  },
  data: function data() {
    return {
      active: this.open,
      trigger: null
    };
  },
  beforeCreate: function beforeCreate() {
    if (this.$isServer) return;

    this.popoverVM = new _vue2.default({
      data: { node: '' },
      render: function render(h) {
        return this.node;
      }
    }).$mount();
  },
  mounted: function mounted() {
    this.trigger = this.$el;
  },

  methods: {
    addEventHandle: function addEventHandle(old, fn) {
      if (!old) {
        return fn;
      } else if (Array.isArray(old)) {
        return old.indexOf(fn) > -1 ? old : old.concat(fn);
      } else {
        return old === fn ? old : [old, fn];
      }
    },
    show: function show() {
      if (this.timer) clearTimeout(this.timer);
      this.active = true;
      this.$emit('open');
    },
    hide: function hide() {
      var _this = this;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.active = false;
        _this.$emit('close');
      }, 200);
    },
    close: function close(reason) {
      this.active = false;
      this.$emit('close');
    }
  },
  watch: {
    active: function active(val) {
      this.$emit('update:open', val);
    },
    open: function open(val) {
      this.active = val;
    }
  },
  render: function render(h) {
    var _this2 = this;

    this.popoverVM.node = h(_Popover2.default, {
      class: this.popoverClass,
      style: {
        'min-width': this.trigger ? this.trigger.offsetWidth + 'px' : ''
      },
      props: {
        anchorOrigin: this.anchorOrigin,
        targetOrigin: this.targetOrigin,
        open: this.active,
        trigger: this.trigger
      },
      on: {
        close: this.close
      },
      nativeOn: {
        mouseenter: function mouseenter() {
          return _this2.openOnHover && _this2.show();
        },
        mouseleave: function mouseleave() {
          return _this2.openOnHover && _this2.hide();
        }
      }
    }, this.$slots.content);

    var vnode = (0, _utils.getFirstComponentChild)(this.$slots.default);
    if (!vnode) return vnode;

    var on = vnode.data.on = vnode.data.on || {};
    var nativeOn = vnode.data.nativeOn = vnode.data.nativeOn || {};
    if (this.openOnHover) {
      nativeOn.mouseenter = on.mouseenter = this.addEventHandle(on.mouseenter, this.show);
      nativeOn.mouseleave = on.mouseleave = this.addEventHandle(on.mouseleave, this.hide);
    } else {
      nativeOn.click = on.click = this.addEventHandle(on.click, function () {
        return _this2.show();
      });
    }

    return vnode;
  }
};
},{"vue":43,"../Popover":27,"../utils":185}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Menu2.default.install = function (Vue) {
  Vue.component(_Menu2.default.name, _Menu2.default);
};

exports.default = _Menu2.default;
},{"./Menu":82}],105:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],103:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-linear-progress',
  mixins: [_color2.default],
  props: {
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'indeterminate',
      validator: function validator(val) {
        return ['indeterminate', 'determinate'].indexOf(val) !== -1;
      }
    },
    value: {
      type: Number,
      default: 0
    },
    size: [Number, String]
  },
  computed: {
    percent: function percent() {
      return (this.value - this.min) / (this.max - this.min) * 100;
    },
    linearStyle: function linearStyle() {
      var color = this.color,
          mode = this.mode,
          percent = this.percent;

      return {
        'background-color': (0, _utils.getColor)(color),
        width: mode === 'determinate' ? percent + '%' : ''
      };
    },
    linearClass: function linearClass() {
      return 'mu-linear-progress-' + this.mode;
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-linear-progress ' + this.getColorClass(),
      style: {
        height: this.size + 'px'
      }
    }, [h('div', {
      staticClass: 'mu-linear-progress-background',
      style: {
        'background-color': (0, _utils.getColor)(this.color)
      }
    }), h('div', {
      style: this.linearStyle,
      class: this.linearClass
    })]);
  }
};
},{"../utils":185,"../internal/mixins/color":165}],162:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_color2.default],
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    },
    borderWidth: {
      type: Number,
      default: 3
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-circle-wrapper active',
      style: {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }, [h('div', {
      staticClass: 'mu-circle-spinner active ' + this.getColorClass(),
      style: {
        'border-color': (0, _utils.getColor)(this.color)
      }
    }, [h('div', { staticClass: 'mu-circle-clipper left' }, [h('div', { staticClass: 'mu-circle', style: { 'border-width': this.borderWidth + 'px' } })]), h('div', { staticClass: 'mu-circle-gap-patch' }, [h('div', { staticClass: 'mu-circle' })]), h('div', { staticClass: 'mu-circle-clipper right' }, [h('div', { staticClass: 'mu-circle', style: { 'border-width': this.borderWidth + 'px' } })])])]);
  }
};
},{"../utils":185,"../internal/mixins/color":165}],106:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Circular = require('./Circular');

var _Circular2 = _interopRequireDefault(_Circular);

var _utils = require('../utils');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-circular-progress',
  mixins: [_color2.default],
  props: {
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'indeterminate',
      validator: function validator(val) {
        return ['indeterminate', 'determinate'].indexOf(val) !== -1;
      }
    },
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 24
    },
    strokeWidth: {
      type: Number,
      default: 3
    }
  },
  computed: {
    radius: function radius() {
      return (this.size - this.strokeWidth) / 2;
    },
    circularSvgStyle: function circularSvgStyle() {
      return {
        width: this.size,
        height: this.size
      };
    },
    circularPathStyle: function circularPathStyle() {
      var relVal = this.getRelativeValue();
      return {
        stroke: (0, _utils.getColor)(this.color),
        'stroke-dasharray': this.getArcLength(relVal) + ', ' + this.getArcLength(1)
      };
    }
  },
  methods: {
    getArcLength: function getArcLength(fraction) {
      return fraction * Math.PI * (this.size - this.strokeWidth);
    },
    getRelativeValue: function getRelativeValue() {
      var value = this.value,
          min = this.min,
          max = this.max;

      var clampedValue = Math.min(Math.max(min, value), max);
      return clampedValue / (max - min);
    },
    createDeterminateCircular: function createDeterminateCircular(h) {
      if (this.mode !== 'determinate') return;
      return h('svg', {
        staticClass: 'mu-circular-progress-determinate',
        style: this.circularSvgStyle,
        attrs: {
          viewBox: '0 0 ' + this.size + ' ' + this.size
        }
      }, [h('circle', {
        staticClass: 'mu-circular-progress-determinate-path',
        style: this.circularPathStyle,
        attrs: {
          r: this.radius,
          cx: this.size / 2,
          cy: this.size / 2,
          fill: 'none',
          'stroke-miterlimit': '20',
          'stroke-width': this.strokeWidth
        }
      })]);
    }
  },
  render: function render(h) {
    var circular = this.mode === 'indeterminate' ? h(_Circular2.default, {
      props: {
        size: this.size,
        color: this.color,
        borderWidth: this.strokeWidth
      }
    }) : undefined;
    return h('div', {
      staticClass: 'mu-circular-progress ' + this.getColorClass(),
      style: {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }, [circular, this.createDeterminateCircular(h)]);
  }
};
},{"./Circular":162,"../utils":185,"../internal/mixins/color":165}],34:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/progress.less');

var _LinearProgress = require('./LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _CircularProgress = require('./CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    Vue.component(_LinearProgress2.default.name, _LinearProgress2.default);
    Vue.component(_CircularProgress2.default.name, _CircularProgress2.default);
  }
};
},{"../styles/components/progress.less":105,"./LinearProgress":103,"./CircularProgress":106}],85:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],93:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require('../internal/mixins/select');

var _select2 = _interopRequireDefault(_select);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-radio',
  mixins: [(0, _select2.default)('radio')],
  props: {
    inputValue: {}
  },
  computed: {
    checked: function checked() {
      var inputValue = this.inputValue;
      var value = this.$attrs.value;
      if ((0, _utils.isNull)(inputValue)) return false;
      return inputValue === value;
    }
  },
  methods: {
    toggle: function toggle() {
      this.$emit('change', this.$attrs.value);
    }
  },
  render: function render(h) {
    var defaultSvgUnCheckIcon = h('svg', {
      staticClass: 'mu-radio-icon-uncheck mu-radio-svg-icon',
      attrs: {
        viewBox: '0 0 24 24'
      }
    }, [h('path', {
      attrs: {
        d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
      }
    })]);
    var defaultSvgCheckedIcon = h('svg', {
      staticClass: 'mu-radio-icon-checked mu-radio-svg-icon',
      attrs: {
        viewBox: '0 0 24 24'
      }
    }, [h('path', {
      attrs: {
        d: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
      }
    })]);
    var view = this.createRipple(h, 'mu-radio-icon', [this.uncheckIcon ? h(_Icon2.default, {
      staticClass: 'mu-radio-icon-uncheck',
      props: {
        value: this.uncheckIcon
      }
    }) : defaultSvgUnCheckIcon, this.checkedIcon ? h(_Icon2.default, {
      staticClass: 'mu-radio-icon-checked',
      props: {
        value: this.checkedIcon
      }
    }) : defaultSvgCheckedIcon]);
    return this.createSelect(h, view);
  }
};
},{"../internal/mixins/select":171,"../Icon":23,"../utils":185}],28:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/radio.less');

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Radio2.default.install = function (Vue) {
  Vue.component(_Radio2.default.name, _Radio2.default);
};

exports.default = _Radio2.default;
},{"../styles/components/radio.less":85,"./Radio":93}],107:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],194:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],163:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

require('../../styles/components/input.less');

var _Icon = require('../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  inheritAttrs: false,
  props: {
    icon: String,
    label: String,
    labelFloat: Boolean,
    underlineShow: {
      type: Boolean,
      default: true
    },
    multiLine: Boolean,
    maxLength: [String, Number],
    errorText: String,
    helpText: String,
    fullWidth: Boolean,
    disabled: Boolean,
    value: {}
  },
  data: function data() {
    return {
      isFocused: false,
      inputValue: this.value
    };
  },

  computed: {
    inputClass: function inputClass() {
      return {
        'focus-state': this.isFocused,
        'has-label': this.label,
        'no-empty-state': this.inputValue,
        'has-icon': this.icon,
        'error': this.errorText,
        'multi-line': this.multiLine,
        'disabled': this.disabled,
        'full-width': this.fullWidth
      };
    },
    float: function float() {
      return this.labelFloat && !this.isFocused && !this.inputValue && this.inputValue !== 0;
    }
  },
  methods: {
    createIcon: function createIcon(h) {
      if (!this.icon) return;
      return h(_Icon2.default, {
        staticClass: 'mu-input-icon',
        props: {
          value: this.icon
        }
      });
    },
    createLabel: function createLabel(h) {
      return this.label ? h('div', {
        staticClass: 'mu-input-label',
        class: {
          float: this.float
        }
      }, this.label) : undefined;
    },
    createUnderline: function createUnderline(h) {
      if (!this.underlineShow) return;
      return h('div', [h('div', {
        staticClass: 'mu-input-line',
        class: {
          disabled: this.disabled
        }
      }), this.disabled ? undefined : h('div', {
        staticClass: 'mu-input-focus-line',
        class: {
          error: this.errorText,
          focus: this.isFocused
        }
      })]);
    },
    createHelpText: function createHelpText(h) {
      if (!this.errorText && !this.helpText && !this.maxLength) return;
      return h('div', {
        staticClass: 'mu-input-help'
      }, [h('div', {}, (this.errorText ? this.errorText : this.helpText) || ''), this.maxLength ? h('div', {}, (this.inputValue ? String(this.inputValue).length : 0) + ' / ' + this.maxLength) : undefined]);
    },
    createInput: function createInput(h, children) {
      return h('div', {
        staticClass: 'mu-input',
        class: this.inputClass
      }, [this.createIcon(h), h('div', {
        staticClass: 'mu-input-content',
        ref: 'content'
      }, [this.createLabel(h)].concat((0, _toConsumableArray3.default)(children), [this.createUnderline(h), this.createHelpText(h)]))]);
    }
  },
  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    inputValue: function inputValue(val) {
      this.$emit('input', val);
    }
  }
};
},{"babel-runtime/helpers/toConsumableArray":208,"../../styles/components/input.less":194,"../../Icon":23}],176:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _List = require('../../List');

var _List2 = _interopRequireDefault(_List);

var _Popover = require('../../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  provide: function provide() {
    return {
      optionClick: this.optionClick,
      addOption: this.addOption,
      removeOption: this.removeOption,
      isOptionSelected: this.isOptionSelected,
      isMultiple: this.isMultiple
    };
  },

  props: {
    noDataText: {
      type: String,
      default: '暂无数据显示'
    },
    maxHeight: {
      type: [String, Number],
      default: 300
    }
  },
  data: function data() {
    return {
      options: [],
      open: false
    };
  },

  computed: {
    selects: function selects() {
      return this.options.filter(function (option) {
        return option.selected;
      }).map(function (option, index) {
        return {
          value: option.value,
          label: option.label,
          index: index
        };
      });
    }
  },
  methods: {
    activateInput: function activateInput() {
      this.isFocused = true;
    },
    deactivateInput: function deactivateInput() {
      this.isFocused = false;
      this.selectedIndex = -1;
      this.setSeachValue();
    },
    openMenu: function openMenu() {
      this.open = true;
      this.setFocusIndex(this.getSelectedIndex());
    },
    closeMenu: function closeMenu() {
      this.open = false;
      this.resetFocusIndex();
    },
    toggleMenu: function toggleMenu() {
      if (this.open) return this.closeMenu();
      this.openMenu();
      this.focusInput();
    },
    isMultiple: function isMultiple() {
      return this.multiple;
    },
    isOptionSelected: function isOptionSelected(value) {
      return value === this.inputValue || this.multiple && this.inputValue && this.inputValue.indexOf(value) !== -1;
    },
    addOption: function addOption(option) {
      this.options.push(option);
    },
    removeOption: function removeOption(option) {
      var index = this.options.indexOf(option);
      if (index !== -1) this.options.splice(index, 1);
    },
    optionClick: function optionClick(option) {
      var _this = this;

      var value = option.value,
          selected = option.selected;

      var selectedValue = this.multiple ? this.inputValue ? [].concat((0, _toConsumableArray3.default)(this.inputValue)) : [] : this.inputValue;
      switch (true) {
        case selected && this.multiple:
          selectedValue.splice(selectedValue.indexOf(value), 1);
          break;
        case !selected && this.multiple:
          selectedValue = [];
          this.options.forEach(function (item) {
            if (item.value === option.value || item.selected) selectedValue.push(item.value);
          });
          break;
        default:
          selectedValue = value;
          break;
      }
      this.inputValue = selectedValue;
      this.$nextTick(function () {
        _this.focusInput();
        if (!_this.multiple) _this.closeMenu();
      });
    },
    createContent: function createContent(h) {
      return h('div', {
        staticClass: 'mu-option-list',
        ref: 'list',
        style: {
          'maxHeight': this.maxHeight + 'px'
        }
      }, [h(_List2.default, {
        props: {
          dense: true
        }
      }, [this.enableOptions.length === 0 ? h('div', { staticClass: 'mu-select-no-data' }, this.noDataText) : null, this.$slots.default])]);
    },
    createMenu: function createMenu(h) {
      var _this2 = this;

      var trigger = this.$refs.select;
      return h(_Popover2.default, {
        class: this.popoverClass,
        style: {
          'min-width': trigger ? trigger.offsetWidth + 'px' : ''
        },
        ref: 'popover',
        props: {
          trigger: trigger,
          open: this.open,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          targetOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        },
        on: {
          close: function close() {
            return _this2.closeMenu();
          }
        }
      }, [this.createContent(h)]);
    }
  }
};
},{"babel-runtime/helpers/toConsumableArray":208,"../../List":25,"../../Popover":27}],177:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Chip = require('../../Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _clickOutside = require('../../internal/directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    chips: Boolean,
    placeholder: String,
    filterable: Boolean // enable search option
  },
  directives: {
    'click-outside': _clickOutside2.default
  },
  data: function data() {
    return {
      searchValue: '',
      selectedIndex: -1
    };
  },
  created: function created() {
    this.setSeachValue();
  },

  methods: {
    setSeachValue: function setSeachValue() {
      if (!this.multiple) this.searchValue = this.selects.map(function (item) {
        return item.label;
      }).join(',');
    },
    changeSelectedIndex: function changeSelectedIndex(keycode) {
      var maxIndex = this.selects.length - 1;
      if (keycode === 'left') {
        this.selectedIndex = this.selectedIndex === -1 ? maxIndex : this.selectedIndex - 1;
      } else if (keycode === 'right') {
        this.selectedIndex = this.selectedIndex >= maxIndex ? -1 : this.selectedIndex + 1;
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = maxIndex;
        return;
      }

      if (['backspace', 'delete'].indexOf(keycode) !== -1) {
        var newIndex = this.selectedIndex === maxIndex ? this.selectedIndex - 1 : this.selects[this.selectedIndex + 1] ? this.selectedIndex : -1;
        if (this.selectedIndex !== -1) this.removeSelection(this.selectedIndex);
        this.selectedIndex = newIndex;
      }
    },
    removeSelection: function removeSelection(index) {
      return this.inputValue.splice(index, 1);
    },
    createSlotSelection: function createSlotSelection(item) {
      return this.$scopedSlots.selection((0, _extends3.default)({}, item, {
        disabled: this.disabled || this.readonly
      }));
    },
    createChipSelection: function createChipSelection(h, _ref) {
      var _this = this;

      var selected = _ref.selected,
          index = _ref.index,
          label = _ref.label;

      return h(_Chip2.default, {
        attrs: {
          tabindex: -1
        },
        props: {
          delete: true,
          selected: selected
        },
        on: {
          delete: function _delete() {
            if (_this.disabled || _this.readonly) return;
            _this.removeSelection(index);
          }
        }
      }, label);
    },
    createTextSelection: function createTextSelection(h, _ref2, isLast) {
      var selected = _ref2.selected,
          label = _ref2.label;

      return h('span', {
        staticClass: 'mu-selection-text',
        class: {
          'is-active': selected
        }
      }, isLast ? label : label + ',');
    },
    createSelectedItems: function createSelectedItems(h) {
      var _this2 = this;

      return this.selects.map(function (item, index) {
        var selected = _this2.selectedIndex === index;

        switch (true) {
          case !!_this2.$scopedSlots.selection:
            return _this2.createSlotSelection((0, _extends3.default)({}, item, { selected: selected }));
          case _this2.chips:
            return _this2.createChipSelection(h, (0, _extends3.default)({}, item, { selected: selected }));
          default:
            return _this2.createTextSelection(h, (0, _extends3.default)({}, item, { selected: selected }), index === _this2.selects.length - 1);
        }
      });
    },
    createInputElement: function createInputElement(h) {
      var _this3 = this;

      var enable = this.filterable && !this.readonly;
      return [h('input', {
        staticClass: 'mu-select-input',
        ref: 'input',
        class: {
          'is-enable': enable
        },
        attrs: {
          tabindex: 0,
          readonly: !enable,
          placeholder: !this.inputValue && this.inputValue !== 0 ? this.placeholder : ''
        },
        domProps: {
          value: this.searchValue
        },
        on: (0, _extends3.default)({}, this.createListeners(), {
          input: function input(e) {
            _this3.searchValue = e.target.value;
          }
        })
      })];
    },
    createSelection: function createSelection(h) {
      var _this4 = this;

      var content = h('div', {
        staticClass: 'mu-select-content'
      }, this.multiple ? [].concat((0, _toConsumableArray3.default)(this.createSelectedItems(h)), (0, _toConsumableArray3.default)(this.createInputElement(h))) : this.createInputElement(h));
      var action = h('div', {
        staticClass: 'mu-select-action'
      }, [h('svg', {
        staticClass: 'mu-select-icon',
        attrs: {
          viewBox: '0 0 24 24'
        }
      }, [h('path', {
        attrs: {
          d: 'M7 10l5 5 5-5z'
        }
      })])]);
      return h('div', {
        staticClass: 'mu-select',
        class: {
          'is-open': this.open,
          'is-multi': this.multiple,
          'is-readonly': this.readonly
        },
        on: {
          click: function click() {
            if (_this4.disabled || _this4.readonly) return;
            _this4.toggleMenu();
          }
        },
        directives: [{
          name: 'click-outside',
          value: function value(e) {
            if (_this4.$refs.popover.$el.contains(e.target)) return;
            _this4.blur();
          }
        }],
        ref: 'select'
      }, [content, action]);
    }
  },
  watch: {
    searchValue: function searchValue(val) {
      var _this5 = this;

      this.options.forEach(function (option) {
        option.visible = !_this5.filterable || !val || option.label.indexOf(val) !== -1;
      });
      this.resetFocusIndex();
      if (this.isFocused && !this.open) this.open = true;
    },
    selects: function selects() {
      this.setSeachValue();
    }
  }
};
},{"babel-runtime/helpers/toConsumableArray":208,"babel-runtime/helpers/extends":203,"../../Chip":17,"../../internal/directives/click-outside":175}],178:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    blur: function blur() {
      this.deactivateInput();
      this.closeMenu();
      this.$emit('blur');
    },
    focus: function focus() {
      this.activateInput();
      this.openMenu();
      this.$emit('focus');
    },
    focusInput: function focusInput() {
      this.$refs.input.focus();

      // this.$nextTick(() => {
      //   this.$refs.input.select();
      // });
    },
    createListeners: function createListeners() {
      var _this = this;

      var listeners = (0, _assign2.default)({}, this.$listeners);
      delete listeners.input;

      return (0, _extends3.default)({}, listeners, {
        click: function click(e) {
          if (_this.disabled || _this.readonly || !_this.filterable) return;
          e.stopPropagation();
          if (_this.isFocused && !_this.open) {
            _this.openMenu();
            return;
          }
          _this.focus();
        },
        focus: function focus(e) {
          if (_this.disabled || _this.readonly || _this.isFocused) {
            return;
          }

          _this.activateInput();
          _this.$nextTick(_this.focusInput);
        },
        keydown: this.onKeydown //  mixins/keyboard.js
      });
    }
  }
};
},{"babel-runtime/helpers/extends":203,"babel-runtime/core-js/object/assign":206}],179:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      focusIndex: -1
    };
  },

  computed: {
    enableOptions: function enableOptions() {
      return this.options.filter(function (option) {
        return option.visible && !option.disabled;
      });
    }
  },
  methods: {
    onKeydown: function onKeydown(e) {
      var code = (0, _keycode2.default)(e);
      if (!this.open && ['enter', 'space', 'up', 'down'].indexOf(code) !== -1) {
        e.preventDefault();
        return this.openMenu();
      }
      var options = this.enableOptions;
      switch (code) {
        case 'enter':
          var option = options[this.focusIndex];
          if (option) this.optionClick(option);
          break;
        case 'up':
          event.preventDefault();
          this.selectedIndex = -1;
          this.decrementFocusIndex();
          break;
        case 'down':
          event.preventDefault();
          this.selectedIndex = -1;
          this.incrementFocusIndex();
          break;
        case 'tab':
          this.blur();
          if (this.multiple) this.searchValue = '';
          break;
        case 'left':
        case 'right':
        case 'delete':
        case 'backspace':
          if (!this.searchValue && this.filterable && this.multiple) this.changeSelectedIndex(code);
          break;
      }
    },
    decrementFocusIndex: function decrementFocusIndex() {
      var index = this.focusIndex;
      var maxIndex = this.getOptionCount() - 1;
      index--;
      if (index < 0) index = maxIndex;
      this.setFocusIndex(index);
    },
    incrementFocusIndex: function incrementFocusIndex() {
      var index = this.focusIndex;
      var maxIndex = this.getOptionCount() - 1;
      index++;
      if (index > maxIndex) index = 0;
      this.setFocusIndex(index);
    },
    getOptionCount: function getOptionCount() {
      return this.enableOptions.length;
    },
    resetFocusIndex: function resetFocusIndex() {
      this.focusIndex = -1;
    },
    setFocusIndex: function setFocusIndex(index) {
      this.focusIndex = index;
    },
    getSelectedIndex: function getSelectedIndex() {
      for (var i = 0; i < this.enableOptions.length; i++) {
        if (this.enableOptions[i].selected) return i;
      }
      return -1;
    },
    setScollPosition: function setScollPosition(index) {
      var _this = this;

      this.$nextTick(function () {
        var option = _this.enableOptions[index];
        if (!option) return;
        var optionEl = option.$el;
        var optionHeight = optionEl.offsetHeight;
        var scrollTop = optionEl.offsetTop - optionHeight;
        if (scrollTop < optionHeight) scrollTop = 0;
        _this.$refs.list.scrollTop = scrollTop;
      });
    }
  },
  watch: {
    focusIndex: function focusIndex(val) {
      this.enableOptions.forEach(function (option, index) {
        option.focused = index === val;
      });
      this.setScollPosition(val);
    }
  }
};
},{"keycode":207}],108:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require('../internal/mixins/input.js');

var _input2 = _interopRequireDefault(_input);

var _menu = require('./mixins/menu');

var _menu2 = _interopRequireDefault(_menu);

var _selection = require('./mixins/selection');

var _selection2 = _interopRequireDefault(_selection);

var _events = require('./mixins/events');

var _events2 = _interopRequireDefault(_events);

var _keyboard = require('./mixins/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-select',
  mixins: [_input2.default, _menu2.default, _selection2.default, _events2.default, _keyboard2.default],
  props: {
    popoverClass: [String, Object, Array],
    multiple: Boolean,
    readonly: Boolean,
    maxHeight: {
      type: [String, Number],
      default: 300
    }
  },
  render: function render(h) {
    return this.createInput(h, [this.createSelection(h), this.createMenu(h)]);
  }
};
},{"../internal/mixins/input.js":163,"./mixins/menu":176,"./mixins/selection":177,"./mixins/events":178,"./mixins/keyboard":179}],109:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = require('../List');

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-option',
  inject: ['addOption', 'removeOption', 'optionClick', 'isOptionSelected', 'isMultiple'],
  props: {
    label: {
      required: true,
      type: String
    },
    value: {
      required: true
    },
    disabled: Boolean
  },
  data: function data() {
    return {
      visible: true,
      focused: false
    };
  },

  computed: {
    selected: function selected() {
      return this.isOptionSelected(this.value);
    }
  },
  created: function created() {
    this.addOption(this);
  },
  destroyed: function destroyed() {
    this.removeOption(this);
  },
  render: function render(h) {
    var _this = this;

    var defaultItem = [this.isMultiple() ? h(_List.ListAction, [h(_Checkbox2.default, {
      props: {
        inputValue: this.selected,
        color: 'secondary',
        disabled: this.disabled,
        tabIndex: -1
      }
    })]) : undefined, h(_List.ListItemContent, [h(_List.ListItemTitle, {}, this.label)])];
    return h(_List.ListItem, {
      staticClass: 'mu-option',
      ref: 'listItem',
      class: {
        'is-selected': this.selected,
        'is-disabled': this.disabled,
        'is-focused': this.focused
      },
      props: {
        button: !this.disabled,
        nested: false,
        tabIndex: -1
      },
      directives: [{
        name: 'show',
        value: this.visible
      }],
      on: {
        click: function click(e) {
          return _this.optionClick(_this, e);
        }
      }
    }, this.$slots.default && this.$slots.default.length > 0 ? this.$slots.default : defaultItem);
  }
};
},{"../List":25,"../Checkbox":16}],35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = exports.Select = undefined;

require('../styles/components/select.less');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Select2.default.install = function (Vue) {
  Vue.component(_Select2.default.name, _Select2.default);
  Vue.component(_Option2.default.name, _Option2.default);
};

exports.Select = _Select2.default;
exports.Option = _Option2.default;
exports.default = _Select2.default;
},{"../styles/components/select.less":107,"./Select":108,"./Option":109}],88:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],97:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _FocusRipple = require('../internal/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-slider',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.1
    },
    disabled: Boolean,
    displayValue: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      active: false,
      hover: false,
      focused: false,
      dragging: false
    };
  },

  computed: {
    percent: function percent() {
      var percentNum = (this.value - this.min) / (this.max - this.min) * 100;
      return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum;
    },
    sliderClass: function sliderClass() {
      return {
        zero: this.value <= this.min,
        active: this.active,
        disabled: this.disabled
      };
    }
  },
  created: function created() {
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
    this.handleMouseEnd = this.handleMouseEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  },

  methods: {
    handleKeydown: function handleKeydown(e) {
      var min = this.min,
          max = this.max,
          step = this.step;

      var action = void 0;
      switch ((0, _keycode2.default)(e)) {
        case 'page down':
        case 'down':
          action = 'decrease';
          break;
        case 'left':
          action = 'decrease';
          break;
        case 'page up':
        case 'up':
          action = 'increase';
          break;
        case 'right':
          action = 'increase';
          break;
        case 'home':
          action = 'min';
          break;
        case 'end':
          action = 'max';
          break;
      }
      var value = this.value;
      if (action) {
        e.preventDefault();
        switch (action) {
          case 'decrease':
            value -= step;
            break;
          case 'increase':
            value += step;
            break;
          case 'min':
            value = min;
            break;
          case 'max':
            value = max;
            break;
        }

        value = parseFloat(value.toFixed(5));

        if (value > max) {
          value = max;
        } else if (value < min) {
          value = min;
        }
      }
      this.$emit('change', value);
    },
    handleMouseDown: function handleMouseDown(e) {
      if (this.disabled) return;
      this.setValue(e);
      e.preventDefault();
      document.addEventListener('mousemove', this.handleDragMouseMove);
      document.addEventListener('mouseup', this.handleMouseEnd);
      this.$el.focus();
      this.onDragStart(e);
    },
    handleMouseUp: function handleMouseUp() {
      if (this.disabled) return;
      this.active = false;
    },
    handleTouchStart: function handleTouchStart(e) {
      if (this.disabled) return;
      this.setValue(e.touches[0]);

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchup', this.handleTouchEnd);
      document.addEventListener('touchend', this.handleTouchEnd);
      document.addEventListener('touchcancel', this.handleTouchEnd);

      e.preventDefault();
      this.onDragStart(e);
    },
    handleTouchEnd: function handleTouchEnd(e) {
      if (this.disabled) return;
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchup', this.handleTouchEnd);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('touchcancel', this.handleTouchEnd);
      this.onDragStop(e);
    },
    handleFocus: function handleFocus() {
      if (this.disabled) return;
      this.focused = true;
    },
    handleBlur: function handleBlur() {
      if (this.disabled) return;
      this.focused = false;
    },
    handleMouseEnter: function handleMouseEnter() {
      if (this.disabled) return;
      this.hover = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      if (this.disabled) return;
      this.hover = false;
    },

    // 从点击位置更新 value
    setValue: function setValue(e) {
      var $el = this.$el,
          max = this.max,
          min = this.min,
          step = this.step;

      var value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (max - min);
      value = Math.round(value / step) * step + min;
      value = parseFloat(value.toFixed(5));

      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
      this.$emit('change', value);
    },

    // 拖拽控制
    onDragStart: function onDragStart(e) {
      this.dragging = true;
      this.active = true;
      this.$emit('drag-start', e);
    },
    onDragUpdate: function onDragUpdate(e) {
      var _this = this;

      if (this.dragRunning) return;
      this.dragRunning = true;
      window.requestAnimationFrame(function () {
        _this.dragRunning = false;
        if (!_this.disabled) _this.setValue(e);
      });
    },
    onDragStop: function onDragStop(e) {
      this.dragging = false;
      this.active = false;
      this.$emit('drag-stop', e);
    },
    handleDragMouseMove: function handleDragMouseMove(e) {
      this.onDragUpdate(e);
    },
    handleTouchMove: function handleTouchMove(e) {
      this.onDragUpdate(e.touches[0]);
    },
    handleMouseEnd: function handleMouseEnd(e) {
      document.removeEventListener('mousemove', this.handleDragMouseMove);
      document.removeEventListener('mouseup', this.handleMouseEnd);
      this.onDragStop(e);
    }
  },
  render: function render(h) {
    var percent = this.percent + '%';
    var input = h('input', {
      attrs: (0, _extends3.default)({}, this.$attrs, {
        type: 'hidden',
        value: this.value
      })
    });

    var displayValue = this.displayValue ? h('div', {
      staticClass: 'mu-slider-display-value',
      style: {
        left: percent
      }
    }, [h('span', {
      staticClass: 'display-value-text'
    }, this.value)]) : undefined;

    var thumb = h('div', {
      staticClass: 'mu-slider-thumb',
      style: {
        left: this.percent + '%'
      }
    }, [(this.focused || this.hover) && !this.active ? h(_FocusRipple2.default) : undefined]);

    return h('div', {
      staticClass: 'mu-slider',
      class: this.sliderClass,
      attrs: {
        tabindex: 0
      },
      on: (0, _extends3.default)({}, this.$listeners, {
        focus: this.handleFocus,
        blur: this.handleBlur,
        keydown: this.handleKeydown,
        touchstart: this.handleTouchStart,
        touchend: this.handleTouchEnd,
        touchcancel: this.handleTouchEnd,
        mousedown: this.handleMouseDown,
        mouseup: this.handleMouseUp,
        mouseenter: this.handleMouseEnter,
        mouseleave: this.handleMouseLeave
      })
    }, [input, displayValue, h('div', { staticClass: 'mu-slider-track' }), h('div', { staticClass: 'mu-slider-fill', style: { width: percent } }), thumb]);
  }
};
},{"babel-runtime/helpers/extends":203,"keycode":207,"../internal/FocusRipple":161}],30:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/slider.less');

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Slider2.default.install = function (Vue) {
  Vue.component(_Slider2.default.name, _Slider2.default);
};

exports.default = _Slider2.default;
},{"../styles/components/slider.less":88,"./Slider":97}],87:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],91:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _utils = require('../utils');

var _transitions = require('../internal/transitions');

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-snackbar',
  mixins: [_popup2.default, _color2.default],
  props: {
    overlay: {
      default: false
    },
    escPressClose: {
      default: false
    },
    textColor: String,
    message: String,
    action: String,
    actionColor: String,
    position: {
      type: String,
      default: 'bottom',
      validator: function validator(val) {
        return ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'].indexOf(val) !== -1;
      }
    }
  },
  render: function render(h) {
    var _this = this;

    var message = h('div', {
      staticClass: 'mu-snackbar-message'
    }, this.$slots.default && this.$slots.default.length > 0 ? this.$slots.default : this.message);
    var action = this.action ? h(_Button2.default, {
      staticClass: 'mu-snackbar-action',
      props: {
        rippleColor: '#fff',
        rippleOpacity: 0.3,
        flat: true,
        color: this.actionColor || 'secondary'
      },
      on: {
        click: function click(e) {
          _this.$emit('action-click', e);
        }
      }
    }, this.action) : undefined;
    return h(this.position.indexOf('top') !== -1 ? _transitions.SlideTopTransition : _transitions.SlideBottomTransition, [this.open ? h('div', {
      staticClass: 'mu-snackbar ' + this.getColorClass() + ' ' + this.getTextColorClass(),
      style: {
        'z-index': this.zIndex,
        'background-color': (0, _utils.getColor)(this.color),
        'color': (0, _utils.getColor)(this.textColor)
      },
      class: (0, _defineProperty3.default)({}, 'mu-snackbar-' + this.position, !!this.position),
      on: this.$listeners
    }, [message, action]) : undefined]);
  }
};
},{"babel-runtime/helpers/defineProperty":209,"../internal/mixins/popup":200,"../utils":185,"../internal/transitions":154,"../internal/mixins/color":165,"../Button":19}],29:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/snackbar.less');

var _Snackbar = require('./Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Snackbar2.default.install = function (Vue) {
  Vue.component(_Snackbar2.default.name, _Snackbar2.default);
};

exports.default = _Snackbar2.default;
},{"../styles/components/snackbar.less":87,"./Snackbar":91}],98:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],110:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-step-connector',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    data.staticClass = 'mu-step-connector ' + (data.staticClass || '');
    return h('div', data, [h('span', { staticClass: 'mu-step-connector-line' })]);
  }
};
},{}],102:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StepConnector = require('./StepConnector');

var _StepConnector2 = _interopRequireDefault(_StepConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-stepper',
  props: {
    activeStep: {
      type: Number,
      default: 0
    },
    linear: {
      type: Boolean,
      default: true
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: function validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },
  render: function render(h) {
    var activeStep = this.activeStep,
        linear = this.linear,
        orientation = this.orientation;

    var children = [];
    var slots = this.$slots;

    if (slots.default && slots.default.length > 0) {
      var index = 0;
      slots.default.forEach(function (vNode) {
        if (!vNode.componentOptions) return;
        if (index > 0) {
          children.push(h(_StepConnector2.default, {}));
        }
        var propsData = vNode.componentOptions.propsData;

        if (activeStep === index) {
          propsData.active = true;
        } else if (linear && activeStep > index) {
          propsData.completed = true;
        } else if (linear && activeStep < index) {
          propsData.disabled = true;
        }

        propsData.index = index++;
        children.push(vNode);
      });
      if (children.length > 0) children[children.length - 1].componentOptions.propsData.last = true;
    }

    return h('div', {
      staticClass: 'mu-stepper ' + (orientation === 'vertical' ? 'mu-stepper-vertical' : '')
    }, children);
  }
};
},{"./StepConnector":110}],100:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-step',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h) {
    var active = this.active,
        completed = this.completed,
        disabled = this.disabled,
        index = this.index,
        last = this.last;

    var children = [];
    var slots = this.$slots;

    if (slots.default && slots.default.length > 0) {
      slots.default.forEach(function (vNode) {
        if (!vNode.componentOptions || !vNode.componentOptions.propsData) return;
        var num = index + 1;
        vNode.componentOptions.propsData = (0, _extends3.default)({ active: active, completed: completed, disabled: disabled, last: last, num: num }, vNode.componentOptions.propsData);
        children.push(vNode);
      });
    }

    return h('div', { staticClass: 'mu-step', on: this.$listeners }, children);
  }
};
},{"babel-runtime/helpers/extends":203}],101:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-step-label',
  props: {
    active: Boolean,
    completed: Boolean,
    disabled: Boolean,
    num: [String, Number]
  },
  render: function render(h) {
    var slots = this.$slots;
    var isSlotsIcon = slots.icon && slots.icon.length > 0;
    var icon = this.completed ? h('svg', {
      staticClass: 'mu-step-label-icon',
      attrs: {
        viewBox: '0 0 24 24'
      }
    }, [h('path', {
      attrs: {
        d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      }
    })]) : h('div', { staticClass: 'mu-step-label-circle' }, this.num);

    return h('span', {
      staticClass: 'mu-step-label',
      class: {
        active: this.active,
        completed: this.completed,
        disabled: this.disabled
      },
      on: this.$listeners
    }, [this.num || isSlotsIcon ? h('span', { staticClass: 'mu-step-label-icon-container' }, [isSlotsIcon ? slots.icon : icon]) : undefined, slots.default]);
  }
};
},{}],104:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

var _StepLabel = require('./StepLabel');

var _StepLabel2 = _interopRequireDefault(_StepLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-step-button',
  props: {
    active: Boolean,
    completed: Boolean,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    num: [String, Number],
    last: Boolean,
    childrenInLabel: {
      type: Boolean,
      default: true
    }
  },
  render: function render(h) {
    var slots = this.$slots;

    var stepLabel = h(_StepLabel2.default, {
      props: {
        active: this.active,
        completed: this.completed,
        num: this.num,
        disabled: this.disabled
      }
    }, [slots.default, slots.icon && slots.icon.map(function (vNode) {
      if (!vNode.tag) return vNode;
      vNode.data = vNode.data || {};
      vNode.data.slot = 'icon';
    })]);

    return h(_AbstractButton2.default, {
      staticClass: 'mu-step-button',
      props: {
        disabled: this.disabled,
        ripple: this.ripple
      },
      on: this.$listeners
    }, [this.childrenInLabel ? stepLabel : slots.default]);
  }
};
},{"../internal/AbstractButton":155,"./StepLabel":101}],112:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ExpandTransition = require('../internal/ExpandTransition');

var _ExpandTransition2 = _interopRequireDefault(_ExpandTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-step-content',
  props: {
    active: Boolean,
    last: Boolean
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-step-content',
      class: {
        last: this.last
      },
      on: this.$listeners
    }, [h('div', {
      style: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }
    }, [h(_ExpandTransition2.default, [this.active ? h('div', { staticClass: 'mu-step-content-inner', ref: 'inner' }, this.$slots.default) : undefined])])]);
  }
};
},{"../internal/ExpandTransition":156}],32:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepContent = exports.StepConnector = exports.StepButton = exports.StepLabel = exports.Step = exports.Stepper = undefined;

require('../styles/components/stepper.less');

var _Stepper = require('./Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

var _StepLabel = require('./StepLabel');

var _StepLabel2 = _interopRequireDefault(_StepLabel);

var _StepButton = require('./StepButton');

var _StepButton2 = _interopRequireDefault(_StepButton);

var _StepConnector = require('./StepConnector');

var _StepConnector2 = _interopRequireDefault(_StepConnector);

var _StepContent = require('./StepContent');

var _StepContent2 = _interopRequireDefault(_StepContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Stepper2.default.install = function (Vue) {
  Vue.component(_Stepper2.default.name, _Stepper2.default);
  Vue.component(_Step2.default.name, _Step2.default);
  Vue.component(_StepLabel2.default.name, _StepLabel2.default);
  Vue.component(_StepButton2.default.name, _StepButton2.default);
  Vue.component(_StepConnector2.default.name, _StepConnector2.default);
  Vue.component(_StepContent2.default.name, _StepContent2.default);
};

exports.Stepper = _Stepper2.default;
exports.Step = _Step2.default;
exports.StepLabel = _StepLabel2.default;
exports.StepButton = _StepButton2.default;
exports.StepConnector = _StepConnector2.default;
exports.StepContent = _StepContent2.default;
exports.default = _Stepper2.default;
},{"../styles/components/stepper.less":98,"./Stepper":102,"./Step":100,"./StepLabel":101,"./StepButton":104,"./StepConnector":110,"./StepContent":112}],92:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],99:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-sub-header',
  functional: true,
  props: {
    inset: Boolean
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = (data.staticClass || '') + ' mu-sub-header ' + (props.inset ? 'inset' : '');
    return h('div', data, children);
  }
};
},{}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/subheader.less');

var _SubHeader = require('./SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SubHeader2.default.install = function (Vue) {
  Vue.component(_SubHeader2.default.name, _SubHeader2.default);
};

exports.default = _SubHeader2.default;
},{"../styles/components/subheader.less":92,"./SubHeader":99}],113:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],117:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require('../internal/mixins/select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-switch',
  mixins: [(0, _select2.default)('switch')],
  props: {
    inputValue: Boolean
  },
  computed: {
    checked: function checked() {
      return this.inputValue;
    }
  },
  methods: {
    toggle: function toggle() {
      this.$emit('change', !this.inputValue);
    }
  },
  render: function render(h) {
    var view = h('div', {
      staticClass: 'mu-switch-container'
    }, [h('div', { staticClass: 'mu-switch-track' }), this.createRipple(h, 'mu-switch-thumb')]);

    return this.createSelect(h, view);
  }
};
},{"../internal/mixins/select":171}],37:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/switch.less');

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Switch2.default.install = function (Vue) {
  Vue.component(_Switch2.default.name, _Switch2.default);
};

exports.default = _Switch2.default;
},{"../styles/components/switch.less":113,"./Switch":117}],111:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],116:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _resize = require('../internal/directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-tabs',
  mixins: [_color2.default],
  provide: function provide() {
    return {
      tabClick: this.handleTabClick,
      getDefaultVal: this.getDefaultVal,
      addTab: this.addTab,
      removeTab: this.removeTab,
      setTabHighLineStyle: this.setTabHighLineStyle,
      getActiveValue: this.getActiveValue,
      getActiveColor: this.getActiveColor
    };
  },

  props: {
    indicatorColor: String,
    textColor: String,
    fullWidth: Boolean,
    center: Boolean,
    fixed: Boolean,
    value: {}
  },
  data: function data() {
    return {
      tabs: [],
      activeValue: (0, _utils.isNotNull)(this.value) ? this.value : 0
    };
  },
  created: function created() {
    this.tabIndex = 0;
  },
  mounted: function mounted() {
    this.setTabHighLineStyle();
  },
  updated: function updated() {
    this.setTabHighLineStyle();
  },

  methods: {
    handleTabClick: function handleTabClick(value, tab) {
      if (this.activeValue !== value) {
        this.activeValue = value;
        this.$emit('update:value', value);
        this.$emit('change', value);
      }
    },
    getActiveValue: function getActiveValue() {
      return this.activeValue;
    },
    getDefaultVal: function getDefaultVal() {
      return this.tabIndex++;
    },
    getActiveColor: function getActiveColor() {
      return (0, _utils.getColor)(this.textColor);
    },
    addTab: function addTab(tab) {
      this.tabs.push(tab);
    },
    removeTab: function removeTab(tab) {
      var index = this.tabs.indexOf(tab);
      if (index === -1) return;
      this.tabs.splice(index, 1);
    },
    getActiveTab: function getActiveTab() {
      return this.tabs.filter(function (tab) {
        return tab.active;
      })[0];
    },
    setTabHighLineStyle: function setTabHighLineStyle() {
      var _this = this;

      this.$nextTick(function () {
        var activeTab = _this.getActiveTab();
        if (!activeTab) return;
        var el = activeTab.$el;
        var lineEl = _this.$refs.line;
        var rect = el.getBoundingClientRect();
        var tabsRect = _this.$el.getBoundingClientRect();
        lineEl.style.width = rect.width + 'px';
        lineEl.style.left = rect.left - tabsRect.left + 'px';
      });
    }
  },
  watch: {
    value: function value(val) {
      this.activeValue = val;
    },
    activeValue: function activeValue() {
      this.setTabHighLineStyle();
    }
  },
  directives: {
    resize: _resize2.default
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-tabs ' + this.getColorClass() + ' ' + this.getTextColorClass(),
      class: {
        'mu-tabs-full-width': this.fullWidth,
        'mu-tabs-center': this.center,
        'mu-tabs-inverse': this.textColor,
        'mu-tabs-fixed': this.fixed
      },
      style: {
        'background-color': !this.textColor ? (0, _utils.getColor)(this.color) : ''
      },
      directives: [{
        name: 'resize',
        value: this.setTabHighLineStyle
      }]
    }, [this.$slots.default, h('span', {
      staticClass: 'mu-tab-link-highlight',
      class: {
        'mu-primary-color': this.indicatorColor === 'primary',
        'mu-secondary-color': this.indicatorColor === 'secondary'
      },
      style: {
        'background-color': (0, _utils.getColor)(this.indicatorColor)
      },
      ref: 'line'
    })]);
  }
};
},{"../utils":185,"../internal/directives/resize":174,"../internal/mixins/color":165}],114:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _route = require('../internal/mixins/route');

var _route2 = _interopRequireDefault(_route);

var _utils = require('../utils');

var _AbstractButton = require('../internal/AbstractButton');

var _AbstractButton2 = _interopRequireDefault(_AbstractButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-tab',
  mixins: [_route2.default],
  inject: ['tabClick', 'getActiveValue', 'getDefaultVal', 'addTab', 'removeTab', 'setTabHighLineStyle', 'getActiveColor'],
  props: {
    disabled: Boolean,
    value: {}
  },
  data: function data() {
    return {
      tabVal: 0
    };
  },

  computed: {
    active: function active() {
      return !this.disabled && this.getActiveValue() === this.tabVal;
    },
    activeColor: function activeColor() {
      return this.getActiveColor();
    }
  },
  created: function created() {
    this.tabVal = (0, _utils.isNotNull)(this.value) ? this.value : this.getDefaultVal();
    this.addTab(this);
  },

  methods: {
    handleClick: function handleClick(e) {
      this.tabClick(this.tabVal, this);
      this.$emit('click', e);
    }
  },
  beforeDestory: function beforeDestory() {
    this.removeTab(this);
  },

  watch: {
    active: function active(val, oldVal) {
      if (val) this.$emit('active');
    },
    value: function value(val) {
      this.tabVal = val;
      this.setTabHighLineStyle();
    }
  },
  render: function render(h) {
    return h(_AbstractButton2.default, {
      staticClass: 'mu-tab',
      props: (0, _extends3.default)({}, this.generateRouteProps(), {
        containerElement: 'div',
        wrapperClass: 'mu-tab-wrapper',
        disabled: this.disabled
      }),
      style: {
        color: this.active ? this.activeColor : ''
      },
      class: {
        'mu-tab-active': this.active
      },
      on: {
        click: this.handleClick
      }
    }, this.$slots.default);
  }
};
},{"babel-runtime/helpers/extends":203,"../internal/mixins/route":168,"../utils":185,"../internal/AbstractButton":155}],36:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = undefined;

require('../styles/components/tabs.less');

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Tabs2.default.install = function (Vue) {
  Vue.component(_Tabs2.default.name, _Tabs2.default);
  Vue.component(_Tab2.default.name, _Tab2.default);
};

exports.Tabs = _Tabs2.default;
exports.Tab = _Tab2.default;
exports.default = _Tabs2.default;
},{"../styles/components/tabs.less":111,"./Tabs":116,"./Tab":114}],118:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],164:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    rows: {
      type: Number,
      default: 1
    },
    rowsMax: {
      type: Number
    },
    value: String
  },
  mounted: function mounted() {
    this.resizeTextarea();
  },

  watch: {
    value: function value(val, oldVal) {
      var _this = this;

      this.$nextTick(function () {
        _this.resizeTextarea();
      });
    }
  },
  methods: {
    resizeTextarea: function resizeTextarea() {
      var element = this.$refs.textarea;
      if (!element) return;
      var hiddenEl = this.$refs.textareaHidden;
      var lineHeight = window.getComputedStyle(element, null).getPropertyValue('line-height');
      lineHeight = Number(lineHeight.substring(0, lineHeight.indexOf('px')));
      var pt = window.getComputedStyle(element, null).getPropertyValue('padding-top');
      pt = Number(pt.substring(0, pt.indexOf('px')));
      var pd = window.getComputedStyle(element, null).getPropertyValue('padding-bottom');
      pd = Number(pd.substring(0, pd.indexOf('px')));
      var minHeight = pd + pt + lineHeight * this.rows;
      var maxHeight = pd + pt + lineHeight * (this.rowsMax || 0);
      var height = hiddenEl.scrollHeight;
      element.style.height = (height < minHeight ? minHeight : height > maxHeight && maxHeight > 0 ? maxHeight : height) + 'px';
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-text-field-multiline'
    }, [h('textarea', {
      staticClass: 'mu-text-field-textarea-hide mu-text-field-input',
      ref: 'textareaHidden',
      attrs: {
        rows: 1
      },
      domProps: {
        innerText: this.value
      }
    }), h('textarea', {
      staticClass: 'mu-text-field-input mu-text-field-textarea',
      ref: 'textarea',
      attrs: (0, _extends3.default)({
        tabindex: 0
      }, this.$attrs, {
        disabled: this.disabled
      }),
      domProps: {
        innerText: this.value
      },
      on: this.$listeners
    })]);
  }
};
},{"babel-runtime/helpers/extends":203}],120:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _input = require('../internal/mixins/input');

var _input2 = _interopRequireDefault(_input);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-text-field',
  mixins: [_input2.default],
  props: {
    rows: {
      type: Number,
      default: 1
    },
    rowsMax: {
      type: Number
    },
    actionIcon: String,
    actionClick: Function,
    suffix: String
  },
  methods: {
    handleInput: function handleInput(e) {
      this.inputValue = e.target.value;
    },
    handleFocus: function handleFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    handleBlur: function handleBlur(e) {
      this.isFocused = false;
      this.$emit('blur', e);
    },
    createTextField: function createTextField(h) {
      var _this = this;

      var listeners = (0, _extends3.default)({}, this.$listeners, {
        input: this.handleInput,
        focus: this.handleFocus,
        blur: this.handleBlur
      });
      var placeholder = !this.labelFloat ? this.$attrs.placeholder : '';
      return h('div', {
        staticClass: 'mu-text-field'
      }, [this.multiLine ? h(_Textarea2.default, {
        attrs: (0, _extends3.default)({}, this.$attrs, {
          maxlength: this.maxLength,
          placeholder: placeholder
        }),
        props: {
          disabled: this.disabled,
          rows: this.rows,
          rowsMax: this.rowsMax,
          value: String(this.inputValue)
        },
        on: listeners
      }) : h('input', {
        staticClass: 'mu-text-field-input',
        attrs: (0, _extends3.default)({
          tabindex: 0
        }, this.$attrs, {
          maxlength: this.maxLength,
          disabled: this.disabled,
          placeholder: placeholder
        }),
        on: listeners
      }), this.suffix ? h('span', { staticClass: 'mu-text-field-suffix' }, this.suffix) : undefined, this.actionIcon ? h(_Icon2.default, {
        staticClass: 'mu-text-field-action',
        props: {
          value: this.actionIcon
        },
        on: {
          click: function click() {
            return !_this.disabled && _this.actionClick && _this.actionClick();
          }
        }
      }) : undefined]);
    }
  },
  render: function render(h) {
    return this.createInput(h, [this.createTextField(h)]);
  }
};
},{"babel-runtime/helpers/extends":203,"../internal/mixins/input":163,"../Icon":23,"./Textarea":164}],39:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/text-field.less');

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TextField2.default.install = function (Vue) {
  Vue.component(_TextField2.default.name, _TextField2.default);
};

exports.default = _TextField2.default;
},{"../styles/components/text-field.less":118,"./TextField":120}],152:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],180:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    affix: {
      type: String,
      default: '',
      validator: function validator(val) {
        return ['', 'pm', 'am'].indexOf(val) !== -1;
      }
    },
    format: {
      type: String,
      validator: function validator(val) {
        return val && ['ampm', '24hr'].indexOf(val) !== -1;
      }
    },
    mode: {
      type: String,
      default: 'hour',
      validator: function validator(val) {
        return ['hour', 'minute'].indexOf(val) !== -1;
      }
    },
    selectedTime: {
      type: Date,
      default: function _default() {
        return new Date();
      },

      required: true
    }
  },
  computed: {
    sanitizeTime: function sanitizeTime() {
      var hour = this.selectedTime.getHours();
      var min = this.selectedTime.getMinutes().toString();
      if (this.format === 'ampm') {
        hour %= 12;
        hour = hour || 12;
      }
      hour = hour.toString();
      if (hour.length < 2) hour = '0' + hour;
      if (min.length < 2) min = '0' + min;
      return [hour, min];
    }
  },
  methods: {
    handleSelectAffix: function handleSelectAffix(affix) {
      this.$emit('selectAffix', affix);
    },
    handleSelectHour: function handleSelectHour() {
      this.$emit('selectHour');
    },
    handleSelectMin: function handleSelectMin() {
      this.$emit('selectMin');
    }
  },
  render: function render(h) {
    var _this = this;

    var displayTime = h('div', {
      staticClass: 'mu-time-display-time'
    }, [h('span', {
      staticClass: 'mu-time-display-clickable',
      class: {
        'inactive': this.mode === 'minute'
      },
      on: {
        click: this.handleSelectHour
      }
    }, this.sanitizeTime[0]), h('span', {}, ':'), h('span', {
      staticClass: 'mu-time-display-clickable',
      class: {
        'inactive': this.mode === 'hour'
      },
      on: {
        click: this.handleSelectMin
      }
    }, this.sanitizeTime[1])]);

    var displayAffix = this.format === 'ampm' ? h('div', {
      staticClass: 'mu-time-display-affix'
    }, [h('div', {
      staticClass: 'mu-time-display-clickable',
      class: {
        'inactive': this.affix === 'am'
      },
      on: {
        click: function click() {
          return _this.handleSelectAffix('pm');
        }
      }
    }, 'PM'), h('div', {
      staticClass: 'mu-time-display-clickable',
      class: {
        'inactive': this.affix === 'pm'
      },
      on: {
        click: function click() {
          return _this.handleSelectAffix('am');
        }
      }
    }, 'AM')]) : undefined;
    return h('div', {
      staticClass: 'mu-time-display'
    }, [h('div', {
      staticClass: 'mu-time-display-text'
    }, [this.format === 'ampm' ? h('div', {
      staticClass: 'mu-time-display-affix'
    }) : undefined, displayTime, displayAffix])]);
  }
};
},{}],224:[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":238,"./_wks":234,"./_iterators":233,"./_core":237}],221:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/web.dom.iterable":222,"../modules/es6.string.iterator":223,"../modules/core.is-iterable":224}],216:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":221}],225:[function(require,module,exports) {
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":235,"./core.get-iterator-method":236,"./_core":237}],220:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/web.dom.iterable":222,"../modules/es6.string.iterator":223,"../modules/core.get-iterator":225}],217:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":220}],213:[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/is-iterable":216,"../core-js/get-iterator":217}],197:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHours = addHours;
exports.addMinutes = addMinutes;
exports.addSeconds = addSeconds;
exports.formatTime = formatTime;
exports.strToTime = strToTime;
exports.rad2deg = rad2deg;
exports.getTouchEventOffsetValues = getTouchEventOffsetValues;
exports.isInner = isInner;
/**
 * material-ui timeUtils.js
 * https://github.com/callemall/material-ui/blob/master/src/TimePicker/timeUtils.js
 */
function addHours(d, hours) {
  var newDate = clone(d);
  newDate.setHours(d.getHours() + hours);
  return newDate;
}

function addMinutes(d, minutes) {
  var newDate = clone(d);
  newDate.setMinutes(d.getMinutes() + minutes);
  return newDate;
}

function addSeconds(d, seconds) {
  var newDate = clone(d);
  newDate.setSeconds(d.getMinutes() + seconds);
  return newDate;
}

function clone(d) {
  return new Date(d.getTime());
}

/**
 * @param date [Date] A Date object.
 * @param format [String] One of 'ampm', '24hr', defaults to 'ampm'.
 * @param pedantic [Boolean] Check time-picker/time-picker.jsx file.
 *
 * @return String A string representing the formatted time.
 */
function formatTime(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ampm';
  var pedantic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!date) return '';
  var hours = date.getHours();
  var mins = date.getMinutes().toString();

  if (format === 'ampm') {
    var isAM = hours < 12;
    hours = hours % 12;
    var additional = isAM ? ' am' : ' pm';
    hours = (hours || 12).toString();

    if (mins.length < 2) mins = '0' + mins;

    if (pedantic) {
      // Treat midday/midnight specially http://www.nist.gov/pml/div688/times.cfm
      if (hours === '12' && mins === '00') {
        return additional === ' pm' ? '12 noon' : '12 midnight';
      }
    }

    return hours + (mins === '00' ? '' : ':' + mins) + additional;
  }

  hours = hours.toString();

  if (hours.length < 2) hours = '0' + hours;
  if (mins.length < 2) mins = '0' + mins;

  return hours + ':' + mins;
}

function strToTime(str) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ampm';
  var pedantic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var date = new Date();
  if (!str) return date;
  var mtype = '';
  var index = -1;
  if (format === 'ampm') {
    index = str.indexOf('am');
    if (index === -1) index = str.indexOf('midnight');
    if (index !== -1) {
      mtype = 'am';
    } else {
      mtype = 'pm';
      index = str.indexOf('pm');
      if (index === -1) index = str.indexOf('noon');
    }
  }

  if (index !== -1) str = str.substring(0, index).trim();

  var times = str.split(':');
  var hour = Number(times[0].trim());
  if (mtype === 'pm') {
    hour += 12;
  }
  if (hour >= 24) hour = 0;
  var minute = times.length > 1 ? Number(times[1]) : 0;
  date.setMinutes(minute);
  date.setHours(hour);
  return date;
}

function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(event) {
  var el = event.target;
  var boundingRect = el.getBoundingClientRect();

  return {
    offsetX: event.clientX - boundingRect.left,
    offsetY: event.clientY - boundingRect.top
  };
}

function isInner(props) {
  if (props.type !== 'hour') {
    return false;
  }
  return props.value < 1 || props.value > 12;
}
},{}],195:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positions = [[0, 5], [54.5, 16.6], [94.4, 59.5], [109, 114], [94.4, 168.5], [54.5, 208.4], [0, 223], [-54.5, 208.4], [-94.4, 168.5], [-109, 114], [-94.4, 59.5], [-54.5, 19.6]];
var innerPositions = [[0, 40], [36.9, 49.9], [64, 77], [74, 114], [64, 151], [37, 178], [0, 188], [-37, 178], [-64, 151], [-74, 114], [-64, 77], [-37, 50]];
exports.default = {
  props: {
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'minute',
      validator: function validator(val) {
        return ['hour', 'minute'].indexOf(val) !== -1;
      }
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isInner: function isInner() {
      return (0, _timeUtils.isInner)(this);
    },
    numberClass: function numberClass() {
      return {
        selected: this.selected,
        inner: this.isInner
      };
    },
    numberStyle: function numberStyle() {
      var pos = this.value;
      if (this.type === 'hour') {
        pos %= 12;
      } else {
        pos = pos / 5;
      }
      var transformPos = positions[pos];
      if (this.isInner) transformPos = innerPositions[pos];

      var _transformPos = transformPos,
          _transformPos2 = (0, _slicedToArray3.default)(_transformPos, 2),
          x = _transformPos2[0],
          y = _transformPos2[1];

      return {
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        left: this.isInner ? 'calc(50% - 14px)' : 'calc(50% - 16px)'
      };
    }
  },
  render: function render(h) {
    return h('span', {
      staticClass: 'mu-timepicker-number',
      class: this.numberClass,
      style: this.numberStyle
    }, this.value === 0 ? '00' : this.value);
  }
};
},{"babel-runtime/helpers/slicedToArray":213,"./timeUtils":197}],196:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeUtils = require('./timeUtils');

exports.default = {
  props: {
    hasSelected: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'minute',
      validator: function validator(val) {
        return ['hour', 'minute'].indexOf(val) !== -1;
      }
    },
    value: {
      type: Number
    }
  },
  computed: {
    isInner: function isInner() {
      return (0, _timeUtils.isInner)(this);
    },
    pointerStyle: function pointerStyle() {
      var type = this.type,
          value = this.value,
          calcAngle = this.calcAngle;

      var angle = type === 'hour' ? calcAngle(value, 12) : calcAngle(value, 60);
      return {
        transform: 'rotateZ(' + angle + 'deg)'
      };
    }
  },
  methods: {
    calcAngle: function calcAngle(value, base) {
      value %= base;
      var angle = 360 / base * value;
      return angle;
    }
  },
  render: function render(h) {
    if (this.value === undefined || this.value === null) return h('span', {});
    return h('div', {
      staticClass: 'mu-timepicker-pointer',
      class: {
        'inner': this.isInner
      },
      style: this.pointerStyle
    }, [h('div', {
      staticClass: 'mu-timepicker-pointer-mark',
      class: {
        'has-selected': this.hasSelected
      }
    })]);
  }
};
},{"./timeUtils":197}],181:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Pointer = require('./Pointer');

var _Pointer2 = _interopRequireDefault(_Pointer);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].indexOf(val) !== -1;
      }
    },
    initialHours: {
      type: Number,
      default: new Date().getHours()
    }
  },
  computed: {
    hours: function hours() {
      var hourSize = this.format === 'ampm' ? 12 : 24;
      var hours = [];
      for (var i = 1; i <= hourSize; i++) {
        hours.push(i % 24);
      }
      return hours;
    }
  },
  mounted: function mounted() {
    var clockElement = this.$refs.mask;
    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2
    };
    this.basePoint = {
      x: this.center.x,
      y: 0
    };
  },

  methods: {
    getSelected: function getSelected() {
      var hour = this.initialHours;
      if (this.format === 'ampm') {
        hour %= 12;
        hour = hour || 12;
      }
      return hour;
    },
    isMousePressed: function isMousePressed(event) {
      if (typeof event.buttons === 'undefined') {
        return event.nativeEvent.which;
      }
      return event.buttons;
    },
    handleUp: function handleUp(event) {
      event.preventDefault();
      this.setClock(event, true);
    },
    handleMove: function handleMove(event) {
      event.preventDefault();
      if (this.isMousePressed(event) !== 1) return;
      this.setClock(event, false);
    },
    handleTouchMove: function handleTouchMove(event) {
      event.preventDefault();
      this.setClock(event.changedTouches[0], false);
    },
    handleTouchEnd: function handleTouchEnd(event) {
      event.preventDefault();
      this.setClock(event.changedTouches[0], true);
    },
    setClock: function setClock(event, finish) {
      if (typeof event.offsetX === 'undefined') {
        var offset = (0, _timeUtils.getTouchEventOffsetValues)(event);
        event.offsetX = offset.offsetX;
        event.offsetY = offset.offsetY;
      }
      var hours = this.getHours(event.offsetX, event.offsetY);
      this.$emit('change', hours, finish);
    },
    getHours: function getHours(offsetX, offsetY) {
      var step = 30;
      var x = offsetX - this.center.x;
      var y = offsetY - this.center.y;
      var cx = this.basePoint.x - this.center.x;
      var cy = this.basePoint.y - this.center.y;
      var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
      var deg = (0, _timeUtils.rad2deg)(atan);
      deg = Math.round(deg / step) * step;
      deg %= 360;
      var value = Math.floor(deg / step) || 0;
      var delta = Math.pow(x, 2) + Math.pow(y, 2);
      var distance = Math.sqrt(delta);
      value = value || 12;
      if (this.format === '24hr') {
        if (distance < 90) {
          value += 12;
          value %= 24;
        }
      } else {
        value %= 12;
      }
      return value;
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'mu-timepicker-hours'
    }, [h(_Pointer2.default, {
      props: {
        type: 'hour',
        hasSelected: true,
        value: this.getSelected()
      }
    }), this.hours.map(function (hour) {
      return h(_Number2.default, {
        props: {
          selected: _this.getSelected() === hour,
          type: 'hour',
          value: hour
        },
        key: hour
      });
    }), h('div', {
      staticClass: 'mu-timepicker-hours-mask',
      on: {
        mouseup: this.handleUp,
        mousemove: this.handleMove,
        touchmove: this.handleTouchMove,
        touchend: this.handleTouchEnd
      },
      ref: 'mask'
    })]);
  }
};
},{"./Number":195,"./Pointer":196,"./timeUtils":197}],182:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Pointer = require('./Pointer');

var _Pointer2 = _interopRequireDefault(_Pointer);

var _timeUtils = require('./timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    initialMinutes: {
      type: Number,
      default: function _default() {
        return new Date().getMinutes();
      }
    }
  },
  mounted: function mounted() {
    var clockElement = this.$refs.mask;
    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2
    };
    this.basePoint = {
      x: this.center.x,
      y: 0
    };
  },
  data: function data() {
    return {
      minutes: null
    };
  },
  created: function created() {
    this.minutes = this.getMinuteNumbers();
  },

  methods: {
    getMinuteNumbers: function getMinuteNumbers() {
      var minutes = [];
      for (var i = 0; i < 12; i++) {
        minutes.push(i * 5);
      }
      var selectedMinutes = this.initialMinutes;
      var hasSelected = false;
      var numbers = minutes.map(function (minute) {
        var isSelected = selectedMinutes === minute;
        if (isSelected) {
          hasSelected = true;
        }
        return {
          minute: minute,
          isSelected: isSelected
        };
      });
      return {
        numbers: numbers,
        hasSelected: hasSelected,
        selected: selectedMinutes
      };
    },
    isMousePressed: function isMousePressed(event) {
      if (typeof event.buttons === 'undefined') {
        return event.nativeEvent.which;
      }
      return event.buttons;
    },
    handleUp: function handleUp(event) {
      event.preventDefault();
      this.setClock(event, true);
    },
    handleMove: function handleMove(event) {
      event.preventDefault();
      if (this.isMousePressed(event) !== 1) {
        return;
      }
      this.setClock(event, false);
    },
    handleTouch: function handleTouch(event) {
      event.preventDefault();
      this.setClock(event.changedTouches[0], false);
    },
    setClock: function setClock(event, finish) {
      if (typeof event.offsetX === 'undefined') {
        var offset = (0, _timeUtils.getTouchEventOffsetValues)(event);
        event.offsetX = offset.offsetX;
        event.offsetY = offset.offsetY;
      }
      var minutes = this.getMinutes(event.offsetX, event.offsetY);
      this.$emit('change', minutes, finish);
    },
    getMinutes: function getMinutes(offsetX, offsetY) {
      var step = 6;
      var x = offsetX - this.center.x;
      var y = offsetY - this.center.y;
      var cx = this.basePoint.x - this.center.x;
      var cy = this.basePoint.y - this.center.y;
      var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
      var deg = (0, _timeUtils.rad2deg)(atan);
      deg = Math.round(deg / step) * step;
      deg %= 360;
      var value = Math.floor(deg / step) || 0;
      return value;
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-timepicker-minutes'
    }, [h(_Pointer2.default, {
      props: {
        hasSelected: this.minutes.hasSelected,
        value: this.minutes.selected,
        type: 'minute'
      }
    }), this.minutes.numbers.map(function (minute) {
      return h(_Number2.default, {
        props: {
          selected: minute.isSelected,
          type: 'minute',
          value: minute.minute
        },
        key: minute.minute
      });
    }), h('div', {
      staticClass: 'mu-timepicker-minutes-mask',
      on: {
        mouseup: this.handleUp,
        mousemove: this.handleMove,
        touchmove: this.handleTouch,
        touchend: this.handleTouch
      },
      ref: 'mask'
    })]);
  },

  watch: {
    initialMinutes: function initialMinutes(val) {
      this.minutes = this.getMinuteNumbers();
    }
  }
};
},{"./Number":195,"./Pointer":196,"./timeUtils":197}],153:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TimeDisplay = require('./TimeDisplay');

var _TimeDisplay2 = _interopRequireDefault(_TimeDisplay);

var _Hours = require('./Hours');

var _Hours2 = _interopRequireDefault(_Hours);

var _Minutes = require('./Minutes');

var _Minutes2 = _interopRequireDefault(_Minutes);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-time-picker',
  props: {
    autoOk: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].indexOf(val) !== -1;
      }
    },
    initialTime: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    okLabel: {
      type: String,
      default: '确定'
    },
    cancelLabel: {
      type: String,
      default: '取消'
    },
    landscape: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      selectedTime: this.initialTime,
      mode: 'hour'
    };
  },

  methods: {
    getAffix: function getAffix() {
      if (this.format !== 'ampm') return '';
      var hours = this.selectedTime.getHours();
      if (hours < 12) {
        return 'am';
      }
      return 'pm';
    },
    handleSelectAffix: function handleSelectAffix(affix) {
      if (affix === this.getAffix()) return;
      var hours = this.selectedTime.getHours();
      if (affix === 'am') {
        this.handleChangeHours(hours - 12, affix);
        return;
      }
      this.handleChangeHours(hours + 12, affix);
    },
    handleChangeHours: function handleChangeHours(hours, finished) {
      var _this = this;

      var time = new Date(this.selectedTime);
      var affix = void 0;
      if (typeof finished === 'string') {
        affix = finished;
        finished = undefined;
      }
      if (!affix) {
        affix = this.getAffix();
      }
      if (affix === 'pm' && hours < 12) {
        hours += 12;
      }
      time.setHours(hours);
      this.selectedTime = time;
      if (finished) {
        setTimeout(function () {
          _this.mode = 'minute';
          _this.$emit('changeHours', time);
        }, 100);
      }
    },
    handleChangeMinutes: function handleChangeMinutes(minutes) {
      var _this2 = this;

      var time = new Date(this.selectedTime);
      time.setMinutes(minutes);
      this.selectedTime = time;
      setTimeout(function () {
        _this2.$emit('changeMinutes', time);
        if (_this2.autoOk) _this2.accept();
      }, 0);
    },
    accept: function accept() {
      this.$emit('accept', this.selectedTime);
    },
    dismiss: function dismiss() {
      this.$emit('dismiss');
    }
  },
  render: function render(h) {
    var _this3 = this;

    var actions = h('div', {
      staticClass: 'mu-timepicker-actions'
    }, [h(_Button2.default, {
      props: {
        color: 'primary',
        flat: true
      },
      on: {
        click: this.dismiss
      }
    }, this.cancelLabel), h(_Button2.default, {
      props: {
        color: 'primary',
        flat: true
      },
      on: {
        click: this.accept
      }
    }, this.okLabel)]);

    return h('div', {
      staticClass: 'mu-timepicker',
      class: {
        'mu-timepicker-landspace': this.landscape
      }
    }, [h(_TimeDisplay2.default, {
      props: {
        selectedTime: this.selectedTime,
        format: this.format,
        mode: this.mode,
        affix: this.getAffix()
      },
      on: {
        selectMin: function selectMin() {
          _this3.mode = 'minute';
        },
        selectHour: function selectHour() {
          _this3.mode = 'hour';
        },
        selectAffix: this.handleSelectAffix
      }
    }), h('div', {
      staticClass: 'mu-timepicker-container'
    }, [h('div', { staticClass: 'mu-timepicker-circle' }), this.mode === 'hour' ? h(_Hours2.default, {
      props: {
        format: this.format,
        initialHours: this.selectedTime.getHours()
      },
      on: {
        change: this.handleChangeHours
      }
    }) : undefined, this.mode === 'minute' ? h(_Minutes2.default, {
      props: {
        initialMinutes: this.selectedTime.getMinutes()
      },
      on: {
        change: this.handleChangeMinutes
      }
    }) : undefined, actions])]);
  },

  watch: {
    initialTime: function initialTime(val) {
      this.selectedTime = val;
    }
  }
};
},{"./TimeDisplay":180,"./Hours":181,"./Minutes":182,"../Button":19}],41:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/time-picker.less');

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TimePicker2.default.install = function (Vue) {
  Vue.component(_TimePicker2.default.name, _TimePicker2.default);
};

exports.default = _TimePicker2.default;
},{"../styles/components/time-picker.less":152,"./TimePicker":153}],115:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],166:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _transitions = require('../internal/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE = 8;
exports.default = {
  name: 'mu-tooltip-content',
  mixins: [_popup2.default],
  props: {
    overlay: {
      default: false
    },
    escPressClose: {
      default: false
    },
    placement: {
      type: String,
      default: 'bottom',
      validator: function validator(val) {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(val) !== -1;
      }
    },
    trigger: {}
  },
  mounted: function mounted() {
    this.setStyle();
  },
  updated: function updated() {
    var _this = this;

    setTimeout(function () {
      return _this.setStyle();
    }, 0);
  },

  methods: {
    getLeftPosition: function getLeftPosition(width, react) {
      switch (this.placement) {
        case 'left':
        case 'left-start':
        case 'left-end':
          return react.left - width - SPACE;
        case 'right':
        case 'right-start':
        case 'right-end':
          return react.left + react.width + SPACE;
        case 'top':
        case 'bottom':
          return react.left + react.width / 2 - width / 2;
        case 'bottom-start':
        case 'top-start':
          return react.left;
        case 'bottom-end':
        case 'top-end':
          return react.left + react.width - width;
      }
    },
    getTopPosition: function getTopPosition(height, react) {
      switch (this.placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return react.top - height - SPACE;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return react.top + react.height + SPACE;
        case 'left':
        case 'right':
          return react.top + react.height / 2 - height / 2;
        case 'left-start':
        case 'right-start':
          return react.top;
        case 'left-end':
        case 'right-end':
          return react.top + react.height - height;
      }
    },
    setStyle: function setStyle() {
      if (!this.open) return;
      var el = this.$el;
      var triggerEl = this.trigger;
      if (!el || !triggerEl) return;
      var elReact = el.getBoundingClientRect();
      var react = triggerEl.getBoundingClientRect();
      el.style.top = this.getTopPosition(elReact.height, react) + 'px';
      el.style.left = this.getLeftPosition(elReact.width, react) + 'px';
    }
  },
  render: function render(h) {
    return h(_transitions.FadeTransition, [this.open ? h('div', {
      staticClass: 'mu-tooltip',
      style: {
        'z-index': this.zIndex
      }
    }, this.$slots.default) : undefined]);
  }
};
},{"../internal/mixins/popup":200,"../internal/transitions":154}],119:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _TooltipContent = require('./TooltipContent');

var _TooltipContent2 = _interopRequireDefault(_TooltipContent);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-tooltip',
  props: {
    content: String,
    placement: _TooltipContent2.default.props.placement,
    open: Boolean,
    tooltipClass: [String, Object, Array]
  },
  data: function data() {
    return {
      active: this.open,
      trigger: null
    };
  },
  beforeCreate: function beforeCreate() {
    if (this.$isServer) return;

    this.tooltipVM = new _vue2.default({
      data: { node: '' },
      render: function render(h) {
        return this.node;
      }
    }).$mount();
  },
  mounted: function mounted() {
    this.trigger = this.$el;
  },

  methods: {
    addEventHandle: function addEventHandle(old, fn) {
      if (!old) {
        return fn;
      } else if (Array.isArray(old)) {
        return old.indexOf(fn) > -1 ? old : old.concat(fn);
      } else {
        return old === fn ? old : [old, fn];
      }
    },
    show: function show() {
      if (this.timer) clearTimeout(this.timer);
      this.active = true;
    },
    hide: function hide() {
      var _this = this;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.active = false;
      }, 200);
    }
  },
  watch: {
    active: function active(val) {
      this.$emit('update:open', val);
    },
    open: function open(val) {
      this.active = val;
    }
  },
  render: function render(h) {
    var _this2 = this;

    var content = (this.$slots.content && this.$slots.content.length > 0 ? this.$slots.content : this.content) || '';
    this.tooltipVM.node = h(_TooltipContent2.default, {
      class: this.tooltipClass,
      props: {
        placement: this.placement,
        open: this.active,
        trigger: this.trigger
      },
      nativeOn: {
        mouseenter: function mouseenter() {
          return _this2.show();
        },
        mouseleave: function mouseleave() {
          return _this2.hide();
        }
      }
    }, content);

    var vnode = (0, _utils.getFirstComponentChild)(this.$slots.default);
    if (!vnode) return vnode;

    var on = vnode.data.on = vnode.data.on || {};
    var nativeOn = vnode.data.nativeOn = vnode.data.nativeOn || {};
    nativeOn.mouseenter = on.mouseenter = this.addEventHandle(on.mouseenter, this.show);
    nativeOn.mouseleave = on.mouseleave = this.addEventHandle(on.mouseleave, this.hide);
    return vnode;
  }
};
},{"vue":43,"./TooltipContent":166,"../utils":185}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/tooltip.less');

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Tooltip2.default.install = function (Vue) {
  Vue.component(_Tooltip2.default.name, _Tooltip2.default);
};

exports.default = _Tooltip2.default;
},{"../styles/components/tooltip.less":115,"./Tooltip":119}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],121:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  body{\n    background-color: " + theme.background.default + ";\n    color: " + theme.text.primary + ";\n  }\n\n  a{\n    color: " + theme.secondary + ";\n  }\n  ";
};
},{}],123:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n    .mu-appbar {\n      background-color: " + theme.background.default + ",\n      color: " + theme.text.primary + "\n    }\n  ";
};
},{}],122:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n    .mu-avatar {\n      background-color: " + theme.track + ",\n      color: " + theme.text.alternate + "\n    }\n  ";
};
},{}],125:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n    .mu-badge{\n      background-color: " + theme.track + ";\n      color: " + theme.text.alternate + ";\n    }\n  ";
};
},{}],167:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertColorToString = convertColorToString;
exports.convertHexToRGB = convertHexToRGB;
exports.decomposeColor = decomposeColor;
exports.getContrastRatio = getContrastRatio;
exports.getLuminance = getLuminance;
exports.emphasize = emphasize;
exports.fade = fade;
exports.darken = darken;
exports.lighten = lighten;
/**
 * material-ui colorManipulator.js
 * https://github.com/mui-org/material-ui/blob/master/src/utils/colorManipulator.js
 */

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of, 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
function convertColorToString(color) {
  var type = color.type,
      values = color.values;


  if (type.indexOf('rgb') > -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    for (var i = 0; i < 3; i++) {
      values[i] = parseInt(values[i]);
    }
  }

  var colorString = void 0;

  if (type.indexOf('hsl') > -1) {
    colorString = color.type + '(' + values[0] + ', ' + values[1] + '%, ' + values[2] + '%';
  } else {
    colorString = color.type + '(' + values[0] + ', ' + values[1] + ', ' + values[2];
  }

  if (values.length === 4) {
    colorString += ', ' + color.values[3] + ')';
  } else {
    colorString += ')';
  }

  return colorString;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
function convertHexToRGB(color) {
  if (color.length === 4) {
    var extendedColor = '#';
    for (var i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    color = extendedColor;
  }

  var values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16)
  };

  return 'rgb(' + values.r + ', ' + values.g + ', ' + values.b + ')';
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values and color names.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {{type: string, values: number[]}} A MUI color object
 */
function decomposeColor(color) {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  var marker = color.indexOf('(');
  var type = color.substring(0, marker);
  var values = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map(function (value) {
    return parseFloat(value);
  });

  return { type: type, values: values };
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21 with 2 digit precision.
 */
function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  var contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

  return Number(contrastRatio.toFixed(2)); // Truncate at two digits
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
function getLuminance(color) {
  color = decomposeColor(color);

  if (color.type.indexOf('rgb') > -1) {
    var rgb = color.values.map(function (val) {
      val /= 255; // normalized
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)); // Truncate at 3 digits
  } else if (color.type.indexOf('hsl') > -1) {
    return color.values[2] / 100;
  }
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function emphasize(color) {
  var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;

  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function fade(color, value) {
  color = decomposeColor(color);
  value = clamp(value, 0, 1);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  color.values[3] = value;

  return convertColorToString(color);
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient, 0, 1);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i++) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return convertColorToString(color);
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient, 0, 1);

  if (color.type.indexOf('hsl') > -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') > -1) {
    for (var i = 0; i < 3; i++) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  }

  return convertColorToString(color);
}
},{}],126:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-bottom-nav{\n    background-color: ' + theme.background.paper + ';\n  }\n\n  .mu-bottom-nav-shift{\n    background-color: ' + theme.primary + ';\n  }\n  .mu-bottom-item {\n    color: ' + theme.text.secondary + ';\n  }\n  .mu-bottom-nav-shift .mu-bottom-item {\n    color: ' + (0, _colorManipulator.fade)(theme.text.alternate, 0.7) + ';\n  }\n  .mu-bottom-item-active .mu-bottom-item-icon,\n  .mu-bottom-item-active .mu-bottom-item-text {\n    color: ' + theme.primary + ';\n  }\n  .mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-icon,\n  .mu-bottom-nav-shift .mu-bottom-item-active .mu-bottom-item-text {\n    color: ' + theme.text.alternate + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],124:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n    .mu-bottom-sheet {\n      background-color: " + theme.background.paper + ";\n    }\n  ";
};
},{}],127:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-breadcrumbs-item {\n    color: " + theme.primary + ";\n  }\n  .mu-breadcrumbs-item.is-disbaled {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-breadcrumbs-divider {\n    color: " + theme.text.disabled + ";\n  }\n  ";
};
},{}],128:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-raised-button {\n    background-color: ' + theme.background.paper + ';\n    color: ' + theme.text.primary + ';\n  }\n  .mu-raised-button.hover .mu-button-wrapper {\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.1) + ';\n  }\n  .mu-raised-button.mu-inverse.hover  .mu-button-wrapper {\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.alternate, 0.3) + ';\n  }\n  .mu-raised-button.disabled{\n    color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.3) + ';\n    background-color: ' + (0, _colorManipulator.darken)(theme.text.alternate, 0.1) + ';\n  }\n  .mu-flat-button {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-flat-button.mu-primary-color {\n    color: ' + theme.primary + ';\n  }\n  .mu-flat-button.mu-secondary-color {\n    color: ' + theme.secondary + ';\n  }\n  .mu-flat-button.mu-success-color {\n    color: ' + theme.success + ';\n  }\n  .mu-flat-button.mu-warning-color {\n    color: ' + theme.warning + ';\n  }\n  .mu-flat-button.mu-info-color {\n    color: ' + theme.info + ';\n  }\n  .mu-flat-button.mu-error-color {\n    color: ' + theme.error + ';\n  }\n  .mu-flat-button.hover {\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.1) + ';\n  }\n  .mu-flat-button.disabled {\n    color: ' + theme.text.disabled + ';\n  }\n  .mu-flat-button .mu-circle-ripple {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-icon-button {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-icon-button .mu-circle-ripple{\n    color: ' + theme.text.primary + ';\n  }\n  .mu-icon-button.mu-primary-color {\n    color: ' + theme.primary + ';\n  }\n  .mu-icon-button.mu-secondary-color {\n    color: ' + theme.secondary + ';\n  }\n  .mu-icon-button.mu-success-color {\n    color: ' + theme.success + ';\n  }\n  .mu-icon-button.mu-warning-color {\n    color: ' + theme.warning + ';\n  }\n  .mu-icon-button.mu-info-color {\n    color: ' + theme.info + ';\n  }\n  .mu-icon-button.mu-error-color {\n    color: ' + theme.error + ';\n  }\n  .mu-icon-button.disabled {\n    color: ' + theme.text.disabled + ';\n  }\n  .mu-fab-button {\n    background-color: ' + theme.primary + ';\n    color: ' + theme.text.alternate + ';\n  }\n  .mu-fab-button.hover .mu-button-wrapper,\n  .mu-fab-button:active .mu-button-wrapper {\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.alternate, 0.3) + ';\n  }\n  .mu-fab-button.disabled {\n    color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.3) + ';\n    background-color: ' + (0, _colorManipulator.darken)(theme.text.alternate, 0.1) + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],130:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n    .mu-card {\n      background-color: ' + theme.background.paper + ';\n    }\n    .mu-card-header-title .mu-card-title{\n      color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.87) + ';\n    }\n    .mu-card-header-title .mu-card-sub-title{\n      color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.57) + ';\n    }\n    .mu-card-text{\n      color: ' + theme.text.primary + ';\n    }\n    .mu-card-title-container .mu-card-title{\n      color: ' + theme.text.primary + ';\n    }\n    .mu-card-title-container .mu-card-sub-title {\n      color: ' + theme.text.secondary + ';\n    }\n  ';
};
},{"../utils/colorManipulator":167}],129:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck {\n    color: " + theme.primary + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck.mu-secondary-text-color {\n    color: " + theme.secondary + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck.mu-success-text-color {\n    color: " + theme.success + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck.mu-warning-text-color {\n    color: " + theme.warning + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck.mu-info-text-color {\n    color: " + theme.info + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-icon-uncheck.mu-error-text-color {\n    color: " + theme.error + ";\n  }\n  .mu-checkbox input[type=\"checkbox\"]:checked + .mu-checkbox-wrapper .mu-checkbox-ripple-wrapper {\n    color: " + theme.primary + ";\n  }\n  .mu-checkbox-label {\n    color: " + theme.text.primary + ";\n  }\n  .mu-checkbox.disabled .mu-checkbox-label {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-checkbox.disabled .mu-checkbox-icon-uncheck {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-checkbox-icon-uncheck {\n    color: " + theme.text.secondary + ";\n  }\n  .mu-checkbox.disabled .mu-checkbox-icon-checked {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-checkbox-icon-checked {\n    color: " + theme.primary + ";\n  }\n  ";
};
},{}],131:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-chip {\n    background-color: ' + theme.background.chip + ';\n    color: ' + theme.text.primary + ';\n  }\n  .mu-chip:hover .mu-chip-delete-icon{\n    color: ' + (0, _colorManipulator.fade)((0, _colorManipulator.fade)(theme.text.primary, 0.26), 0.4) + ';\n  }\n  .mu-chip-delete-icon{\n    color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.26) + ';\n  }\n  .mu-chip:active,\n  .mu-chip:focus,\n  .mu-chip.is-deletable {\n    background-color: ' + (0, _colorManipulator.emphasize)(theme.background.chip, 0.08) + ';\n  }\n  .mu-chip:hover{\n    background-color: ' + (0, _colorManipulator.emphasize)(theme.background.chip, 0.08) + ';\n  }\n  .mu-chip.mu-primary-color {\n    background-color: ' + theme.primary + ';\n  }\n  .mu-chip.mu-secondary-color {\n    background-color: ' + theme.secondary + ';\n  }\n  .mu-chip.mu-success-color {\n    background-color: ' + theme.success + ';\n  }\n  .mu-chip.mu-warning-color {\n    background-color: ' + theme.warning + ';\n  }\n  .mu-chip.mu-info-color {\n    background-color: ' + theme.info + ';\n  }\n  .mu-chip.mu-error-color {\n    background-color: ' + theme.error + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],132:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-dialog {\n    background-color: ' + theme.background.paper + ';\n  }\n  .mu-dialog-scrollable .mu-dialog-title {\n    border-bottom-color: ' + theme.divider + ';\n  }\n  .mu-dialog-scrollable .mu-dialog-actions {\n    border-top-color: ' + theme.divider + ';\n  }\n  .mu-dialog-title {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-dialog-body {\n    color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.6) + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],134:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-divider {\n    background-color: " + theme.divider + ";\n  }\n  ";
};
},{}],133:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-drawer {\n    background-color: " + theme.background.paper + ";\n  }\n  ";
};
},{}],135:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-grid-tile-title-container{\n    color: " + theme.text.alternate + ";\n  }\n  .mu-grid-tile-action .mu-icon {\n    color: " + theme.text.alternate + ";\n  }\n  ";
};
},{}],136:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-item-wrapper.hover {\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.1) + ';\n  }\n  .mu-item {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-item.is-selected {\n    color: ' + theme.primary + ';\n  }\n  .mu-item-sub-title {\n    color: ' + theme.text.secondary + ';\n  }\n  .mu-item-after-text {\n   color: ' + theme.text.secondary + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],137:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-paper {\n    color: " + theme.text.primary + ";\n    background-color: " + theme.background.paper + ";\n  }\n  ";
};
},{}],138:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-popover{\n    background: " + theme.background.paper + ";\n  }\n  ";
};
},{}],139:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-linear-progress.mu-secondary-color .mu-linear-progress-background,\n  .mu-linear-progress.mu-secondary-color .mu-linear-progress-indeterminate,\n  .mu-linear-progress.mu-secondary-color .mu-linear-progress-determinate {\n    background-color: " + theme.secondary + ";\n  }\n  .mu-linear-progress.mu-success-color .mu-linear-progress-background,\n  .mu-linear-progress.mu-success-color .mu-linear-progress-indeterminate,\n  .mu-linear-progress.mu-success-color .mu-linear-progress-determinate {\n    background-color: " + theme.success + ";\n  }\n  .mu-linear-progress.mu-warning-color .mu-linear-progress-background,\n  .mu-linear-progress.mu-warning-color .mu-linear-progress-indeterminate,\n  .mu-linear-progress.mu-warning-color .mu-linear-progress-determinate {\n    background-color: " + theme.warning + ";\n  }\n  .mu-linear-progress.mu-info-color .mu-linear-progress-background,\n  .mu-linear-progress.mu-info-color .mu-linear-progress-indeterminate,\n  .mu-linear-progress.mu-info-color .mu-linear-progress-determinate {\n    background-color: " + theme.info + ";\n  }\n  .mu-linear-progress.mu-error-color .mu-linear-progress-background,\n  .mu-linear-progress.mu-error-color .mu-linear-progress-indeterminate,\n  .mu-linear-progress.mu-error-color .mu-linear-progress-determinate {\n    background-color: " + theme.error + ";\n  }\n  .mu-linear-progress-background {\n    background-color: " + theme.primary + ";\n  }\n  .mu-linear-progress-indeterminate{\n    background-color: " + theme.primary + ";\n  }\n  .mu-linear-progress-determinate{\n    background-color: " + theme.primary + ";\n  }\n  .mu-circle-spinner {\n    border-color: " + theme.primary + ";\n  }\n  .mu-circle-spinner.mu-secondary-color {\n    border-color: " + theme.secondary + ";\n  }\n  .mu-circular-progress.mu-secondary-color .mu-circular-progress-determinate-path {\n    stroke: " + theme.secondary + ";\n  }\n  .mu-circle-spinner.mu-success-color {\n    border-color: " + theme.success + ";\n  }\n  .mu-circular-progress.mu-success-color .mu-circular-progress-determinate-path {\n    stroke: " + theme.success + ";\n  }\n  .mu-circle-spinner.mu-warning-color {\n    border-color: " + theme.warning + ";\n  }\n  .mu-circular-progress.mu-warning-color .mu-circular-progress-determinate-path {\n    stroke: " + theme.warning + ";\n  }\n  .mu-circle-spinner.mu-info-color {\n    border-color: " + theme.info + ";\n  }\n  .mu-circular-progress.mu-info-color .mu-circular-progress-determinate-path {\n    stroke: " + theme.info + ";\n  }\n  .mu-circle-spinner.mu-error-color {\n    border-color: " + theme.error + ";\n  }\n  .mu-circular-progress.mu-error-color .mu-circular-progress-determinate-path {\n    stroke: " + theme.error + ";\n  }\n  .mu-circular-progress-determinate-path{\n    stroke: " + theme.primary + ";\n  }\n  ";
};
},{}],140:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-radio input[type=\"radio\"]:checked + .mu-radio-wrapper .mu-radio-icon-uncheck{\n    color: " + theme.primary + ";\n  }\n  .mu-radio input[type=\"radio\"]:checked + .mu-radio-wrapper .mu-radio-ripple-wrapper {\n    color: " + theme.primary + ";\n  }\n  .mu-radio.disabled .mu-radio-label {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-radio-label {\n    color: " + theme.text.primary + ";\n  }\n  .mu-radio.disabled .mu-radio-icon-uncheck {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-radio-icon-uncheck {\n    color: " + theme.text.secondary + ";\n  }\n  .mu-radio.disabled .mu-radio-icon-checked {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-radio-icon-checked {\n    color: " + theme.primary + ";\n  }\n  ";
};
},{}],141:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-select-content {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-select-input {\n    color: ' + theme.text.primary + ';\n  }\n  .mu-selection-text.is-active {\n    color: ' + theme.primary + ';\n  }\n  .mu-select-no-data {\n    color: ' + theme.text.disabled + ';\n  }\n  .mu-option.is-selected .mu-item {\n    color: ' + theme.secondary + ';\n  }\n  .mu-option.is-focused {\n    color: ' + theme.secondary + ';\n    background-color: ' + (0, _colorManipulator.fade)(theme.text.primary, 0.1) + ';\n  }\n  .mu-option.is-disabled .mu-item {\n    color: ' + theme.text.disabled + ';\n  }\n  ';
};
},{"../utils/colorManipulator":167}],142:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-slider-display-value {\n    background-color: " + theme.primary + ";\n  }\n  .mu-slider-track{\n    background-color: " + theme.track + ";\n  }\n  .mu-slider-fill{\n    background-color: " + theme.primary + ";\n  }\n  .mu-slider.disabled .mu-slider-fill {\n    background-color: " + theme.track + ";\n  }\n  .mu-slider-thumb {\n    background-color: " + theme.primary + ";\n    color: " + theme.primary + ";\n  }\n  .mu-slider.zero .mu-slider-thumb,\n  .mu-slider.disabled .mu-slider-thumb{\n    border-color: " + theme.track + ";\n    color: " + theme.track + ";\n    background-color: " + theme.text.alternate + ";\n  }\n  ";
};
},{}],143:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-snackbar {\n    color: " + theme.text.alternate + ";\n    background-color: " + theme.text.primary + ";\n  }\n  ";
};
},{}],144:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-step-label {\n    color: " + theme.text.primary + ";\n  }\n  .mu-step-label.disabled {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-step-label.completed .mu-step-label-icon,\n  .mu-step-label.active .mu-step-label-icon {\n    color: " + theme.primary + ";\n  }\n  .mu-step-label-circle {\n    color: " + theme.text.alternate + ";\n  }\n  .mu-step-label.completed .mu-step-label-circle,\n  .mu-step-label.active .mu-step-label-circle {\n    background-color: " + theme.primary + ";\n  }\n  ";
};
},{}],145:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-sub-header {\n    color: " + theme.text.secondary + ";\n  }\n  ";
};
},{}],146:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-switch input[type=\"checkbox\"]:checked + .mu-switch-wrapper  .mu-switch-track {\n    background-color: " + theme.primary + ";\n  }\n  .mu-switch input[type=\"checkbox\"]:checked + .mu-switch-wrapper .mu-switch-thumb{\n    background-color: " + theme.primary + ";\n    color: " + theme.primary + ";\n  }\n  .mu-switch.disabled input[type=\"checkbox\"]:checked + .mu-switch-wrapper .mu-switch-track{\n    background-color: " + theme.track + ";\n  }\n  .mu-switch.disabled .mu-switch-label {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-switch-label {\n    color: " + theme.text.primary + ";\n  }\n  .mu-switch.disabled .mu-switch-track{\n    background-color: " + theme.track + ";\n  }\n  .mu-switch-track {\n    background-color: " + theme.track + ";\n  }\n  .mu-switch-thumb {\n    background-color: " + theme.background.default + ";\n  }\n  ";
};
},{}],147:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorManipulator = require('../utils/colorManipulator');

exports.default = function (theme) {
  return '\n  .mu-tabs {\n    background-color: ' + theme.primary + ';\n    color: ' + (0, _colorManipulator.fade)(theme.text.alternate, 0.7) + ';\n  }\n  .mu-tabs.mu-inverse {\n    color: ' + (0, _colorManipulator.fade)('#fff', 0.7) + ';\n  }\n  .mu-tabs.mu-tabs-inverse {\n    background-color: ' + theme.background.paper + ';\n    color: ' + theme.text.secondary + ';\n  }\n  .mu-tabs.mu-primary-text-color .mu-tab-active {\n    color: ' + theme.primary + ';\n  }\n  .mu-tabs.mu-secondary-text-color .mu-tab-active {\n    color: ' + theme.secondary + ';\n  }\n  .mu-tabs.mu-success-text-color .mu-tab-active {\n    color: ' + theme.success + ';\n  }\n  .mu-tabs.mu-warning-text-color .mu-tab-active {\n    color: ' + theme.warning + ';\n  }\n  .mu-tabs.mu-info-text-color .mu-tab-active {\n    color: ' + theme.info + ';\n  }\n  .mu-tabs.mu-error-text-color .mu-tab-active {\n    color: ' + theme.error + ';\n  }\n  .mu-tab-link-highlight{\n    background-color: ' + theme.secondary + ';\n  }\n  .mu-tab-active{\n    color: #fff;\n  }\n  ';
};
},{"../utils/colorManipulator":167}],148:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-input {\n    color: " + theme.text.secondary + ";\n  }\n  .mu-input.focus-state {\n    color: " + theme.primary + ";\n  }\n  .mu-input.error {\n    color: " + theme.error + ";\n  }\n  .mu-input.disabled .mu-input-content {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-input-help {\n    color: " + theme.text.secondary + ";\n  }\n  .mu-input.error .mu-input-help {\n    color: " + theme.error + ";\n  }\n  .mu-input.has-label .mu-input-label.float {\n    color: " + theme.text.disabled + ";\n  }\n  .mu-input-line {\n    background-color: " + theme.divider + ";\n  }\n  .mu-input-line.disabled{\n    border-bottom-color: " + theme.text.disabled + ";\n  }\n  .mu-input-focus-line {\n    background-color: " + theme.primary + ";\n  }\n  .mu-input-focus-line.error {\n    background-color: " + theme.error + ";\n  }\n  .mu-text-field-input {\n    color: " + theme.text.primary + ";\n  }\n  .mu-text-field-suffix {\n    color: " + theme.text.secondary + ";\n  }\n  ";
};
},{}],149:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n  .mu-primary-color {\n    background-color: " + theme.primary + ";\n  }\n  .mu-secondary-color {\n    background-color: " + theme.secondary + ";\n  }\n  .mu-success-color {\n    background-color: " + theme.success + ";\n  }\n  .mu-warning-color {\n    background-color: " + theme.warning + ";\n  }\n  .mu-info-color {\n    background-color: " + theme.info + ";\n  }\n  .mu-error-color {\n    background-color: " + theme.error + ";\n  }\n  .mu-inverse {\n    color: #fff;\n  }\n  .mu-primary-text-color {\n    color: " + theme.primary + ";\n  }\n  .mu-secondary-text-color {\n    color: " + theme.secondary + ";\n  }\n  .mu-success-text-color {\n    color: " + theme.success + ";\n  }\n  .mu-warning-text-color {\n    color: " + theme.warning + ";\n  }\n  .mu-info-text-color {\n    color: " + theme.info + ";\n  }\n  .mu-error-text-color {\n    color: " + theme.error + ";\n  }\n  ";
};
},{}],150:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  primary: Colors.blue,
  secondary: Colors.pinkA200,
  success: Colors.green,
  warning: Colors.yellow600,
  info: Colors.blue,
  error: Colors.red,
  track: Colors.grey400,
  text: {
    primary: Colors.darkBlack,
    secondary: Colors.lightBlack,
    alternate: Colors.white,
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: Colors.faintBlack,
  background: {
    paper: Colors.white,
    chip: Colors.grey300,
    default: Colors.grey50
  }
};
},{"./colors":170}],151:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  primary: Colors.blue700,
  secondary: Colors.pinkA200,
  success: Colors.green,
  warning: Colors.yellow600,
  info: Colors.blue,
  error: Colors.red,
  track: Colors.grey600,
  text: {
    primary: Colors.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    alternate: '#303030',
    disabled: 'rgba(255, 255, 255, 0.3)',
    hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
  },
  divider: 'rgba(255, 255, 255, 0.3)',
  background: {
    paper: Colors.grey800,
    chip: Colors.grey700,
    default: '#303030'
  }
};
},{"./colors":170}],40:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _baseTheme = require('./baseTheme');

var _baseTheme2 = _interopRequireDefault(_baseTheme);

var _theme = require('../AppBar/theme');

var _theme2 = _interopRequireDefault(_theme);

var _theme3 = require('../Avatar/theme');

var _theme4 = _interopRequireDefault(_theme3);

var _theme5 = require('../Badge/theme');

var _theme6 = _interopRequireDefault(_theme5);

var _theme7 = require('../BottomNav/theme');

var _theme8 = _interopRequireDefault(_theme7);

var _theme9 = require('../BottomSheet/theme');

var _theme10 = _interopRequireDefault(_theme9);

var _theme11 = require('../Breadcrumbs/theme');

var _theme12 = _interopRequireDefault(_theme11);

var _theme13 = require('../Button/theme');

var _theme14 = _interopRequireDefault(_theme13);

var _theme15 = require('../Card/theme');

var _theme16 = _interopRequireDefault(_theme15);

var _theme17 = require('../Checkbox/theme');

var _theme18 = _interopRequireDefault(_theme17);

var _theme19 = require('../Chip/theme');

var _theme20 = _interopRequireDefault(_theme19);

var _theme21 = require('../Dialog/theme');

var _theme22 = _interopRequireDefault(_theme21);

var _theme23 = require('../Divider/theme');

var _theme24 = _interopRequireDefault(_theme23);

var _theme25 = require('../Drawer/theme');

var _theme26 = _interopRequireDefault(_theme25);

var _theme27 = require('../GridList/theme');

var _theme28 = _interopRequireDefault(_theme27);

var _theme29 = require('../List/theme');

var _theme30 = _interopRequireDefault(_theme29);

var _theme31 = require('../Paper/theme');

var _theme32 = _interopRequireDefault(_theme31);

var _theme33 = require('../Popover/theme');

var _theme34 = _interopRequireDefault(_theme33);

var _theme35 = require('../Progress/theme');

var _theme36 = _interopRequireDefault(_theme35);

var _theme37 = require('../Radio/theme');

var _theme38 = _interopRequireDefault(_theme37);

var _theme39 = require('../Select/theme');

var _theme40 = _interopRequireDefault(_theme39);

var _theme41 = require('../Slider/theme');

var _theme42 = _interopRequireDefault(_theme41);

var _theme43 = require('../Snackbar/theme');

var _theme44 = _interopRequireDefault(_theme43);

var _theme45 = require('../Stepper/theme');

var _theme46 = _interopRequireDefault(_theme45);

var _theme47 = require('../SubHeader/theme');

var _theme48 = _interopRequireDefault(_theme47);

var _theme49 = require('../Switch/theme');

var _theme50 = _interopRequireDefault(_theme49);

var _theme51 = require('../Tabs/theme');

var _theme52 = _interopRequireDefault(_theme51);

var _theme53 = require('../TextField/theme');

var _theme54 = _interopRequireDefault(_theme53);

var _colorTheme = require('./colorTheme');

var _colorTheme2 = _interopRequireDefault(_colorTheme);

var _light = require('./light');

var _light2 = _interopRequireDefault(_light);

var _dark = require('./dark');

var _dark2 = _interopRequireDefault(_dark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = [_baseTheme2.default, _theme2.default, _theme4.default, _theme6.default, _theme8.default, _theme10.default, _theme12.default, _theme14.default, _theme16.default, _theme18.default, _theme20.default, _theme22.default, _theme24.default, _theme26.default, _theme28.default, _theme42.default, _theme30.default, _theme32.default, _theme34.default, _theme36.default, _theme38.default, _theme44.default, _theme40.default, _theme46.default, _theme48.default, _theme50.default, _theme52.default, _theme54.default, _colorTheme2.default];

var vars = {
  light: _light2.default,
  dark: _dark2.default
};

function getThemeStyle() {
  var themeId = 'muse-theme';
  var styleEl = document.getElementById(themeId);
  if (styleEl) return styleEl;
  styleEl = document.createElement('style');
  styleEl.id = themeId;
  document.body.appendChild(styleEl);
  return styleEl;
}

exports.default = {
  add: function add(name) {
    var varObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'light';

    var theme = (0, _extends3.default)({}, vars[extend], varObj);
    vars[name] = theme;
    return this;
  },
  use: function use(name) {
    var themeEl = getThemeStyle();
    themeEl.innerHTML = themes.map(function (theme) {
      return theme(vars[name]);
    }).join(' ');
  }
};
},{"babel-runtime/helpers/extends":203,"./baseTheme":121,"../AppBar/theme":123,"../Avatar/theme":122,"../Badge/theme":125,"../BottomNav/theme":126,"../BottomSheet/theme":124,"../Breadcrumbs/theme":127,"../Button/theme":128,"../Card/theme":130,"../Checkbox/theme":129,"../Chip/theme":131,"../Dialog/theme":132,"../Divider/theme":134,"../Drawer/theme":133,"../GridList/theme":135,"../List/theme":136,"../Paper/theme":137,"../Popover/theme":138,"../Progress/theme":139,"../Radio/theme":140,"../Select/theme":141,"../Slider/theme":142,"../Snackbar/theme":143,"../Stepper/theme":144,"../SubHeader/theme":145,"../Switch/theme":146,"../Tabs/theme":147,"../TextField/theme":148,"./colorTheme":149,"./light":150,"./dark":151}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./styles/base.less');

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _AppBar = require('./AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _BottomNav = require('./BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _BottomSheet = require('./BottomSheet');

var _BottomSheet2 = _interopRequireDefault(_BottomSheet);

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Chip = require('./Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _GridList = require('./GridList');

var _GridList2 = _interopRequireDefault(_GridList);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Paper = require('./Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Snackbar = require('./Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Stepper = require('./Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

var _SubHeader = require('./SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

require('./styles/theme.less');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MuseUI(Vue) {
  [_Alert2.default, _AppBar2.default, _Avatar2.default, _Badge2.default, _BottomNav2.default, _BottomSheet2.default, _Breadcrumbs2.default, _Button2.default, _Card2.default, _Checkbox2.default, _Chip2.default, _DatePicker2.default, _Dialog2.default, _Divider2.default, _Drawer2.default, _GridList2.default, _Icon2.default, _List2.default, _Menu2.default, _Paper2.default, _Popover2.default, _Progress2.default, _Radio2.default, _Select2.default, _Slider2.default, _Snackbar2.default, _Stepper2.default, _SubHeader2.default, _Switch2.default, _Tabs2.default, _TextField2.default, _TimePicker2.default, _Tooltip2.default].forEach(function (component) {
    Vue.use(component);
  });
}

MuseUI.theme = _theme2.default;
exports.default = MuseUI;
},{"./styles/base.less":5,"./Alert":8,"./AppBar":9,"./Avatar":10,"./Badge":11,"./BottomNav":12,"./BottomSheet":13,"./Breadcrumbs":14,"./Button":19,"./Card":15,"./Checkbox":16,"./Chip":17,"./DatePicker":33,"./Dialog":18,"./Divider":20,"./Drawer":21,"./GridList":22,"./Icon":23,"./List":25,"./Menu":24,"./Paper":26,"./Popover":27,"./Progress":34,"./Radio":28,"./Select":35,"./Slider":30,"./Snackbar":29,"./Stepper":32,"./SubHeader":31,"./Switch":37,"./Tabs":36,"./TextField":39,"./TimePicker":41,"./Tooltip":38,"./styles/theme.less":6,"./theme":40}],193:[function(require,module,exports) {
var Vue // late bind
var version
var map = (window.__VUE_HOT_MAP__ = Object.create(null))
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }
  
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cahced together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }
      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],3:[function(require,module,exports) {
;(function () {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    data: function data() {
      return {
        open: false,
        alert: true,
        checkbox1: [],
        slider: 10,
        checkbox2: true,
        switch1: true,
        radio1: '',
        alertMsg: 'every thing is disabled'
      };
    },

    methods: {
      closeAlert: function closeAlert() {
        this.alert = false;
      }
    }
  };
})();
if (module.exports.__esModule) module.exports = module.exports.default;
var __vue__options__ = typeof module.exports === "function" ? module.exports.options : module.exports;
if (__vue__options__.functional) {
  console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.");
}
__vue__options__.render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticStyle: { "padding": "32px" } }, [_c('mu-paper', { staticStyle: { "display": "inline-block" }, attrs: { "zDepth": 2 } }, [_c('mu-date-picker', { attrs: { "maxDate": new Date() } })], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-paper', { staticStyle: { "display": "inline-block" }, attrs: { "zDepth": 2 } }, [_c('mu-time-picker', { attrs: { "format": "24hr" } })], 1), _vm._v(" "), _c('mu-select', { attrs: { "placeholder": "圆圆圆圆", "multiple": "", "label": "选择框" }, scopedSlots: _vm._u([{ key: "selection", fn: function fn(scope) {
        return _c('mu-chip', { attrs: { "color": "teal", "selected": scope.selected } }, [_vm._v("\n        " + _vm._s(scope.label) + "\n      ")]);
      } }]) }, [_c('mu-option', { attrs: { "value": "1", "label": "嘻嘻嘻1" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "2", "label": "嘻嘻嘻2" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "3", "label": "嘻嘻嘻3" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "4", "label": "嘻嘻嘻4" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "33", "label": "嘻嘻嘻1" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "42", "label": "嘻嘻嘻2" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "5", "label": "嘻嘻嘻3" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "6", "label": "嘻嘻嘻4" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "7", "label": "嘻嘻嘻1" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "8", "label": "嘻嘻嘻2" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "9", "label": "嘻嘻嘻3" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "10", "label": "嘻嘻嘻4" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "11", "label": "嘻嘻嘻11" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "12", "label": "嘻嘻嘻21" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "13", "label": "嘻嘻嘻31" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "14", "label": "嘻嘻嘻41" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "15", "label": "嘻嘻嘻11" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "16", "label": "嘻嘻嘻21" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "17", "label": "嘻嘻嘻31" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "18", "label": "嘻嘻嘻41" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "19", "label": "嘻嘻嘻11" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "20", "label": "嘻嘻嘻21" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "21", "label": "嘻嘻嘻31" } }), _vm._v(" "), _c('mu-option', { attrs: { "value": "22", "label": "嘻嘻嘻41" } })], 1), _vm._v(" "), _c('mu-text-field', { attrs: { "placeholder": "h啊哈哈哈", "full-width": "", "name": "teal-phone", "multi-line": "", "rows": 3, "rows-max": 6, "max-length": "300", "helpText": "错误啦啦啦啦", "label": "Test Input" }, model: { value: _vm.alertMsg, callback: function callback($$v) {
        _vm.alertMsg = $$v;
      }, expression: "alertMsg" } }), _vm._v(" "), _c('mu-text-field', { attrs: { "placeholder": "h啊哈哈哈", "disabled": "", "icon": "phone", "max-length": "8", "helpText": "错误啦啦啦啦", "label": "Test Input", "type": "text", "action-icon": "arrow_drop_down", "action-click": _vm.closeAlert } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" " + _vm._s(_vm.checkbox1) + "\n    "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-checkbox', { attrs: { "label": "嘻嘻嘻1", "name": "xixi", "value": "vava" }, model: { value: _vm.checkbox1, callback: function callback($$v) {
        _vm.checkbox1 = $$v;
      }, expression: "checkbox1" } }), _vm._v(" "), _c('mu-checkbox', { attrs: { "label": "嘻嘻嘻2", "disabled": "", "name": "xixi", "value": "baba" }, model: { value: _vm.checkbox1, callback: function callback($$v) {
        _vm.checkbox1 = $$v;
      }, expression: "checkbox1" } }), _vm._v(" "), _c('mu-checkbox', { attrs: { "label": "嘻嘻嘻3", "name": "xixi", "value": "caca" }, model: { value: _vm.checkbox1, callback: function callback($$v) {
        _vm.checkbox1 = $$v;
      }, expression: "checkbox1" } }), _vm._v(" "), _c('mu-checkbox', { attrs: { "label": "嘻嘻嘻4", "name": "xixi", "value": "dada" }, model: { value: _vm.checkbox1, callback: function callback($$v) {
        _vm.checkbox1 = $$v;
      }, expression: "checkbox1" } }), _vm._v(" "), _c('mu-checkbox', { attrs: { "label": String(_vm.checkbox2) }, model: { value: _vm.checkbox2, callback: function callback($$v) {
        _vm.checkbox2 = $$v;
      }, expression: "checkbox2" } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-radio', { attrs: { "label": "嘻嘻嘻1", "value": "vava" }, model: { value: _vm.radio1, callback: function callback($$v) {
        _vm.radio1 = $$v;
      }, expression: "radio1" } }), _vm._v(" "), _c('mu-radio', { attrs: { "label": "嘻嘻嘻2", "value": "baba" }, model: { value: _vm.radio1, callback: function callback($$v) {
        _vm.radio1 = $$v;
      }, expression: "radio1" } }), _vm._v(" "), _c('mu-radio', { attrs: { "label": "嘻嘻嘻3", "value": "caca" }, model: { value: _vm.radio1, callback: function callback($$v) {
        _vm.radio1 = $$v;
      }, expression: "radio1" } }), _vm._v(" "), _c('mu-radio', { attrs: { "label": "嘻嘻嘻4", "value": "dada" }, model: { value: _vm.radio1, callback: function callback($$v) {
        _vm.radio1 = $$v;
      }, expression: "radio1" } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-switch', { attrs: { "label": String(_vm.switch1) }, model: { value: _vm.switch1, callback: function callback($$v) {
        _vm.switch1 = $$v;
      }, expression: "switch1" } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-slider', { model: { value: _vm.slider, callback: function callback($$v) {
        _vm.slider = $$v;
      }, expression: "slider" } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-alert', { attrs: { "color": "warning", "show": _vm.alert, "delete": "" }, on: { "update:show": function updateShow($event) {
        _vm.alert = $event;
      } } }, [_c('mu-icon', { attrs: { "value": "check_circle" } }), _vm._v(" this is success alert " + _vm._s(_vm.alertMsg) + "\n    ")], 1), _vm._v(" "), _c('mu-appbar', { attrs: { "title": "Hellow World" } }), _vm._v(" "), _c('mu-button', { attrs: { "fab": "", "color": "secondary" } }, [_c('mu-icon', { attrs: { "value": "edit" } })], 1), _vm._v(" "), _c('mu-button', { attrs: { "flat": "", "color": "pink" } }, [_vm._v("OPEN LALALA")]), _vm._v(" "), _c('mu-badge', { attrs: { "content": "12", "circle": "", "color": "warning" } }, [_c('mu-avatar', { attrs: { "color": "primary", "textColor": "yellow" } }, [_vm._v("\n        A\n      ")])], 1), _vm._v(" "), _c('mu-linear-progress', { staticStyle: { "margin": "16px 0" }, attrs: { "value": 80, "color": "teal" } }), _vm._v(" "), _c('mu-circular-progress', { attrs: { "size": 56, "value": 80, "color": "error" } }), _vm._v(" "), _c('mu-button', { attrs: { "color": "warning" }, on: { "click": function click($event) {
        _vm.open = true;
      } } }, [_vm._v("\n      OPEN DIALOG\n    ")]), _vm._v(" "), _c('mu-chip', { attrs: { "delete": "", "color": "error", "text-color": "yellow" } }, [_vm._v("\n      嘻嘻嘻\n    ")]), _vm._v(" "), _c('mu-tabs', { attrs: { "center": "", "fixed": "", "textColor": "success", "indicatorColor": "secondary" } }, [_c('mu-tab', [_c('mu-icon', { attrs: { "value": "info" } }), _vm._v(" TAB 1\n      ")], 1), _vm._v(" "), _c('mu-tab', [_c('mu-icon', { attrs: { "value": "info" } }), _vm._v(" TAB 2\n      ")], 1), _vm._v(" "), _c('mu-tab', [_c('mu-icon', { attrs: { "value": "info" } }), _vm._v(" TAB 77777\n      ")], 1), _vm._v(" "), _c('mu-tab', [_c('mu-icon', { attrs: { "value": "info" } }), _vm._v(" TAB 5\n      ")], 1)], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-menu', [_c('mu-button', { attrs: { "color": "teal" } }, [_vm._v("\n        OPEN MENU\n      ")]), _vm._v(" "), _c('mu-list', { attrs: { "slot": "content" }, slot: "content" }, [_c('mu-list-item', { attrs: { "button": "", "nested": "", "toggleNestedType": "popover", "toggleNested": "" } }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "", "nested": "", "toggleNested": "", "toggleNestedType": "popover" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "", "toggleNestedType": "popover" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈222")])], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "", "toggleNestedType": "popover" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈333")])], 1)], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "", "toggleNestedType": "popover" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1)], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "button": "" } }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "button": "" } }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-snackbar', { attrs: { "position": "top-start", "action": "CLOSE", "action-color": "primary", "message": "I`m myron, I Love wd" }, on: { "action-click": function actionClick($event) {
        _vm.open = false;
      } } }), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-stepper', { attrs: { "activeStep": 1 } }, [_c('mu-step', [_c('mu-step-label', [_vm._v("\n          选择活动地点\n        ")])], 1), _vm._v(" "), _c('mu-step', [_c('mu-step-button', [_vm._v("\n          创建一个群组\n        ")])], 1), _vm._v(" "), _c('mu-step', [_c('mu-step-label', [_vm._v("\n          宣传活动\n        ")])], 1)], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('mu-tooltip', { attrs: { "content": "嘻嘻嘻", "open": "", "placement": "left-start" } }, [_c('mu-button', [_vm._v("Tooltip")])], 1), _vm._v(" "), _c('mu-bottom-nav', [_c('mu-bottom-nav-item', { attrs: { "title": "Movies", "icon": "ondemand_video" } }), _vm._v(" "), _c('mu-bottom-nav-item', { attrs: { "title": "Music", "icon": "music_note" } }), _vm._v(" "), _c('mu-bottom-nav-item', { attrs: { "title": "Books", "icon": "books" } }), _vm._v(" "), _c('mu-bottom-nav-item', { attrs: { "title": "Pictures", "icon": "photo" } })], 1), _vm._v(" "), _c('mu-drawer', { attrs: { "open": _vm.open, "docked": false }, on: { "update:open": function updateOpen($event) {
        _vm.open = $event;
      } } }, [_c('mu-list', { attrs: { "dense": "" } }, [_c('mu-list-item', { attrs: { "nested": "", "toggleNested": "", "button": "", "ripple": false } }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("用户管理")])], 1), _vm._v(" "), _c('mu-list-item-action', [_c('mu-icon', { staticClass: "toggle-icon", attrs: { "value": "keyboard_arrow_down" } })], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("用户总览")])], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("PCC用户")])], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "nested": "", "button": "" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("动态管理")])], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1)], 1), _vm._v(" "), _c('mu-list-item', { attrs: { "slot": "nested", "button": "" }, slot: "nested" }, [_c('mu-list-item-content', [_c('mu-list-item-title', [_vm._v("哈哈哈哈哈哈")])], 1)], 1)], 1)], 1)], 1)], 1)], 1);
};
__vue__options__.staticRenderFns = [];
if (module.hot) {
  (function () {
    var hotAPI = require("vue-hot-reload-api");
    hotAPI.install(require("vue"), true);
    if (!hotAPI.compatible) return;
    module.hot.accept();
    if (!module.hot.data) {
      hotAPI.createRecord("data-v-6d78917c", __vue__options__);
    } else {
      hotAPI.reload("data-v-6d78917c", __vue__options__);
    }
  })();
}
},{"vue-hot-reload-api":193,"vue":43}],2:[function(require,module,exports) {
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _src = require('../src');

var _src2 = _interopRequireDefault(_src);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_src2.default);

var app = new _vue2.default((0, _extends3.default)({}, _App2.default));

app.$mount('#app');
},{"babel-runtime/helpers/extends":203,"vue":43,"../src":4,"./App":3}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(config) {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    },
    data: config && config.hot
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:51669/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id, undefined, {
    hot: true
  });

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])