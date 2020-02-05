'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('jsutils');
var redux = require('redux');
var validator = _interopDefault(require('jsvalidator'));

var responseModel = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
};
var axiosConfig = {};
var getResponse = function getResponse(type) {
  return type && jsutils.get(global, "testMocks.axios.".concat(type, ".response")) || jsutils.get(global, "testMocks.axios.response", responseModel);
};
var getAxiosResponse = function getAxiosResponse(request, type) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var url = jsutils.isStr(request) ? request : jsutils.isObj(request) && request.url;
      var testRes = getResponse(type);
      url ? resolve(testRes) : reject(testRes);
    }, 1);
  });
};
var Axios = jest.fn(function (request) {
  return getAxiosResponse(request);
});
Axios["delete"] = jest.fn(function (request) {
  return getAxiosResponse(request, 'delete');
});
Axios.get = jest.fn(function (request) {
  return getAxiosResponse(request, 'get');
});
Axios.patch = jest.fn(function (request) {
  return getAxiosResponse(request, 'patch');
});
Axios.post = jest.fn(function (request) {
  return getAxiosResponse(request, 'post');
});
Axios.put = jest.fn(function (request) {
  return getAxiosResponse(request, 'put');
});
Axios.trace = jest.fn(function (request) {
  return getAxiosResponse(request, 'trace');
});
Axios.create = jest.fn(function (config) {
  return axiosConfig = jsutils.deepMerge(axiosConfig, config);
});
Axios.getConfig = function () {
  return axiosConfig;
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var appState = {};
var itemsState = {};
var tapState = {};
var app = jest.fn(function () {
  return appState;
});
var items = jest.fn(function () {
  return itemsState;
});
var tap = jest.fn(function () {
  return tapState;
});

var reducers = /*#__PURE__*/Object.freeze({
  app: app,
  items: items,
  tap: tap
});

var appReducers = redux.combineReducers(reducers);
var defStore = redux.createStore(appReducers);
var STATE = defStore.getState();
var setState = function setState(updatedState) {
  return STATE = updatedState;
};
var subscribe = jest.fn(function (subscriber) {
  return defStore.subscribe(subscriber);
});
var getState = jest.fn(function () {
  return defStore.getState();
});
var dispatch = jest.fn(function (action) {
  return defStore.dispatch(action);
});
var STORE = {
  dispatch: dispatch,
  getState: getState,
  subscribe: subscribe
};
var getStore = jest.fn(function () {
  return STORE;
});
var getDispatch = jest.fn(function () {
  return dispatch;
});

var connect = jest.fn(function (mapStateToProps) {
  return function (component) {
    return function (props) {
      return function (compProps) {
        return new component(compProps);
      }(_objectSpread2({}, props, {}, mapStateToProps(STATE)));
    };
  };
});



var index = /*#__PURE__*/Object.freeze({
  connect: connect,
  dispatch: dispatch,
  getDispatch: getDispatch,
  getStore: getStore,
  setState: setState,
  get STATE () { return STATE; },
  STORE: STORE
});

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

var path = require('path');
var fs = require('fs');
var _require = require('jsutils'),
    isObj = _require.isObj,
    mapObj = _require.mapObj;
var resetMocks = path.join('./reset_mocks');
var rootDir = require('app-root-path').path;
var KEG_PATH = path.join(rootDir, 'node_modules/sv-keg');
var BASE_PATH = path.join(KEG_PATH, '/core/base');
var TESTS_FOLDER = '/__tests__/';
var loadFile = function loadFile() {
  try {
    return fs.existsSync(toLoad) ? require(toLoad) : false;
  } catch (e) {
    return false;
  }
};
var buildNoUpdatePaths = function buildNoUpdatePaths() {
  var rootPackageConf = loadFile(path.resolve(rootDir, './package.json')) || {};
  var kegPackageConf = loadFile(path.resolve(KEG_PATH, './package.json')) || {};
  return Object.keys(rootPackageConf.dependencies).concat(Object.keys(rootPackageConf.devDependencies)).concat(Object.keys(kegPackageConf.dependencies)).concat(Object.keys(kegPackageConf.devDependencies));
};
var noPathUpdate = buildNoUpdatePaths();
var findTestFile = function findTestFile(parentMod) {
  return parentMod.filename.indexOf(TESTS_FOLDER) !== -1 ? parentMod.filename : findTestFile(parentMod.parent);
};
var getPath = function getPath(filePath) {
  var parentPath = findTestFile(module.parent);
  var split = parentPath.split('/');
  split.pop();
  return path.resolve(split.join('/'), filePath);
};
var getMockPath = function getMockPath(filePath) {
  return noPathUpdate.indexOf(filePath) !== -1 ? filePath : filePath.indexOf('../') !== 0 ? path.join(BASE_PATH, filePath) : getPath(filePath);
};
var setMocks = function setMocks(toMock, reset) {
  reset && resetMocks();
  isObj(toMock) && mapObj(toMock, function (key, value) {
    jest.setMock(getMockPath(key), value);
  });
};

var resetMocks$1 = function resetMocks() {
  return jest.resetModules();
};

exports.Axios = Axios;
exports.Redux = index;
exports.mockConsole = mockConsole;
exports.resetMocks = resetMocks$1;
exports.setMocks = setMocks;
exports.testArray = testArray;
