'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('jsutils');
var validator = _interopDefault(require('jsvalidator'));

var mockFunc = function mockFunc(data) {
  return data;
};
try {
  mockFunc = jest.fn;
} catch (e) {}

var mockConsole = function mockConsole() {
  var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var getMock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mockFunc;
  if (!jsutils.isArr(names)) {
    console.error('Names must be an array of strings');
    return null;
  }
  if (!jsutils.isFunc(getMock)) {
    console.error('getMock must be a function');
    return null;
  }
  var resetters = names.map(function (name) {
    var originalFn = console[name];
    console[name] = getMock();
    return function () {
      return console[name] = originalFn;
    };
  });
  return function () {
    return resetters.map(function (reset) {
      return reset();
    });
  };
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var testArray = function testArray(tests, fn) {
  tests.forEach(function (val, i) {
    validator.validate(val, {
      type: "object",
      schema: [{
        name: "name",
        type: "string",
        required: true
      }, {
        name: "timeout",
        type: "number"
      }, {
        name: "before",
        type: "function"
      }, {
        name: "after",
        type: "function"
      }, {
        name: "only",
        type: "boolean",
        "default": false
      }, {
        name: "skip",
        type: "boolean",
        "default": false
      }, {
        name: "args",
        type: "any",
        required: true
      }],
      throwOnInvalid: true
    });
    var testAction = val.skip ? it.skip : val.only ? it.only : it;
    jsutils.isFunc(testAction) && testAction(val.name,
    _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var test;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              jsutils.isNum(val.timeout) && timeout(val.timeout);
              if (!jsutils.isFunc(val.args)) {
                _context.next = 7;
                break;
              }
              _context.next = 4;
              return val.args();
            case 4:
              _context.t0 = _context.sent;
              _context.next = 8;
              break;
            case 7:
              _context.t0 = val.args;
            case 8:
              test = _context.t0;
              _context.t1 = jsutils.isFunc(val.before);
              if (!_context.t1) {
                _context.next = 13;
                break;
              }
              _context.next = 13;
              return val.before(test);
            case 13:
              _context.next = 15;
              return fn(test);
            case 15:
              _context.t2 = jsutils.isFunc(val.after);
              if (!_context.t2) {
                _context.next = 19;
                break;
              }
              _context.next = 19;
              return val.after(test);
            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
};

exports.mockConsole = mockConsole;
exports.testArray = testArray;
