// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"../node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"../node_modules/symbol-observable/es/ponyfill.js"}],"../node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;
exports.combineReducers = combineReducers;
exports.bindActionCreators = bindActionCreators;
exports.applyMiddleware = applyMiddleware;
exports.compose = compose;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"../node_modules/symbol-observable/es/index.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/immer/dist/immer.module.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.original = original;
exports.isDraft = isDraft;
exports.isDraftable = isDraftable;
exports.default = exports.immerable = exports.nothing = exports.Immer = exports.applyPatches = exports.setUseProxies = exports.setAutoFreeze = exports.produce = void 0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
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
};

var NOTHING = typeof Symbol !== "undefined" ? Symbol("immer-nothing") : defineProperty({}, "immer-nothing", true);
exports.nothing = NOTHING;
var DRAFTABLE = typeof Symbol !== "undefined" ? Symbol("immer-draftable") : "__$immer_draftable";
exports.immerable = DRAFTABLE;
var DRAFT_STATE = typeof Symbol !== "undefined" ? Symbol("immer-state") : "__$immer_state";

function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}

function isDraftable(value) {
  if (!value || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") return false;
  if (Array.isArray(value)) return true;
  var proto = Object.getPrototypeOf(value);
  if (!proto || proto === Object.prototype) return true;
  return !!value[DRAFTABLE] || !!value.constructor[DRAFTABLE];
}

function original(value) {
  if (value && value[DRAFT_STATE]) {
    return value[DRAFT_STATE].base;
  } // otherwise return undefined

}

var assign = Object.assign || function assign(target, value) {
  for (var key in value) {
    if (has(value, key)) {
      target[key] = value[key];
    }
  }

  return target;
};

var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : typeof Object.getOwnPropertySymbols !== "undefined" ? function (obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : Object.getOwnPropertyNames;

function shallowCopy(base) {
  var invokeGetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (Array.isArray(base)) return base.slice();
  var clone = Object.create(Object.getPrototypeOf(base));
  ownKeys(base).forEach(function (key) {
    if (key === DRAFT_STATE) {
      return; // Never copy over draft state.
    }

    var desc = Object.getOwnPropertyDescriptor(base, key);

    if (desc.get) {
      if (!invokeGetters) {
        throw new Error("Immer drafts cannot have computed properties");
      }

      desc.value = desc.get.call(base);
    }

    if (desc.enumerable) {
      clone[key] = desc.value;
    } else {
      Object.defineProperty(clone, key, {
        value: desc.value,
        writable: true,
        configurable: true
      });
    }
  });
  return clone;
}

function each(value, cb) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      cb(i, value[i], value);
    }
  } else {
    ownKeys(value).forEach(function (key) {
      return cb(key, value[key], value);
    });
  }
}

function isEnumerable(base, prop) {
  return Object.getOwnPropertyDescriptor(base, prop).enumerable;
}

function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop);
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // @ts-check


var descriptors = {}; // For nested produce calls:

var scopes = [];

var currentScope = function currentScope() {
  return scopes[scopes.length - 1];
};

function willFinalize(result, baseDraft, needPatches) {
  var scope = currentScope();
  scope.forEach(function (state) {
    return state.finalizing = true;
  });

  if (result === undefined || result === baseDraft) {
    if (needPatches) markChangesRecursively(baseDraft); // This is faster when we don't care about which attributes changed.

    markChangesSweep(scope);
  }
}

function createDraft(base, parent) {
  var isArray = Array.isArray(base);
  var draft = clonePotentialDraft(base);
  each(draft, function (prop) {
    proxyProperty(draft, prop, isArray || isEnumerable(base, prop));
  }); // See "proxy.js" for property documentation.

  var state = {
    scope: parent ? parent.scope : currentScope(),
    modified: false,
    finalizing: false,
    // es5 only
    finalized: false,
    assigned: {},
    parent: parent,
    base: base,
    draft: draft,
    copy: null,
    revoke: revoke,
    revoked: false // es5 only

  };
  createHiddenProperty(draft, DRAFT_STATE, state);
  state.scope.push(state);
  return draft;
}

function revoke() {
  this.revoked = true;
}

function source(state) {
  return state.copy || state.base;
}

function _get(state, prop) {
  assertUnrevoked(state);
  var value = source(state)[prop]; // Drafts are only created for proxyable values that exist in the base state.

  if (!state.finalizing && value === state.base[prop] && isDraftable(value)) {
    prepareCopy(state);
    return state.copy[prop] = createDraft(value, state);
  }

  return value;
}

function _set(state, prop, value) {
  assertUnrevoked(state);
  state.assigned[prop] = true;

  if (!state.modified) {
    if (is(source(state)[prop], value)) return;
    markChanged(state);
    prepareCopy(state);
  }

  state.copy[prop] = value;
}

function markChanged(state) {
  if (!state.modified) {
    state.modified = true;
    if (state.parent) markChanged(state.parent);
  }
}

function prepareCopy(state) {
  if (!state.copy) state.copy = clonePotentialDraft(state.base);
}

function clonePotentialDraft(base) {
  var state = base && base[DRAFT_STATE];

  if (state) {
    state.finalizing = true;
    var draft = shallowCopy(state.draft, true);
    state.finalizing = false;
    return draft;
  }

  return shallowCopy(base);
}

function proxyProperty(draft, prop, enumerable) {
  var desc = descriptors[prop];

  if (desc) {
    desc.enumerable = enumerable;
  } else {
    descriptors[prop] = desc = {
      configurable: true,
      enumerable: enumerable,
      get: function get$$1() {
        return _get(this[DRAFT_STATE], prop);
      },
      set: function set$$1(value) {
        _set(this[DRAFT_STATE], prop, value);
      }
    };
  }

  Object.defineProperty(draft, prop, desc);
}

function assertUnrevoked(state) {
  if (state.revoked === true) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + JSON.stringify(source(state)));
} // This looks expensive, but only proxies are visited, and only objects without known changes are scanned.


function markChangesSweep(scope) {
  // The natural order of drafts in the `scope` array is based on when they
  // were accessed. By processing drafts in reverse natural order, we have a
  // better chance of processing leaf nodes first. When a leaf node is known to
  // have changed, we can avoid any traversal of its ancestor nodes.
  for (var i = scope.length - 1; i >= 0; i--) {
    var state = scope[i];

    if (state.modified === false) {
      if (Array.isArray(state.base)) {
        if (hasArrayChanges(state)) markChanged(state);
      } else if (hasObjectChanges(state)) markChanged(state);
    }
  }
}

function markChangesRecursively(object) {
  if (!object || (typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") return;
  var state = object[DRAFT_STATE];
  if (!state) return;
  var base = state.base,
      draft = state.draft,
      assigned = state.assigned;

  if (!Array.isArray(object)) {
    // Look for added keys.
    Object.keys(draft).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (base[key] === undefined && !has(base, key)) {
        assigned[key] = true;
        markChanged(state);
      } else if (!assigned[key]) {
        // Only untouched properties trigger recursion.
        markChangesRecursively(draft[key]);
      }
    }); // Look for removed keys.

    Object.keys(base).forEach(function (key) {
      // The `undefined` check is a fast path for pre-existing keys.
      if (draft[key] === undefined && !has(draft, key)) {
        assigned[key] = false;
        markChanged(state);
      }
    });
  } else if (hasArrayChanges(state)) {
    markChanged(state);
    assigned.length = true;

    if (draft.length < base.length) {
      for (var i = draft.length; i < base.length; i++) {
        assigned[i] = false;
      }
    } else {
      for (var _i = base.length; _i < draft.length; _i++) {
        assigned[_i] = true;
      }
    }

    for (var _i2 = 0; _i2 < draft.length; _i2++) {
      // Only untouched indices trigger recursion.
      if (assigned[_i2] === undefined) markChangesRecursively(draft[_i2]);
    }
  }
}

function hasObjectChanges(state) {
  var base = state.base,
      draft = state.draft; // Search for added keys. Start at the back, because non-numeric keys
  // are ordered by time of definition on the object.

  var keys = Object.keys(draft);

  for (var i = keys.length - 1; i >= 0; i--) {
    // The `undefined` check is a fast path for pre-existing keys.
    if (base[keys[i]] === undefined && !has(base, keys[i])) {
      return true;
    }
  } // Since no keys have been added, we can compare lengths to know if an
  // object has been deleted.


  return keys.length !== Object.keys(base).length;
}

function hasArrayChanges(state) {
  var draft = state.draft;
  if (draft.length !== state.base.length) return true; // See #116
  // If we first shorten the length, our array interceptors will be removed.
  // If after that new items are added, result in the same original length,
  // those last items will have no intercepting property.
  // So if there is no own descriptor on the last position, we know that items were removed and added
  // N.B.: splice, unshift, etc only shift values around, but not prop descriptors, so we only have to check
  // the last one

  var descriptor = Object.getOwnPropertyDescriptor(draft, draft.length - 1); // descriptor can be null, but only for newly created sparse arrays, eg. new Array(10)

  if (descriptor && !descriptor.get) return true; // For all other cases, we don't have to compare, as they would have been picked up by the index setters

  return false;
}

function createHiddenProperty(target, prop, value) {
  Object.defineProperty(target, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}

var legacyProxy = Object.freeze({
  scopes: scopes,
  currentScope: currentScope,
  willFinalize: willFinalize,
  createDraft: createDraft
}); // @ts-check
// For nested produce calls:

var scopes$1 = [];

var currentScope$1 = function currentScope() {
  return scopes$1[scopes$1.length - 1];
}; // Do nothing before being finalized.


function willFinalize$1() {}

function createDraft$1(base, parent) {
  var state = {
    // Track which produce call this is associated with.
    scope: parent ? parent.scope : currentScope$1(),
    // True for both shallow and deep changes.
    modified: false,
    // Used during finalization.
    finalized: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned: {},
    // The parent draft state.
    parent: parent,
    // The base state.
    base: base,
    // The base proxy.
    draft: null,
    // Any property proxies.
    drafts: {},
    // The base copy with any updated values.
    copy: null,
    // Called by the `produce` function.
    revoke: null
  };

  var _ref = Array.isArray(base) ? Proxy.revocable([state], arrayTraps) : Proxy.revocable(state, objectTraps),
      revoke = _ref.revoke,
      proxy = _ref.proxy;

  state.draft = proxy;
  state.revoke = revoke;
  state.scope.push(state);
  return proxy;
}

var objectTraps = {
  get: get$1,
  has: function has$$1(target, prop) {
    return prop in source$1(target);
  },
  ownKeys: function ownKeys$$1(target) {
    return Reflect.ownKeys(source$1(target));
  },
  set: set$1,
  deleteProperty: deleteProperty,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  defineProperty: function defineProperty() {
    throw new Error("Object.defineProperty() cannot be used on an Immer draft"); // prettier-ignore
  },
  getPrototypeOf: function getPrototypeOf(target) {
    return Object.getPrototypeOf(target.base);
  },
  setPrototypeOf: function setPrototypeOf() {
    throw new Error("Object.setPrototypeOf() cannot be used on an Immer draft"); // prettier-ignore
  }
};
var arrayTraps = {};
each(objectTraps, function (key, fn) {
  arrayTraps[key] = function () {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});

arrayTraps.deleteProperty = function (state, prop) {
  if (isNaN(parseInt(prop))) {
    throw new Error("Immer only supports deleting array indices"); // prettier-ignore
  }

  return objectTraps.deleteProperty.call(this, state[0], prop);
};

arrayTraps.set = function (state, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop))) {
    throw new Error("Immer only supports setting array indices and the 'length' property"); // prettier-ignore
  }

  return objectTraps.set.call(this, state[0], prop, value);
};

function source$1(state) {
  return state.copy || state.base;
}

function get$1(state, prop) {
  if (prop === DRAFT_STATE) return state;
  var drafts = state.drafts; // Check for existing draft in unmodified state.

  if (!state.modified && has(drafts, prop)) {
    return drafts[prop];
  }

  var value = source$1(state)[prop];
  if (state.finalized || !isDraftable(value)) return value; // Check for existing draft in modified state.

  if (state.modified) {
    // Assigned values are never drafted. This catches any drafts we created, too.
    if (value !== state.base[prop]) return value; // Store drafts on the copy (when one exists).

    drafts = state.copy;
  }

  return drafts[prop] = createDraft$1(value, state);
}

function set$1(state, prop, value) {
  if (!state.modified) {
    // Optimize based on value's truthiness. Truthy values are guaranteed to
    // never be undefined, so we can avoid the `in` operator. Lastly, truthy
    // values may be drafts, but falsy values are never drafts.
    var isUnchanged = value ? is(state.base[prop], value) || value === state.drafts[prop] : is(state.base[prop], value) && prop in state.base;
    if (isUnchanged) return true;
    markChanged$1(state);
  }

  state.assigned[prop] = true;
  state.copy[prop] = value;
  return true;
}

function deleteProperty(state, prop) {
  // The `undefined` check is a fast path for pre-existing keys.
  if (state.base[prop] !== undefined || prop in state.base) {
    state.assigned[prop] = false;
    markChanged$1(state);
  }

  if (state.copy) delete state.copy[prop];
  return true;
}

function getOwnPropertyDescriptor(state, prop) {
  var owner = source$1(state);
  var desc = Reflect.getOwnPropertyDescriptor(owner, prop);

  if (desc) {
    desc.writable = true;
    desc.configurable = !Array.isArray(owner) || prop !== "length";
  }

  return desc;
}

function markChanged$1(state) {
  if (!state.modified) {
    state.modified = true;
    state.copy = assign(shallowCopy(state.base), state.drafts);
    state.drafts = null;
    if (state.parent) markChanged$1(state.parent);
  }
}

var modernProxy = Object.freeze({
  scopes: scopes$1,
  currentScope: currentScope$1,
  willFinalize: willFinalize$1,
  createDraft: createDraft$1
});

function generatePatches(state, basePath, patches, inversePatches) {
  Array.isArray(state.base) ? generateArrayPatches(state, basePath, patches, inversePatches) : generateObjectPatches(state, basePath, patches, inversePatches);
}

function generateArrayPatches(state, basePath, patches, inversePatches) {
  var base = state.base,
      copy = state.copy,
      assigned = state.assigned;
  var minLength = Math.min(base.length, copy.length); // Look for replaced indices.

  for (var i = 0; i < minLength; i++) {
    if (assigned[i] && base[i] !== copy[i]) {
      var path = basePath.concat(i);
      patches.push({
        op: "replace",
        path: path,
        value: copy[i]
      });
      inversePatches.push({
        op: "replace",
        path: path,
        value: base[i]
      });
    }
  } // Did the array expand?


  if (minLength < copy.length) {
    for (var _i = minLength; _i < copy.length; _i++) {
      patches.push({
        op: "add",
        path: basePath.concat(_i),
        value: copy[_i]
      });
    }

    inversePatches.push({
      op: "replace",
      path: basePath.concat("length"),
      value: base.length
    });
  } // ...or did it shrink?
  else if (minLength < base.length) {
      patches.push({
        op: "replace",
        path: basePath.concat("length"),
        value: copy.length
      });

      for (var _i2 = minLength; _i2 < base.length; _i2++) {
        inversePatches.push({
          op: "add",
          path: basePath.concat(_i2),
          value: base[_i2]
        });
      }
    }
}

function generateObjectPatches(state, basePath, patches, inversePatches) {
  var base = state.base,
      copy = state.copy;
  each(state.assigned, function (key, assignedValue) {
    var origValue = base[key];
    var value = copy[key];
    var op = !assignedValue ? "remove" : key in base ? "replace" : "add";
    if (origValue === value && op === "replace") return;
    var path = basePath.concat(key);
    patches.push(op === "remove" ? {
      op: op,
      path: path
    } : {
      op: op,
      path: path,
      value: value
    });
    inversePatches.push(op === "add" ? {
      op: "remove",
      path: path
    } : op === "remove" ? {
      op: "add",
      path: path,
      value: origValue
    } : {
      op: "replace",
      path: path,
      value: origValue
    });
  });
}

function applyPatches(draft, patches) {
  for (var i = 0; i < patches.length; i++) {
    var patch = patches[i];
    var path = patch.path;

    if (path.length === 0 && patch.op === "replace") {
      draft = patch.value;
    } else {
      var base = draft;

      for (var _i3 = 0; _i3 < path.length - 1; _i3++) {
        base = base[path[_i3]];
        if (!base || (typeof base === "undefined" ? "undefined" : _typeof(base)) !== "object") throw new Error("Cannot apply patch, path doesn't resolve: " + path.join("/")); // prettier-ignore
      }

      var key = path[path.length - 1];

      switch (patch.op) {
        case "replace":
        case "add":
          // TODO: add support is not extensive, it does not support insertion or `-` atm!
          base[key] = patch.value;
          break;

        case "remove":
          if (Array.isArray(base)) {
            if (key !== base.length - 1) throw new Error("Only the last index of an array can be removed, index: " + key + ", length: " + base.length); // prettier-ignore

            base.length -= 1;
          } else {
            delete base[key];
          }

          break;

        default:
          throw new Error("Unsupported patch operation: " + patch.op);
      }
    }
  }

  return draft;
}

function verifyMinified() {}

var configDefaults = {
  useProxies: typeof Proxy !== "undefined" && typeof Reflect !== "undefined",
  autoFreeze: typeof process !== "undefined" ? "development" !== "production" : verifyMinified.name === "verifyMinified",
  onAssign: null,
  onDelete: null,
  onCopy: null
};

var Immer = function () {
  function Immer(config) {
    classCallCheck(this, Immer);
    assign(this, configDefaults, config);
    this.setUseProxies(this.useProxies);
    this.produce = this.produce.bind(this);
  }

  createClass(Immer, [{
    key: "produce",
    value: function produce(base, recipe, patchListener) {
      var _this = this; // curried invocation


      if (typeof base === "function" && typeof recipe !== "function") {
        var defaultBase = recipe;
        recipe = base; // prettier-ignore

        return function () {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBase;
          return _this.produce(base, function (draft) {
            var _recipe;

            return (_recipe = recipe).call.apply(_recipe, [draft, draft].concat(args));
          });
        };
      } // prettier-ignore


      {
        if (typeof recipe !== "function") throw new Error("if first argument is not a function, the second argument to produce should be a function");
        if (patchListener !== undefined && typeof patchListener !== "function") throw new Error("the third argument of a producer should not be set or a function");
      }
      var result = void 0; // Only create proxies for plain objects/arrays.

      if (!isDraftable(base)) {
        result = recipe(base);
        if (result === undefined) return base;
      } // The given value must be proxied.
      else {
          this.scopes.push([]);
          var baseDraft = this.createDraft(base);

          try {
            result = recipe.call(baseDraft, baseDraft);
            this.willFinalize(result, baseDraft, !!patchListener); // Never generate patches when no listener exists.

            var patches = patchListener && [],
                inversePatches = patchListener && []; // Finalize the modified draft...

            if (result === undefined || result === baseDraft) {
              result = this.finalize(baseDraft, [], patches, inversePatches);
            } // ...or use a replacement value.
            else {
                // Users must never modify the draft _and_ return something else.
                if (baseDraft[DRAFT_STATE].modified) throw new Error("An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."); // prettier-ignore
                // Finalize the replacement in case it contains (or is) a subset of the draft.

                if (isDraftable(result)) result = this.finalize(result);

                if (patchListener) {
                  patches.push({
                    op: "replace",
                    path: [],
                    value: result
                  });
                  inversePatches.push({
                    op: "replace",
                    path: [],
                    value: base
                  });
                }
              }
          } finally {
            this.currentScope().forEach(function (state) {
              return state.revoke();
            });
            this.scopes.pop();
          }

          patchListener && patchListener(patches, inversePatches);
        } // Normalize the result.


      return result === NOTHING ? undefined : result;
    }
  }, {
    key: "setAutoFreeze",
    value: function setAutoFreeze(value) {
      this.autoFreeze = value;
    }
  }, {
    key: "setUseProxies",
    value: function setUseProxies(value) {
      this.useProxies = value;
      assign(this, value ? modernProxy : legacyProxy);
    }
  }, {
    key: "applyPatches",
    value: function applyPatches$$1(base, patches) {
      // Mutate the base state when a draft is passed.
      if (isDraft(base)) {
        return applyPatches(base, patches);
      } // Otherwise, produce a copy of the base state.


      return this.produce(base, function (draft) {
        return applyPatches(draft, patches);
      });
    }
    /**
     * @internal
     * Finalize a draft, returning either the unmodified base state or a modified
     * copy of the base state.
     */

  }, {
    key: "finalize",
    value: function finalize(draft, path, patches, inversePatches) {
      var _this2 = this;

      var state = draft[DRAFT_STATE];

      if (!state) {
        if (Object.isFrozen(draft)) return draft;
        return this.finalizeTree(draft);
      } // Never finalize drafts owned by an outer scope.


      if (state.scope !== this.currentScope()) {
        return draft;
      }

      if (!state.modified) return state.base;

      if (!state.finalized) {
        state.finalized = true;
        this.finalizeTree(state.draft, path, patches, inversePatches);

        if (this.onDelete) {
          // The `assigned` object is unreliable with ES5 drafts.
          if (this.useProxies) {
            var assigned = state.assigned;

            for (var prop in assigned) {
              if (!assigned[prop]) this.onDelete(state, prop);
            }
          } else {
            var base = state.base,
                copy = state.copy;
            each(base, function (prop) {
              if (!has(copy, prop)) _this2.onDelete(state, prop);
            });
          }
        }

        if (this.onCopy) this.onCopy(state); // Nested producers must never auto-freeze their result,
        // because it may contain drafts from parent producers.

        if (this.autoFreeze && this.scopes.length === 1) {
          Object.freeze(state.copy);
        }

        if (patches) generatePatches(state, path, patches, inversePatches);
      }

      return state.copy;
    }
    /**
     * @internal
     * Finalize all drafts in the given state tree.
     */

  }, {
    key: "finalizeTree",
    value: function finalizeTree(root, path, patches, inversePatches) {
      var _this3 = this;

      var state = root[DRAFT_STATE];

      if (state) {
        if (!this.useProxies) {
          state.finalizing = true;
          state.copy = shallowCopy(state.draft, true);
          state.finalizing = false;
        }

        root = state.copy;
      }

      var onAssign = this.onAssign;

      var finalizeProperty = function finalizeProperty(prop, value, parent) {
        if (value === parent) {
          throw Error("Immer forbids circular references");
        } // The only possible draft (in the scope of a `finalizeTree` call) is the `root` object.


        var inDraft = !!state && parent === root;

        if (isDraft(value)) {
          value = // Patches are never generated for assigned properties.
          patches && inDraft && !state.assigned[prop] ? _this3.finalize(value, path.concat(prop), patches, inversePatches) // prettier-ignore
          : _this3.finalize(value); // Preserve non-enumerable properties.

          if (Array.isArray(parent) || isEnumerable(parent, prop)) {
            parent[prop] = value;
          } else {
            Object.defineProperty(parent, prop, {
              value: value
            });
          } // Unchanged drafts are never passed to the `onAssign` hook.


          if (inDraft && value === state.base[prop]) return;
        } // Unchanged draft properties are ignored.
        else if (inDraft && is(value, state.base[prop])) {
            return;
          } // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
          else if (isDraftable(value) && !Object.isFrozen(value)) {
              each(value, finalizeProperty);
            }

        if (inDraft && onAssign) {
          onAssign(state, prop, value);
        }
      };

      each(root, finalizeProperty);
      return root;
    }
  }]);
  return Immer;
}();

exports.Immer = Immer;
var immer = new Immer();
/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */

var produce = immer.produce;
/**
 * Pass true to automatically freeze all copies created by Immer.
 *
 * By default, auto-freezing is disabled in production.
 */

exports.produce = produce;
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
/**
 * Pass true to use the ES2015 `Proxy` class when creating drafts, which is
 * always faster than using ES5 proxies.
 *
 * By default, feature detection is used, so calling this is rarely necessary.
 */

exports.setAutoFreeze = setAutoFreeze;
var setUseProxies = immer.setUseProxies.bind(immer);
/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */

exports.setUseProxies = setUseProxies;
var applyPatches$1 = immer.applyPatches.bind(immer);
exports.applyPatches = applyPatches$1;
var _default = produce;
exports.default = _default;
},{"process":"../node_modules/process/browser.js"}],"../node_modules/pathington/es/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITE_SPACE = exports.VALID_KEY = exports.VALID_QUOTES = exports.QUOTED_KEY = exports.NUMBER = exports.MAX_CACHE_SIZE = exports.DOTTY_WITH_BRACKETS_SYNTAX = exports.CACHE = void 0;

/**
 * @constant {Object} CACHE
 *
 * @property {function} clear clear the cache results
 * @property {Object} results the map of path => array results
 * @property {number} size the size of the cache
 */
var CACHE = {
  clear: function clear() {
    CACHE.results = {};
    CACHE.size = 0;
  },
  results: {},
  size: 0
};
/**
 * @constant {RegExp} DOTTY_WITH_BRACKETS_SYNTAX
 */

exports.CACHE = CACHE;
var DOTTY_WITH_BRACKETS_SYNTAX = /"[^"]+"|`[^`]+`|'[^']+'|[^.[\]]+/g;
/**
 * @constant {number} MAX_CACHE_SIZE
 */

exports.DOTTY_WITH_BRACKETS_SYNTAX = DOTTY_WITH_BRACKETS_SYNTAX;
var MAX_CACHE_SIZE = 500;
/**
 * @constant {RegExp} NUMBER
 */

exports.MAX_CACHE_SIZE = MAX_CACHE_SIZE;
var NUMBER = /^\d+$/i;
/**
 * @constant {RegExp} QUOTED_KEY
 */

exports.NUMBER = NUMBER;
var QUOTED_KEY = /^"[^"]+"|`[^`]+`|'[^']+'$/;
/**
 * @constant {Array<string>} VALID_QUOTES
 */

exports.QUOTED_KEY = QUOTED_KEY;
var VALID_QUOTES = /^["'`]{1}$/;
/**
 * @constant {RegExp} VALID_KEY
 */

exports.VALID_QUOTES = VALID_QUOTES;
var VALID_KEY = /^\d+$|^[a-zA-Z_$][\w$]+$/;
/**
 * @constant {RegExp} WHITE_SPACE
 */

exports.VALID_KEY = VALID_KEY;
var WHITE_SPACE = /\s/;
exports.WHITE_SPACE = WHITE_SPACE;
},{}],"../node_modules/pathington/es/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStringPath = exports.getNormalizedParseKey = exports.createGetNormalizedCreateKey = exports.shouldBeInQuotes = exports.shouldBeInBrackets = exports.map = exports.isQuotedKey = exports.isNumericKey = void 0;

var _constants = require("./constants");

// constants

/**
 * @function isNumericKey
 *
 * @description
 * is the key passed a numeric string
 *
 * @param {string} key the key to test
 * @returns {boolean} is the key passed a numeric string
 */
var isNumericKey = function isNumericKey(key) {
  return !!(key && key.length) && _constants.NUMBER.test(key);
};
/**
 * @function isQuotedKey
 *
 * @description
 * is the key passed a quoted key
 *
 * @param {string} key the key to test
 * @returns {boolean} is the key a quoted key
 */


exports.isNumericKey = isNumericKey;

var isQuotedKey = function isQuotedKey(key) {
  return _constants.QUOTED_KEY.test(key);
};
/**
 * @function map
 *
 * @description
 * map the array to a new array based on fn
 *
 * @param {Array<*>} array the array to map
 * @param {function} fn the function to call with each iteration value
 * @returns {Array<*>} the mapped array
 */


exports.isQuotedKey = isQuotedKey;

var map = function map(array, fn) {
  var length = array.length;
  var mapped = [];

  for (var index = 0; index < length; index++) {
    mapped[index] = fn(array[index]);
  }

  return mapped;
};
/**
 * @function shouldBeInBrackets
 *
 * @description
 * should the key passed be encased in brackets when in the path string
 *
 * @param {*} key the key that is being added to the path string
 * @returns {boolean} should the key be in brackets
 */


exports.map = map;

var shouldBeInBrackets = function shouldBeInBrackets(key) {
  return typeof key === 'number' || isNumericKey(key) || isQuotedKey(key);
};
/**
 * @function shouldBeInQuotes
 *
 * @description
 * should the key passed be encased in quotes when in the path string
 *
 * @param {*} key the key that is being added to the path string
 * @returns {boolean} should the key be in quotes
 */


exports.shouldBeInBrackets = shouldBeInBrackets;

var shouldBeInQuotes = function shouldBeInQuotes(key) {
  return _constants.WHITE_SPACE.test(key) || !_constants.VALID_KEY.test(key);
};
/**
 * @function createGetNormalizedCreateKey
 *
 * @description
 * get the normalized path string based on the quote and key passed
 *
 * @param {string} [quote="] the quote string to use
 * @returns {function(string, *): string}
 */


exports.shouldBeInQuotes = shouldBeInQuotes;

var createGetNormalizedCreateKey = function createGetNormalizedCreateKey(quote) {
  return function (existingString, key) {
    var normalizedKey = shouldBeInQuotes(key) ? "" + quote + key + quote : key;
    return existingString + (shouldBeInBrackets(normalizedKey) ? "[" + normalizedKey + "]" : "." + normalizedKey);
  };
};
/**
 * @function getNormalizedParseKey
 *
 * @description
 * get the key as a number if parseable, or as a quoted string if applicable
 *
 * @param {string} key the key to try to parse
 * @returns {number|string} the parsed key
 */


exports.createGetNormalizedCreateKey = createGetNormalizedCreateKey;

var getNormalizedParseKey = function getNormalizedParseKey(key) {
  var cleanKey = isQuotedKey(key) ? key.slice(1, key.length - 1) : key;
  return isNumericKey(cleanKey) ? +cleanKey : cleanKey;
};
/**
 * @function parsePath
 *
 * @description
 * parse the path, memoizing the results
 *
 * @param {string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */


exports.getNormalizedParseKey = getNormalizedParseKey;

var parseStringPath = function parseStringPath(path) {
  if (_constants.CACHE.results[path]) {
    return _constants.CACHE.results[path];
  }

  if (_constants.CACHE.size > _constants.MAX_CACHE_SIZE) {
    _constants.CACHE.clear();
  }

  _constants.CACHE.results[path] = path ? map(path.match(_constants.DOTTY_WITH_BRACKETS_SYNTAX), getNormalizedParseKey) : [path];
  _constants.CACHE.size++;
  return _constants.CACHE.results[path];
};

exports.parseStringPath = parseStringPath;
},{"./constants":"../node_modules/pathington/es/constants.js"}],"../node_modules/pathington/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = exports.create = void 0;

var _constants = require("./constants");

var _utils = require("./utils");

// constants
// utils
var isArray = Array.isArray;
/**
 * @function create
 *
 * @description
 * create a new path string based on the path and quote passed
 *
 * @param {Array<number|string>} path the path to convert to a string
 * @param {string} [quote="] the quote string to use when quoting keys
 * @returns {string} the path string
 */

var create = function create(path, quote) {
  if (quote === void 0) {
    quote = '"';
  }

  if (!isArray(path)) {
    throw new ReferenceError('path passed must be an array');
  }

  if (!_constants.VALID_QUOTES.test(quote)) {
    throw new SyntaxError("quote " + quote + " passed is invalid, must be \", `, or '.");
  }

  var pathString = path.reduce((0, _utils.createGetNormalizedCreateKey)(quote), '');
  return pathString[0] === '.' ? pathString.slice(1) : pathString;
};
/**
 * @function parse
 *
 * @description
 * the path parsed into a valid array of keys / indices
 *
 * @param {Array<number|string>|number|string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */


exports.create = create;

var parse = function parse(path) {
  if (typeof path === 'string') {
    return (0, _utils.parseStringPath)(path);
  }

  if (isArray(path)) {
    return (0, _utils.map)(path, _utils.getNormalizedParseKey);
  }

  var normalizedParseKey = (0, _utils.getNormalizedParseKey)(path);
  return [typeof normalizedParseKey === 'number' ? normalizedParseKey : "" + normalizedParseKey];
};

exports.parse = parse;
},{"./constants":"../node_modules/pathington/es/constants.js","./utils":"../node_modules/pathington/es/utils.js"}],"../node_modules/identitate/es/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNestedProperty = void 0;

/**
 * @function getNestedProperty
 *
 * @description
 * recursive function to get the nested property at path
 *
 * @param {Array<number|string>} path the path to retrieve values from the object
 * @param {*} object the object to get values from
 * @returns {*} the retrieved values
 */
var getNestedProperty = function getNestedProperty(path, object) {
  if (path.length === 1) {
    return object ? object[path[0]] : void 0;
  }

  var property = path.shift();
  return object && object.hasOwnProperty(property) ? getNestedProperty(path, object[property]) : void 0;
};

exports.getNestedProperty = getNestedProperty;
},{}],"../node_modules/identitate/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identitySecondLast = exports.identityLast = exports.identitySecond = exports.identity = exports.createIdentity = void 0;

var _pathington = require("pathington");

var _utils = require("./utils");

// external dependencies
// utils

/**
 * @function createIdentity
 *
 * @description
 * create an identity method for a specific argument index
 *
 * @param {number} argIndex the index of the argument to get
 * @param {Array<number|string>|number|string} path the nested path to retrieve the value from
 * @returns {function(...Array<*>): *} the identity method for the given argument
 */
var createIdentity = function createIdentity(argIndex, path) {
  var shouldGetNestedValue = path !== void 0;
  return function () {
    // eslint-disable-next-line prefer-rest-params
    var value = arguments[argIndex < 0 ? arguments.length + argIndex : argIndex];
    return shouldGetNestedValue ? (0, _utils.getNestedProperty)((0, _pathington.parse)(path), value) : value;
  };
};

exports.createIdentity = createIdentity;
var identity = createIdentity(0);
exports.identity = identity;
var identitySecond = createIdentity(1);
exports.identitySecond = identitySecond;
var identityLast = createIdentity(-1);
exports.identityLast = identityLast;
var identitySecondLast = createIdentity(-2);
exports.identitySecondLast = identitySecondLast;
},{"pathington":"../node_modules/pathington/es/index.js","./utils":"../node_modules/identitate/es/utils.js"}],"../node_modules/fast-equals/dist/fast-equals.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['fast-equals'] = {}));
}(this, function (exports) { 'use strict';

  /**
   * @constant {boolean} HAS_MAP_SUPPORT
   */
  var HAS_MAP_SUPPORT = typeof Map === 'function';
  /**
   * @constant {boolean} HAS_SET_SUPPORT
   */

  var HAS_SET_SUPPORT = typeof Set === 'function';
  /**
   * @constant {boolean} HAS_WEAKSET_SUPPORT
   */

  var HAS_WEAKSET_SUPPORT = typeof WeakSet === 'function';

  // constants
  var keys = Object.keys;
  /**
   * @function addObjectToCache
   *
   * @description
   * add object to cache if it is indeed an object
   *
   * @param {any} object the object to potentially add to the cache
   * @param {Object|WeakSet} cache the cache to add to
   * @returns {void}
   */

  var addObjectToCache = function addObjectToCache(object, cache) {
    return object && typeof object === 'object' && cache.add(object);
  };
  /**
   *
   * @param {Array<Array<any>>} pairs the pairs to check in
   * @param {Array<any>} pairToMatch the pair to check if exists
   * @param {function} isEqual the equality comparator
   * @param {any} meta the meta item to pass through
   * @returns {boolean} does the pair exist in the pairs
   */

  var hasPair = function hasPair(pairs, pairToMatch, isEqual, meta) {
    var pair;

    for (var index = 0; index < pairs.length; index++) {
      pair = pairs[index];

      if (isEqual(pair[0], pairToMatch[0], meta) && isEqual(pair[1], pairToMatch[1], meta)) {
        return true;
      }
    }

    return false;
  };
  /**
   * @function hasValue
   *
   * @description
   * does the values include the vakye passed
   *
   * @param {Array<any>} values the values to check in
   * @param {any} item the value to locate
   * @param {function} isEqual the equality comparator
   * @param {any} meta the meta item to pass through
   * @returns {boolean} does the value exist in the values
   */

  var hasValue = function hasValue(values, item, isEqual, meta) {
    for (var index = 0; index < values.length; index++) {
      if (isEqual(values[index], item, meta)) {
        return true;
      }
    }

    return false;
  };
  /**
   * @function sameValueZeroEqual
   *
   * @description
   * are the objects passed strictly equal or both NaN
   *
   * @param {any} objectA the object to compare against
   * @param {any} objectB the object to test
   * @returns {boolean} are the objects equal by the SameValueZero principle
   */

  var sameValueZeroEqual = function sameValueZeroEqual(objectA, objectB) {
    return objectA === objectB || objectA !== objectA && objectB !== objectB;
  };
  /**
   * @function isPlainObject
   *
   * @description
   * is the object a plain object
   *
   * @param {any} object the object to test
   * @returns {boolean} is the object a plain object
   */

  var isPlainObject = function isPlainObject(object) {
    return object.constructor === Object;
  };
  /**
   * @function isPromiseLike
   *
   * @description
   * is the object promise-like (thenable)
   *
   * @param {any} object the object to test
   * @returns {boolean} is the object promise-like
   */

  var isPromiseLike = function isPromiseLike(object) {
    return typeof object.then === 'function';
  };
  /**
   * @function isReactElement
   *
   * @description
   * is the object passed a react element
   *
   * @param {any} object the object to test
   * @returns {boolean} is the object a react element
   */

  var isReactElement = function isReactElement(object) {
    return !!(object.$$typeof && object._store);
  };
  /**
   * @function getNewCache
   *
   * @description
   * get a new cache object to prevent circular references
   *
   * @returns {Object|Weakset} the new cache object
   */

  var getNewCache = function getNewCache() {
    return HAS_WEAKSET_SUPPORT ? new WeakSet() : Object.create({
      _values: [],
      add: function add(value) {
        this._values.push(value);
      },
      has: function has(value) {
        return !!~this._values.indexOf(value);
      }
    });
  };
  /**
   * @function createCircularEqual
   *
   * @description
   * create a custom isEqual handler specific to circular objects
   *
   * @param {funtion} [isEqual] the isEqual comparator to use instead of isDeepEqual
   * @returns {function(any, any): boolean}
   */

  var createCircularEqual = function createCircularEqual(isEqual) {
    return function (isDeepEqual) {
      var comparator = isEqual || isDeepEqual;
      return function (objectA, objectB, cache) {
        if (cache === void 0) {
          cache = getNewCache();
        }

        var cacheHasA = cache.has(objectA);
        var cacheHasB = cache.has(objectB);

        if (cacheHasA || cacheHasB) {
          return cacheHasA && cacheHasB;
        }

        addObjectToCache(objectA, cache);
        addObjectToCache(objectB, cache);
        return comparator(objectA, objectB, cache);
      };
    };
  };
  /**
   * @function toPairs
   *
   * @param {Map} map the map to convert to [key, value] pairs (entries)
   * @returns {Array<Array<*>>} the [key, value] pairs
   */

  var toPairs = function toPairs(map) {
    var pairs = [];
    map.forEach(function (value, key) {
      return pairs.push([key, value]);
    });
    return pairs;
  };
  /**
   * @function toValues
   *
   * @param {Set} set the set to convert to values
   * @returns {Array<*>} the values
   */

  var toValues = function toValues(set) {
    var values = [];
    set.forEach(function (value) {
      return values.push(value);
    });
    return values;
  };
  /**
   * @function areArraysEqual
   *
   * @description
   * are the arrays equal in value
   *
   * @param {Array<any>} arrayA the array to test
   * @param {Array<any>} arrayB the array to test against
   * @param {function} isEqual the comparator to determine equality
   * @param {any} meta the meta object to pass through
   * @returns {boolean} are the arrays equal
   */

  var areArraysEqual = function areArraysEqual(arrayA, arrayB, isEqual, meta) {
    if (arrayA.length !== arrayB.length) {
      return false;
    }

    for (var index = 0; index < arrayA.length; index++) {
      if (!isEqual(arrayA[index], arrayB[index], meta)) {
        return false;
      }
    }

    return true;
  };
  /**
   * @function areMapsEqual
   *
   * @description
   * are the maps equal in value
   *
   * @param {Map} mapA the map to test
   * @param {Map} mapB the map to test against
   * @param {function} isEqual the comparator to determine equality
   * @param {any} meta the meta map to pass through
   * @returns {boolean} are the maps equal
   */

  var areMapsEqual = function areMapsEqual(mapA, mapB, isEqual, meta) {
    var pairsA = toPairs(mapA);
    var pairsB = toPairs(mapB);

    if (pairsA.length !== pairsB.length) {
      return false;
    }

    for (var index = 0; index < pairsA.length; index++) {
      if (!hasPair(pairsB, pairsA[index], isEqual, meta) || !hasPair(pairsA, pairsB[index], isEqual, meta)) {
        return false;
      }
    }

    return true;
  };
  /**
   * @function areObjectsEqual
   *
   * @description
   * are the objects equal in value
   *
   * @param {Object} objectA the object to test
   * @param {Object} objectB the object to test against
   * @param {function} isEqual the comparator to determine equality
   * @param {any} meta the meta object to pass through
   * @returns {boolean} are the objects equal
   */

  var areObjectsEqual = function areObjectsEqual(objectA, objectB, isEqual, meta) {
    var keysA = keys(objectA);
    var keysB = keys(objectB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    var key;

    for (var index = 0; index < keysA.length; index++) {
      key = keysA[index];

      if (!hasValue(keysB, key, sameValueZeroEqual)) {
        return false;
      } // if a react element, ignore the "_owner" key because its not necessary for equality comparisons


      if (key === '_owner' && isReactElement(objectA) && isReactElement(objectB)) {
        continue;
      }

      if (!isEqual(objectA[key], objectB[key], meta)) {
        return false;
      }
    }

    return true;
  };
  /**
   * @function areRegExpsEqual
   *
   * @description
   * are the regExps equal in value
   *
   * @param {RegExp} regExpA the regExp to test
   * @param {RegExp} regExpB the regExp to test agains
   * @returns {boolean} are the regExps equal
   */

  var areRegExpsEqual = function areRegExpsEqual(regExpA, regExpB) {
    return regExpA.source === regExpB.source && regExpA.global === regExpB.global && regExpA.ignoreCase === regExpB.ignoreCase && regExpA.multiline === regExpB.multiline && regExpA.unicode === regExpB.unicode && regExpA.sticky === regExpB.sticky && regExpA.lastIndex === regExpB.lastIndex;
  };
  /**
   * @function areSetsEqual
   *
   * @description
   * are the sets equal in value
   *
   * @param {Set} setA the set to test
   * @param {Set} setB the set to test against
   * @param {function} isEqual the comparator to determine equality
   * @param {any} meta the meta set to pass through
   * @returns {boolean} are the sets equal
   */

  var areSetsEqual = function areSetsEqual(setA, setB, isEqual, meta) {
    var valuesA = toValues(setA);
    var valuesB = toValues(setB);

    if (valuesA.length !== valuesB.length) {
      return false;
    }

    for (var index = 0; index < valuesA.length; index++) {
      if (!hasValue(valuesB, valuesA[index], isEqual, meta) || !hasValue(valuesA, valuesB[index], isEqual, meta)) {
        return false;
      }
    }

    return true;
  };

  // constants
  var isArray = Array.isArray;

  var createComparator = function createComparator(createIsEqual) {
    // eslint-disable-next-line no-use-before-define
    var isEqual = typeof createIsEqual === 'function' ? createIsEqual(comparator) : comparator;
    /**
     * @function comparator
     *
     * @description
     * compare the value of the two objects and return true if they are equivalent in values
     *
     * @param {any} objectA the object to test against
     * @param {any} objectB the object to test
     * @param {any} [meta] an optional meta object that is passed through to all equality test calls
     * @returns {boolean} are objectA and objectB equivalent in value
     */

    function comparator(objectA, objectB, meta) {
      if (sameValueZeroEqual(objectA, objectB)) {
        return true;
      }

      var typeOfA = typeof objectA;

      if (typeOfA !== typeof objectB || typeOfA !== 'object' || !objectA || !objectB) {
        return false;
      }

      if (isPlainObject(objectA) && isPlainObject(objectB)) {
        return areObjectsEqual(objectA, objectB, isEqual, meta);
      }

      var arrayA = isArray(objectA);
      var arrayB = isArray(objectB);

      if (arrayA || arrayB) {
        return arrayA === arrayB && areArraysEqual(objectA, objectB, isEqual, meta);
      }

      var dateA = objectA instanceof Date;
      var dateB = objectB instanceof Date;

      if (dateA || dateB) {
        return dateA === dateB && sameValueZeroEqual(objectA.getTime(), objectB.getTime());
      }

      var regexpA = objectA instanceof RegExp;
      var regexpB = objectB instanceof RegExp;

      if (regexpA || regexpB) {
        return regexpA === regexpB && areRegExpsEqual(objectA, objectB);
      }

      if (isPromiseLike(objectA) || isPromiseLike(objectB)) {
        return objectA === objectB;
      }

      if (HAS_MAP_SUPPORT) {
        var mapA = objectA instanceof Map;
        var mapB = objectB instanceof Map;

        if (mapA || mapB) {
          return mapA === mapB && areMapsEqual(objectA, objectB, isEqual, meta);
        }
      }

      if (HAS_SET_SUPPORT) {
        var setA = objectA instanceof Set;
        var setB = objectB instanceof Set;

        if (setA || setB) {
          return setA === setB && areSetsEqual(objectA, objectB, isEqual, meta);
        }
      }

      return areObjectsEqual(objectA, objectB, isEqual, meta);
    }

    return comparator;
  };

  // comparator
  var circularDeepEqual = createComparator(createCircularEqual());
  var circularShallowEqual = createComparator(createCircularEqual(sameValueZeroEqual));
  var deepEqual = createComparator();
  var shallowEqual = createComparator(function () {
    return sameValueZeroEqual;
  });
  var index = {
    circularDeep: circularDeepEqual,
    circularShallow: circularShallowEqual,
    createCustom: createComparator,
    deep: deepEqual,
    sameValueZero: sameValueZeroEqual,
    shallow: shallowEqual
  };

  exports.createCustomEqual = createComparator;
  exports.sameValueZeroEqual = sameValueZeroEqual;
  exports.circularDeepEqual = circularDeepEqual;
  exports.circularShallowEqual = circularShallowEqual;
  exports.deepEqual = deepEqual;
  exports.shallowEqual = shallowEqual;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


},{}],"../node_modules/reselect/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;
exports.createSelector = void 0;

function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


  var length = prev.length;

  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
  var lastArgs = null;
  var lastResult = null; // we reference arguments instead of spreading them for performance reasons

  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      return memoizedResultFunc.apply(null, params);
    });
    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;

    selector.recomputations = function () {
      return recomputations;
    };

    selector.resetRecomputations = function () {
      return recomputations = 0;
    };

    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);
exports.createSelector = createSelector;

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}
},{}],"../node_modules/curriable/dist/curriable.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.curriable = {}));
})(this, function (exports) {
  'use strict';
  /**
   * @constant __ placeholder used when parameters are skipped
   */

  var __ = typeof Symbol === 'function' ? Symbol('curriable placeholder') : 0xedd1;
  /**
   * @function recursiveCurry
   *
   * @description
   * recursively curry over the arguments until all have been resolved
   *
   * @param fn the function to curry
   * @param arity the length of the function to curry until
   * @param args the existing arguments
   * @returns the result of the function call
   */


  var recursiveCurry = function (fn, arity, args) {
    return function () {
      var length = args.length;
      var newArgs = arguments;
      var newArgsLength = newArgs.length;
      var combined = [];
      var newArgsIndex = 0;
      var remaining = arity;
      var value;

      if (length) {
        for (var index = 0; index < length; index++) {
          combined[index] = value = args[index] === __ && newArgsIndex < newArgsLength ? newArgs[newArgsIndex++] : args[index];

          if (value !== __) {
            --remaining;
          }
        }
      }

      if (newArgsIndex < newArgsLength) {
        for (; newArgsIndex < newArgsLength; newArgsIndex++) {
          combined[combined.length] = value = newArgs[newArgsIndex];

          if (value !== __ && newArgsIndex < arity) {
            --remaining;
          }
        }
      }

      return remaining > 0 ? recursiveCurry(fn, arity, combined) : fn.apply(this, combined);
    };
  }; // utils

  /**
   * @function curry
   *
   * @description
   * get the method passed as a curriable method based on its parameters
   *
   * @param fn the method to make curriable
   * @param arity the arity of the curried method
   * @returns the fn passed as a curried function
   */


  var curry = function (fn, arity) {
    if (arity === void 0) {
      arity = fn.length;
    }

    var curried = recursiveCurry(fn, arity, []);
    curried.arity = arity;
    curried.fn = fn;
    return curried;
  };

  curry.__ = __;
  /**
   * @function uncurry
   *
   * @description
   * return a function that is the non-curried version of the fn passed
   *
   * @param curried the curried function to uncurry
   * @returns the original fn
   */

  var uncurry = function (curried) {
    return curried.fn;
  };

  curry.uncurry = uncurry;
  exports.__ = __;
  exports.curry = curry;
  exports.uncurry = uncurry;
  exports.default = curry;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{}],"../node_modules/unchanged/dist/unchanged.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('curriable'), require('pathington')) : typeof define === 'function' && define.amd ? define(['exports', 'curriable', 'pathington'], factory) : (global = global || self, factory(global.unchanged = {}, global.curriable, global.pathington));
})(this, function (exports, curriable, pathington) {
  'use strict'; // external dependencies

  var O = Object;
  var create = O.create,
      getOwnPropertySymbols = O.getOwnPropertySymbols,
      getPrototypeOf = O.getPrototypeOf,
      keys = O.keys,
      propertyIsEnumerable = O.propertyIsEnumerable;
  var toStringObject = O.prototype.toString;
  var toStringFunction = Function.prototype.toString;
  var isArray = Array.isArray;
  /**
   * @constant REACT_ELEMENT the symbol / number specific to react elements
   */

  var REACT_ELEMENT = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('react.element') : 0xeac7;
  /**
   * @function cloneArray
   *
   * @description
   * clone an array to a new array
   *
   * @param array the array to clone
   * @returns the cloned array
   */

  var cloneArray = function (array) {
    // @ts-ignore
    var cloned = new array.constructor();

    for (var index = 0; index < array.length; index++) {
      cloned[index] = array[index];
    }

    return cloned;
  };
  /**
   * @function reduce
   *
   * @description
   * a targeted reduce method faster than the native
   *
   * @param array the array to reduce
   * @param fn the method to reduce each array value with
   * @param initialValue the initial value of the reduction
   * @returns the reduced value
   */


  var reduce = function (array, fn, initialValue) {
    var value = initialValue;

    for (var index = 0; index < array.length; index++) {
      value = fn(value, array[index]);
    }

    return value;
  };
  /**
   * @function getOwnProperties
   *
   * @description
   * get the all properties (keys and symbols) of the object passed
   *
   * @param object the object to get the properties of
   * @returns the keys and symbols the object has
   */


  var getOwnProperties = function (object) {
    var ownSymbols = getOwnPropertySymbols(object);

    if (!ownSymbols.length) {
      return keys(object);
    }

    return keys(object).concat(reduce(ownSymbols, function (enumerableSymbols, symbol) {
      if (propertyIsEnumerable.call(object, symbol)) {
        enumerableSymbols.push(symbol);
      }

      return enumerableSymbols;
    }, []));
  };
  /**
   * @function assignFallback
   *
   * @description
   * a targeted fallback if native Object.assign is unavailable
   *
   * @param target the object to shallowly merge into
   * @param source the object to shallowly merge into target
   * @returns the shallowly merged object
   */


  var assignFallback = function (target, source) {
    if (!source) {
      return target;
    }

    return reduce(getOwnProperties(source), function (clonedObject, property) {
      clonedObject[property] = source[property];
      return clonedObject;
    }, Object(target));
  };

  var assign = typeof O.assign === 'function' ? O.assign : assignFallback;
  /**
   * @function createWithProto
   *
   * @description
   * create a new object with the prototype of the object passed
   *
   * @param object object whose prototype will be the new object's prototype
   * @returns object with the prototype of the one passed
   */

  var createWithProto = function (object) {
    return create(object.__proto__ || getPrototypeOf(object));
  };
  /**
   * @function isCloneable
   *
   * @description
   * is the object passed considered cloneable
   *
   * @param object the object that is being checked for cloneability
   * @returns whether the object can be cloned
   */


  var isCloneable = function (object) {
    if (!object || typeof object !== 'object' || object.$$typeof === REACT_ELEMENT) {
      return false;
    }

    var type = toStringObject.call(object);
    return type !== '[object Date]' && type !== '[object RegExp]';
  };
  /**
   * @function isEmptyPath
   *
   * @description
   * is the path passed an empty path
   *
   * @param path the path to check for emptiness
   * @returns whether the path passed is considered empty
   */


  var isEmptyPath = function (path) {
    return path == null || isArray(path) && !path.length;
  };
  /**
   * @function isGlobalConstructor
   *
   * @description
   * is the fn passed a global constructor
   *
   * @param fn the fn to check if a global constructor
   * @returns whether the fn passed is a global constructor
   */


  var isGlobalConstructor = function (fn) {
    return typeof fn === 'function' && !!~toStringFunction.call(fn).indexOf('[native code]');
  };
  /**
   * @function callIfFunction
   *
   * @description
   * if the object passed is a function, call it and return its return, else return undefined
   *
   * @param object the object to call if a function
   * @param context the context to call the function with
   * @param parameters the parameters to call the function with
   * @returns the result of the function call, or undefined
   */


  var callIfFunction = function (object, context, parameters) {
    return typeof object === 'function' ? object.apply(context, parameters) : void 0;
  };
  /**
   * @function getNewEmptyChild
   *
   * @description
   * get a new empty child object based on the key passed
   *
   * @param key the key to base the empty child on
   * @returns the empty object the child is built from
   */


  var getNewEmptyChild = function (key) {
    return typeof key === 'number' ? [] : {};
  };
  /**
   * @function getNewEmptyObject
   *
   * @description
   * get a new empty object based on the object passed
   *
   * @param object the object to base the empty object on
   * @returns an empty version of the object passed
   */


  var getNewEmptyObject = function (object) {
    return isArray(object) ? [] : {};
  };
  /**
   * @function getShallowClone
   *
   * @description
   * create a shallow clone of the object passed, respecting its prototype
   *
   * @param object the object to clone
   * @returns a shallow clone of the object passed
   */


  var getShallowClone = function (object) {
    if (object.constructor === O) {
      return assign({}, object);
    }

    if (isArray(object)) {
      return cloneArray(object);
    }

    return isGlobalConstructor(object.constructor) ? {} : assign(createWithProto(object), object);
  };
  /**
   * @function isSameValueZero
   *
   * @description
   * are the values equal based on SameValueZero
   *
   * @param value1 the first value to test
   * @param value2 the second value to test
   * @returns are the two values passed equal based on SameValueZero
   */


  var isSameValueZero = function (value1, value2) {
    return value1 === value2 || value1 !== value1 && value2 !== value2;
  };
  /**
   * @function cloneIfPossible
   *
   * @description
   * clone the object if it can be cloned, otherwise return the object itself
   *
   * @param object the object to clone
   * @returns a cloned version of the object, or the object itself if not cloneable
   */


  var cloneIfPossible = function (object) {
    return isCloneable(object) ? getShallowClone(object) : object;
  };
  /**
   * @function getCloneOrEmptyObject
   *
   * @description
   * if the object is cloneable, get a clone of the object, else get a new
   * empty child object based on the key
   *
   * @param object the object to clone
   * @param nextKey the key to base the empty child object on
   * @returns a clone of the object, or an empty child object
   */


  var getCloneOrEmptyObject = function (object, nextKey) {
    return isCloneable(object) ? getShallowClone(object) : getNewEmptyChild(nextKey);
  };
  /**
   * @function getCoalescedValue
   *
   * @description
   * return the value if not undefined, otherwise return the fallback value
   *
   * @param value the value to coalesce if undefined
   * @param fallbackValue the value to coalesce to
   * @returns the coalesced value
   */


  var getCoalescedValue = function (value, fallbackValue) {
    return value === void 0 ? fallbackValue : value;
  };
  /**
   * @function getParsedPath
   *
   * @description
   * parse the path passed into an array path
   *
   * @param path the path to parse
   * @returns the parsed path
   */


  var getParsedPath = function (path) {
    return isArray(path) ? path : pathington.parse(path);
  };
  /**
   * @function getCloneAtPath
   *
   * @description
   * get a new object, cloned at the path specified while leveraging
   * structural sharing for the rest of the properties
   *
   * @param path the path to clone at
   * @param object the object with cloned children at path
   * @param onMatch the method to call once the end of the path is reached
   * @param index the path index
   * @returns the object deeply cloned at the path specified
   */


  var getCloneAtPath = function (path, object, onMatch, index) {
    var key = path[index];
    var nextIndex = index + 1;

    if (nextIndex === path.length) {
      onMatch(object, key);
    } else {
      object[key] = getCloneAtPath(path, getCloneOrEmptyObject(object[key], path[nextIndex]), onMatch, nextIndex);
    }

    return object;
  };
  /**
   * @function getDeepClone
   *
   * @description
   * get a clone of the object at the path specified
   *
   * @param path the path to clone at
   * @param object the object to clone at the path
   * @param onMatch once a patch match is found, the callback to fire
   * @returns the clone of the object at path specified
   */


  var getDeepClone = function (path, object, onMatch) {
    var parsedPath = getParsedPath(path);
    var topLevelClone = getCloneOrEmptyObject(object, parsedPath[0]);

    if (parsedPath.length === 1) {
      onMatch(topLevelClone, parsedPath[0]);
      return topLevelClone;
    }

    return getCloneAtPath(parsedPath, topLevelClone, onMatch, 0);
  };
  /**
   * @function getMergedObject
   *
   * @description
   * merge the source into the target, either deeply or shallowly
   *
   * @param target the object to merge into
   * @param source the object being merged into the target
   * @param isDeep is the merge a deep merge
   * @returns the merged object
   */


  var getMergedObject = function (target, source, isDeep) {
    var isObject1Array = isArray(target);

    if (isObject1Array !== isArray(source) || !isCloneable(target)) {
      return cloneIfPossible(source);
    }

    if (isObject1Array) {
      return target.concat(source);
    }

    var targetClone = target.constructor === O || isGlobalConstructor(target.constructor) ? {} : createWithProto(target);
    return reduce(getOwnProperties(source), function (clone, key) {
      clone[key] = isDeep && isCloneable(source[key]) ? getMergedObject(target[key], source[key], isDeep) : source[key];
      return clone;
    }, assign(targetClone, target));
  };
  /**
   * @function getValueAtPath
   *
   * @description
   * get the value at the nested property, or the fallback provided
   *
   * @param path the path to get the value from
   * @param object the object to get the value from at path
   * @param noMatchValue the value returned if no match is found
   * @returns the matching value, or the fallback provided
   */


  var getValueAtPath = function (path, object, noMatchValue) {
    var parsedPath = getParsedPath(path);

    if (parsedPath.length === 1) {
      return object ? getCoalescedValue(object[parsedPath[0]], noMatchValue) : noMatchValue;
    }

    var ref = object;
    var key = parsedPath[0];

    for (var index = 0; index < parsedPath.length - 1; index++) {
      if (!ref || !ref[key]) {
        return noMatchValue;
      }

      ref = ref[key];
      key = parsedPath[index + 1];
    }

    return ref ? getCoalescedValue(ref[key], noMatchValue) : noMatchValue;
  };
  /**
   * @function getFullPath
   *
   * @description
   * get the path to add to, based on the object and fn passed
   *
   * @param path the path to add to
   * @param object the object traversed by the path
   * @param fn the function to transform the retrieved value with
   * @returns the full path to add to
   */


  var getFullPath = function (path, object, fn) {
    var isPathEmpty = isEmptyPath(path);
    var valueAtPath = isPathEmpty ? object : fn ? fn(getValueAtPath(path, object)) : getValueAtPath(path, object);
    return isArray(valueAtPath) ? isArray(path) ? path.concat([valueAtPath.length]) : (isPathEmpty ? '' : path) + "[" + valueAtPath.length + "]" : path;
  };
  /**
   * @function splice
   *
   * @description
   * a faster, more targeted version of the native splice
   *
   * @param array the array to remove the value from
   * @param splicedIndex the index of the value to remove
   */


  var splice = function (array, splicedIndex) {
    if (array.length) {
      var length_1 = array.length;
      var index = splicedIndex;

      while (index < length_1 - 1) {
        array[index] = array[index + 1];
        ++index;
      }

      --array.length;
    }
  };
  /**
   * @function throwInvalidFnError
   *
   * @description
   * throw the TypeError based on the invalid handler
   *
   * @throws
   */


  var throwInvalidFnError = function () {
    throw new TypeError('handler passed is not of type "function".');
  }; // utils


  var isArray$1 = Array.isArray;
  var slice = Array.prototype.slice;
  /**
   * @function createCall
   *
   * @description
   * create handlers for call / callWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns call / callWith
   */

  var createCall = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, parameters, object, context) {
        if (context === void 0) {
          context = object;
        }

        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 5);

        if (isEmptyPath(path)) {
          return callIfFunction(fn.apply(void 0, [object].concat(extraArgs)), context, parameters);
        }

        var value = getValueAtPath(path, object);

        if (value === void 0) {
          return;
        }

        var result = fn.apply(void 0, [value].concat(extraArgs));
        return callIfFunction(result, context, parameters);
      };
    }

    return function (path, parameters, object, context) {
      if (context === void 0) {
        context = object;
      }

      var callable = isEmptyPath(path) ? object : getValueAtPath(path, object);
      return callIfFunction(callable, context, parameters);
    };
  };
  /**
   * @function createGet
   *
   * @description
   * create handlers for get / getWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns get / getWith
   */


  var createGet = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 4);

        if (isEmptyPath(path)) {
          return fn.apply(void 0, [object].concat(extraArgs));
        }

        var value = getValueAtPath(path, object);
        return value === void 0 ? value : fn.apply(void 0, [value].concat(extraArgs));
      };
    }

    return function (path, object) {
      return isEmptyPath(path) ? object : getValueAtPath(path, object);
    };
  };
  /**
   * @function createGetOr
   *
   * @description
   * create handlers for getOr / getWithOr
   *
   * @param isWithHandler is the method using a with handler
   * @returns getOr / getWithOr
   */


  var createGetOr = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, noMatchValue, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 4);

        if (isEmptyPath(path)) {
          return fn.apply(void 0, [object].concat(extraArgs));
        }

        var value = getValueAtPath(path, object);
        return value === void 0 ? noMatchValue : fn.apply(void 0, [value].concat(extraArgs));
      };
    }

    return function (noMatchValue, path, object) {
      return isEmptyPath(path) ? object : getValueAtPath(path, object, noMatchValue);
    };
  };
  /**
   * @function createHas
   *
   * @description
   * create handlers for has / hasWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns has / hasWith
   */


  var createHas = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 3);

        if (isEmptyPath(path)) {
          return !!fn.apply(void 0, [object].concat(extraArgs));
        }

        var value = getValueAtPath(path, object);
        return value !== void 0 && !!fn.apply(void 0, [value].concat(extraArgs));
      };
    }

    return function (path, object) {
      return isEmptyPath(path) ? object != null : getValueAtPath(path, object) !== void 0;
    };
  };
  /**
   * @function createIs
   *
   * @description
   * create handlers for is / isWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns is / isWith
   */


  var createIs = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, value, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 4);

        if (isEmptyPath(path)) {
          return isSameValueZero(fn.apply(void 0, [object].concat(extraArgs)), value);
        }

        return isSameValueZero(fn.apply(void 0, [getValueAtPath(path, object)].concat(extraArgs)), value);
      };
    }

    return function (path, value, object) {
      return isEmptyPath(path) ? isSameValueZero(object, value) : isSameValueZero(getValueAtPath(path, object), value);
    };
  };
  /**
   * @function createMerge
   *
   * @description
   * create handlers for merge / mergeWith
   *
   * @param isWithHandler is the method using a with handler
   * @param isDeep is the handler for a deep merge or shallow
   * @returns merge / mergeWith
   */


  var createMerge = function (isWithHandler, isDeep) {
    if (isWithHandler) {
      return function (fn, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 3);

        if (!isCloneable(object)) {
          return fn.apply(void 0, [object].concat(extraArgs));
        }

        if (isEmptyPath(path)) {
          var objectToMerge = fn.apply(void 0, [object].concat(extraArgs));
          return objectToMerge ? getMergedObject(object, objectToMerge, isDeep) : object;
        }

        var hasChanged = false;
        var result = getDeepClone(path, object, function (ref, key) {
          var objectToMerge = fn.apply(void 0, [ref[key]].concat(extraArgs));

          if (objectToMerge) {
            ref[key] = getMergedObject(ref[key], objectToMerge, isDeep);
            hasChanged = true;
          }
        });
        return hasChanged ? result : object;
      };
    }

    return function (path, objectToMerge, object) {
      if (!isCloneable(object)) {
        return objectToMerge;
      }

      return isEmptyPath(path) ? getMergedObject(object, objectToMerge, true) : getDeepClone(path, object, function (ref, key) {
        ref[key] = getMergedObject(ref[key], objectToMerge, isDeep);
      });
    };
  };
  /**
   * @function createNot
   *
   * @description
   * create handlers for not / notWith
   *
   * @param isWithHandler not the method using a with handler
   * @returns not / notWithHandler
   */


  var createNot = function (isWithHandler) {
    var is = createIs(isWithHandler);
    return function () {
      return !is.apply(this, arguments);
    };
  };
  /**
   * @function createRemove
   *
   * @description
   * create handlers for remove / removeWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns remove / removeWith
   */


  var createRemove = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 3);

        if (isEmptyPath(path)) {
          var emptyObject = getNewEmptyObject(object);
          return fn.apply(void 0, [emptyObject].concat(extraArgs)) ? emptyObject : object;
        }

        var value = getValueAtPath(path, object);
        return value !== void 0 && fn.apply(void 0, [value].concat(extraArgs)) ? getDeepClone(path, object, function (ref, key) {
          if (isArray$1(ref)) {
            splice(ref, key);
          } else {
            delete ref[key];
          }
        }) : object;
      };
    }

    return function (path, object) {
      if (isEmptyPath(path)) {
        return getNewEmptyObject(object);
      }

      return getValueAtPath(path, object) !== void 0 ? getDeepClone(path, object, function (ref, key) {
        if (isArray$1(ref)) {
          splice(ref, key);
        } else {
          delete ref[key];
        }
      }) : object;
    };
  };
  /**
   * @function createSet
   *
   * @description
   * create handlers for set / setWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns set / setWith
   */


  var createSet = function (isWithHandler) {
    if (isWithHandler) {
      return function (fn, path, object) {
        if (typeof fn !== 'function') {
          throwInvalidFnError();
        }

        var extraArgs = slice.call(arguments, 3);
        return isEmptyPath(path) ? fn.apply(void 0, [object].concat(extraArgs)) : getDeepClone(path, object, function (ref, key) {
          ref[key] = fn.apply(void 0, [ref[key]].concat(extraArgs));
        });
      };
    }

    return function (path, value, object) {
      return isEmptyPath(path) ? value : getDeepClone(path, object, function (ref, key) {
        ref[key] = value;
      });
    };
  };
  /**
   * @function createAdd
   *
   * @description
   * create handlers for add / addWith
   *
   * @param isWithHandler is the method using a with handler
   * @returns add / addWith
   */


  var createAdd = function (isWithHandler) {
    var add = createSet(isWithHandler);

    if (isWithHandler) {
      return function (fn, path, object) {
        return add.apply(this, [fn, getFullPath(path, object, fn), object].concat(slice.call(arguments, 3)));
      };
    }

    return function (path, value, object) {
      return add(getFullPath(path, object), value, object);
    };
  }; // external dependencies


  var add = curriable.curry(createAdd(false), 3);
  var addWith = curriable.curry(createAdd(true), 3);
  var assign$1 = curriable.curry(createMerge(false, false), 3);
  var assignWith = curriable.curry(createMerge(true, false), 3);
  var call = curriable.curry(createCall(false), 3);
  var callWith = curriable.curry(createCall(true), 4);
  var get = curriable.curry(createGet(false), 2);
  var getOr = curriable.curry(createGetOr(false), 3);
  var getWith = curriable.curry(createGet(true), 3);
  var getWithOr = curriable.curry(createGetOr(true), 4);
  var has = curriable.curry(createHas(false), 2);
  var hasWith = curriable.curry(createHas(true), 3);
  var is = curriable.curry(createIs(false), 3);
  var isWith = curriable.curry(createIs(true), 4);
  var merge = curriable.curry(createMerge(false, true), 3);
  var mergeWith = curriable.curry(createMerge(true, true), 3);
  var not = curriable.curry(createNot(false), 3);
  var notWith = curriable.curry(createNot(true), 4);
  var remove = curriable.curry(createRemove(false), 2);
  var removeWith = curriable.curry(createRemove(true), 3);
  var set = curriable.curry(createSet(false), 3);
  var setWith = curriable.curry(createSet(true), 3);
  exports.__ = curriable.__;
  exports.add = add;
  exports.addWith = addWith;
  exports.assign = assign$1;
  exports.assignWith = assignWith;
  exports.call = call;
  exports.callWith = callWith;
  exports.get = get;
  exports.getOr = getOr;
  exports.getWith = getWith;
  exports.getWithOr = getWithOr;
  exports.has = has;
  exports.hasWith = hasWith;
  exports.is = is;
  exports.isWith = isWith;
  exports.merge = merge;
  exports.mergeWith = mergeWith;
  exports.not = not;
  exports.notWith = notWith;
  exports.remove = remove;
  exports.removeWith = removeWith;
  exports.set = set;
  exports.setWith = setWith;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{"curriable":"../node_modules/curriable/dist/curriable.js","pathington":"../node_modules/pathington/es/index.js"}],"../node_modules/selectorator/dist/selectorator.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('identitate'), require('fast-equals'), require('reselect'), require('unchanged')) :
  typeof define === 'function' && define.amd ? define(['exports', 'identitate', 'fast-equals', 'reselect', 'unchanged'], factory) :
  (global = global || self, factory(global.selectorator = {}, global.identitate, global.fe, global.Reselect, global.unchanged));
}(this, function (exports, identitate, fastEquals, reselect, unchanged) { 'use strict';

  var INVALID_ARRAY_PATHS_MESSAGE = 'You have not provided any values for paths, so no values can be retrieved from state.';
  var INVALID_PATHS_MESSAGE = [
      'First parameter passed must be either an array or a plain object.',
      'If you are creating a standard selector, pass an array of either',
      'properties on the state to retrieve, or custom selector functions.',
      'If creating a structured selector, pass a plain object with source',
      'and destination properties, where source is an array of properties',
      'or custom selector functions, and destination is an array of property',
      'names to assign the values from source to.',
  ].join(' ');
  var INVALID_OBJECT_PATH_MESSAGE = "\nWhen providing an object path, you must provide the following properties:\n  * path: the path to retrieve, e.g. \"foo.bar\"\n  * argIndx: the index of the argument to retrieve the path from\n".trim();
  var INVALID_PATH_MESSAGE = "\nPath provided is of invalid type. It can be any one of the following values:\n  * Dot-bracket notation, e.g. \"foo.bar\" or \"bar[0].baz\"\n  * Number index, e.g. 0\n  * Object {path, argIndex}, e.g. {path: \"foo.bar\", argIndex: 1}\n  * Selector function\n".trim();

  // external dependencies
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * @private
   *
   * @function isFunctionPath
   *
   * @description
   * is the path a function
   *
   * @param path the path to test
   * @param type the typeof value for the path
   * @returns is the path a function
   */
  var isFunctionPath = function (path, type) { return type === 'function'; };
  /**
   * @private
   *
   * @function isObjectPath
   *
   * @description
   * is the path an object
   *
   * @param path the path to test
   * @param type the typeof value for the path
   * @returns is the path an object
   */
  var isObjectPath = function (path, type) { return !!path && type === 'object'; };
  /**
   * @private
   *
   * @function isUnchangedPath
   *
   * @description
   * is the path an unchanged path value
   *
   * @param path the path to test
   * @param type the typeof value for the path
   * @returns is the path an unchanged path value
   */
  var isUnchangedPath = function (path, type) {
      return type === 'string' || type === 'number' || Array.isArray(path);
  };
  /**
   * @private
   *
   * @function createIdentitySelector
   *
   * @description
   * based on the path passed, create the identity function for it or return the function itself
   *
   * @param path nested path to retrieve from the state object
   * @returns identity function to retrieve value from state for given property
   */
  var createIdentitySelector = function (path) {
      var type = typeof path;
      if (isFunctionPath(path, type)) {
          return path;
      }
      if (isUnchangedPath(path, type)) {
          return function (state) { return unchanged.get(path, state); };
      }
      if (isObjectPath(path, type)) {
          if (hasOwnProperty.call(path, 'path') &&
              hasOwnProperty.call(path, 'argIndex')) {
              var selectorIdentity_1 = identitate.createIdentity(path.argIndex);
              return function () {
                  return unchanged.get(path.path, selectorIdentity_1.apply(null, arguments));
              };
          }
          throw new ReferenceError(INVALID_OBJECT_PATH_MESSAGE);
      }
      throw new TypeError(INVALID_PATH_MESSAGE);
  };
  /**
   * @private
   *
   * @function getSelectorCreator
   *
   * @description
   * get the creator function to use when generating the selector
   *
   * @param deepEqual should the memoizer be based on strict equality
   * @param isEqual the custom equality method to use when comparing values
   * @param memoizer custom selector memoizer
   * @param memoizerParams custom parameters to pass to the memoizer function
   * @returns function to create selector with
   */
  var getSelectorCreator = function (_a) {
      var _b = _a.deepEqual, deepEqual = _b === void 0 ? false : _b, _c = _a.isEqual, isEqual = _c === void 0 ? fastEquals.sameValueZeroEqual : _c, memoizer = _a.memoizer, _d = _a.memoizerParams, memoizerParams = _d === void 0 ? [] : _d;
      var _e;
      var memoizerFn = memoizer || reselect.defaultMemoize;
      var equals = deepEqual ? fastEquals.deepEqual : isEqual;
      return (_e = reselect.createSelectorCreator).call.apply(_e, [// fix strict mode error
          null,
          memoizerFn,
          equals].concat(memoizerParams));
  };
  /**
   * @private
   *
   * @function getStandardSelector
   *
   * @description
   * get a standard selector based on the paths and getComputedValue provided
   *
   * @param paths paths to retrieve values from state from
   * @param selectorCreator function to create selector with
   * @param getComputedValue function to compute values with, receiving properties in state based
   *   on paths and returning computed values from them (defaults to pass-through identity function)
   * @returns selector to return computed value from state
   */
  var getStandardSelector = function (paths, selectorCreator, getComputedValue) {
      return selectorCreator(paths.map(createIdentitySelector), getComputedValue);
  };
  /**
   * @private
   *
   * @function getStructuredObject
   *
   * @description
   * get the structured object based on the computed selector values
   *
   * @param properties properties to assign values from state to
   * @returns object of property => selected value pairs
   */
  var getStructuredObject = function (properties) { return function () {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
      }
      return properties.reduce(function (structuredObject, property, index) {
          structuredObject[property] = values[index];
          return structuredObject;
      }, {});
  }; };
  /**
   * @private
   *
   * @function getStructuredSelector
   *
   * @description
   * get an object of property => selected value pairs bsaed on paths
   *
   * @param paths property => path pairs, where path is state value to retrieve and assign to property
   * @param selectorCreator function to create selector with
   * @returns selector to return structured values from state
   */
  var getStructuredSelector = function (paths, selectorCreator) {
      var destinationKeys = Object.keys(paths);
      var selectors = destinationKeys.map(function (key) { return createIdentitySelector(paths[key]); });
      return selectorCreator(selectors, getStructuredObject(destinationKeys));
  };

  // external dependencies
  function createSelector(// actual implementation - no changes
  paths, getComputedValue, options) {
      if (getComputedValue === void 0) { getComputedValue = identitate.identity; }
      if (options === void 0) { options = {}; }
      var selectorCreator = getSelectorCreator(options);
      if (Array.isArray(paths)) {
          if (!paths.length) {
              throw new ReferenceError(INVALID_ARRAY_PATHS_MESSAGE);
          }
          return getStandardSelector(paths, selectorCreator, getComputedValue);
      }
      // added null check
      if (paths && paths !== null && typeof paths === 'object') {
          return getStructuredSelector(paths, selectorCreator);
      }
      throw new TypeError(INVALID_PATHS_MESSAGE);
  }

  exports.default = createSelector;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


},{"identitate":"../node_modules/identitate/es/index.js","fast-equals":"../node_modules/fast-equals/dist/fast-equals.js","reselect":"../node_modules/reselect/es/index.js","unchanged":"../node_modules/unchanged/dist/unchanged.js"}],"../node_modules/redux-devtools-extension/index.js":[function(require,module,exports) {
"use strict";

var compose = require('redux').compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);

},{"redux":"../node_modules/redux/es/redux.js"}],"../node_modules/redux-thunk/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var _default = thunk;
exports.default = _default;
},{}],"../node_modules/invariant/browser.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if ("development" !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;
},{}],"../node_modules/json-stringify-safe/stringify.js":[function(require,module,exports) {
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],"../node_modules/redux-immutable-state-invariant/dist/isImmutable.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isImmutableDefault;
function isImmutableDefault(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null || typeof value === 'undefined';
}
},{}],"../node_modules/redux-immutable-state-invariant/dist/trackForMutations.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackForMutations;
function trackForMutations(isImmutable, ignore, obj) {
  var trackedProperties = trackProperties(isImmutable, ignore, obj);
  return {
    detectMutations: function detectMutations() {
      return _detectMutations(isImmutable, ignore, trackedProperties, obj);
    }
  };
}

function trackProperties(isImmutable) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var obj = arguments[2];
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var tracked = { value: obj };

  if (!isImmutable(obj)) {
    tracked.children = {};

    for (var key in obj) {
      var childPath = path.concat(key);
      if (ignore.length && ignore.indexOf(childPath.join('.')) !== -1) {
        continue;
      }

      tracked.children[key] = trackProperties(isImmutable, ignore, obj[key], childPath);
    }
  }
  return tracked;
}

function _detectMutations(isImmutable) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var trackedProperty = arguments[2];
  var obj = arguments[3];
  var sameParentRef = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var path = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

  var prevObj = trackedProperty ? trackedProperty.value : undefined;

  var sameRef = prevObj === obj;

  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return { wasMutated: true, path: path };
  }

  if (isImmutable(prevObj) || isImmutable(obj)) {
    return { wasMutated: false };
  }

  // Gather all keys from prev (tracked) and after objs
  var keysToDetect = {};
  Object.keys(trackedProperty.children).forEach(function (key) {
    keysToDetect[key] = true;
  });
  Object.keys(obj).forEach(function (key) {
    keysToDetect[key] = true;
  });

  var keys = Object.keys(keysToDetect);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var childPath = path.concat(key);
    if (ignore.length && ignore.indexOf(childPath.join('.')) !== -1) {
      continue;
    }

    var result = _detectMutations(isImmutable, ignore, trackedProperty.children[key], obj[key], sameRef, childPath);

    if (result.wasMutated) {
      return result;
    }
  }
  return { wasMutated: false };
}
},{}],"../node_modules/redux-immutable-state-invariant/dist/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = immutableStateInvariantMiddleware;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _isImmutable = require('./isImmutable');

var _isImmutable2 = _interopRequireDefault(_isImmutable);

var _trackForMutations = require('./trackForMutations');

var _trackForMutations2 = _interopRequireDefault(_trackForMutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BETWEEN_DISPATCHES_MESSAGE = ['A state mutation was detected between dispatches, in the path `%s`.', 'This may cause incorrect behavior.', '(http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments)'].join(' ');

var INSIDE_DISPATCH_MESSAGE = ['A state mutation was detected inside a dispatch, in the path: `%s`.', 'Take a look at the reducer(s) handling the action %s.', '(http://redux.js.org/docs/Troubleshooting.html#never-mutate-reducer-arguments)'].join(' ');

function immutableStateInvariantMiddleware() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$isImmutable = options.isImmutable,
      isImmutable = _options$isImmutable === undefined ? _isImmutable2.default : _options$isImmutable,
      ignore = options.ignore;

  var track = _trackForMutations2.default.bind(null, isImmutable, ignore);

  return function (_ref) {
    var getState = _ref.getState;

    var state = getState();
    var tracker = track(state);

    var result = void 0;
    return function (next) {
      return function (action) {
        state = getState();

        result = tracker.detectMutations();
        // Track before potentially not meeting the invariant
        tracker = track(state);

        (0, _invariant2.default)(!result.wasMutated, BETWEEN_DISPATCHES_MESSAGE, (result.path || []).join('.'));

        var dispatchedAction = next(action);
        state = getState();

        result = tracker.detectMutations();
        // Track before potentially not meeting the invariant
        tracker = track(state);

        result.wasMutated && (0, _invariant2.default)(!result.wasMutated, INSIDE_DISPATCH_MESSAGE, (result.path || []).join('.'), (0, _jsonStringifySafe2.default)(action));

        return dispatchedAction;
      };
    };
  };
}
},{"invariant":"../node_modules/invariant/browser.js","json-stringify-safe":"../node_modules/json-stringify-safe/stringify.js","./isImmutable":"../node_modules/redux-immutable-state-invariant/dist/isImmutable.js","./trackForMutations":"../node_modules/redux-immutable-state-invariant/dist/trackForMutations.js"}],"../node_modules/redux-starter-kit/dist/redux-starter-kit.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;
exports.getDefaultMiddleware = getDefaultMiddleware;
exports.createAction = createAction;
exports.getType = getType;
exports.createReducer = createReducer;
exports.createSlice = createSlice;
exports.createSerializableStateInvariantMiddleware = createSerializableStateInvariantMiddleware;
exports.isPlain = isPlain;
Object.defineProperty(exports, "combineReducers", {
  enumerable: true,
  get: function () {
    return _redux.combineReducers;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function () {
    return _redux.compose;
  }
});
Object.defineProperty(exports, "createNextState", {
  enumerable: true,
  get: function () {
    return _immer.default;
  }
});
Object.defineProperty(exports, "createSelector", {
  enumerable: true,
  get: function () {
    return _selectorator.default;
  }
});

var _redux = require("redux");

var _immer = _interopRequireDefault(require("immer"));

var _selectorator = _interopRequireDefault(require("selectorator"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
/**
 * Returns true if the passed value is "plain" object, i.e. an object whose
 * protoype is the root `Object.prototype`. This includes objects created
 * using object literals, but not for instance for class instances.
 *
 * @param {any} value The value to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */


function isPlainObject(value) {
  if (_typeof(value) !== 'object' || value === null) return false;
  var proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
/**
 * Returns true if the passed value is "plain", i.e. a value that is either
 * directly JSON-serializable (boolean, number, string, array, plain object)
 * or `undefined`.
 *
 * @param val The value to check.
 */


function isPlain(val) {
  return typeof val === 'undefined' || val === null || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val) || isPlainObject(val);
}

var NON_SERIALIZABLE_STATE_MESSAGE = ['A non-serializable value was detected in the state, in the path: `%s`. Value: %o', 'Take a look at the reducer(s) handling this action type: %s.', '(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)'].join('\n');
var NON_SERIALIZABLE_ACTION_MESSAGE = ['A non-serializable value was detected in an action, in the path: `%s`. Value: %o', 'Take a look at the logic that dispatched this action:  %o.', '(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)'].join('\n');

function findNonSerializableValue(value) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var isSerializable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isPlain;
  var foundNestedSerializable;

  if (!isSerializable(value)) {
    return {
      keyPath: path.join('.') || '<root>',
      value: value
    };
  }

  if (_typeof(value) !== 'object' || value === null) {
    return false;
  }

  var _arr = Object.keys(value);

  for (var _i = 0; _i < _arr.length; _i++) {
    var property = _arr[_i];
    var nestedPath = path.concat(property);
    var nestedValue = value[property];

    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath.join('.'),
        value: nestedValue
      };
    }

    if (_typeof(nestedValue) === 'object') {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable);

      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }

  return false;
}
/**
 * Options for `createSerializableStateInvariantMiddleware()`.
 */

/**
 * Creates a middleware that, after every state change, checks if the new
 * state is serializable. If a non-serializable value is found within the
 * state, an error is printed to the console.
 *
 * @param options Middleware options.
 */


function createSerializableStateInvariantMiddleware() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$isSerializab = options.isSerializable,
      isSerializable = _options$isSerializab === void 0 ? isPlain : _options$isSerializab;
  return function (storeAPI) {
    return function (next) {
      return function (action) {
        var foundActionNonSerializableValue = findNonSerializableValue(action, [], isSerializable);

        if (foundActionNonSerializableValue) {
          var _keyPath = foundActionNonSerializableValue.keyPath,
              _value = foundActionNonSerializableValue.value;
          console.error(NON_SERIALIZABLE_ACTION_MESSAGE, _keyPath, _value, action);
        }

        var result = next(action);
        var state = storeAPI.getState();
        var foundStateNonSerializableValue = findNonSerializableValue(state);

        if (foundStateNonSerializableValue) {
          var _keyPath2 = foundStateNonSerializableValue.keyPath,
              _value2 = foundStateNonSerializableValue.value;
          console.error(NON_SERIALIZABLE_STATE_MESSAGE, _keyPath2, _value2, action.type);
        }

        return result;
      };
    };
  };
}

var IS_PRODUCTION = "development" === 'production';
/**
 * Returns any array containing the default middleware installed by
 * `configureStore()`. Useful if you want to configure your store with a custom
 * `middleware` array but still keep the default set.
 *
 * @return The default middleware used by `configureStore()`.
 */

function getDefaultMiddleware() {
  var middlewareArray = [_reduxThunk.default];

  if ("development" !== 'production') {
    var createImmutableStateInvariantMiddleware = require('redux-immutable-state-invariant').default;

    middlewareArray = [createImmutableStateInvariantMiddleware(), _reduxThunk.default, createSerializableStateInvariantMiddleware()];
  }

  return middlewareArray;
}
/**
 * Options for `configureStore()`.
 */

/**
 * A friendly abstraction over the standard Redux `createStore()` function.
 *
 * @param config The store configuration.
 * @returns A configured Redux store.
 */


function configureStore(options) {
  var _ref = options || {},
      _ref$reducer = _ref.reducer,
      reducer = _ref$reducer === void 0 ? undefined : _ref$reducer,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === void 0 ? getDefaultMiddleware() : _ref$middleware,
      _ref$devTools = _ref.devTools,
      devTools = _ref$devTools === void 0 ? true : _ref$devTools,
      _ref$preloadedState = _ref.preloadedState,
      preloadedState = _ref$preloadedState === void 0 ? undefined : _ref$preloadedState,
      _ref$enhancers = _ref.enhancers,
      enhancers = _ref$enhancers === void 0 ? [] : _ref$enhancers;

  var rootReducer;

  if (typeof reducer === 'function') {
    rootReducer = reducer;
  } else if (isPlainObject(reducer)) {
    rootReducer = (0, _redux.combineReducers)(reducer);
  } else {
    throw new Error('Reducer argument must be a function or an object of functions that can be passed to combineReducers');
  }

  var middlewareEnhancer = _redux.applyMiddleware.apply(void 0, _toConsumableArray(middleware));

  var finalCompose = _redux.compose;

  if (devTools) {
    finalCompose = (0, _reduxDevtoolsExtension.composeWithDevTools)({
      // Enable capture of stack traces for dispatched Redux actions
      // @ts-ignore redux-devtools-extension doesn't have `trace` defined in
      // its type definition file yet:
      //
      // https://github.com/zalmoxisus/redux-devtools-extension/pull/624
      trace: !IS_PRODUCTION
    });
  }

  var storeEnhancers = [middlewareEnhancer].concat(_toConsumableArray(enhancers));
  var composedEnhancer = finalCompose.apply(void 0, _toConsumableArray(storeEnhancers));
  return (0, _redux.createStore)(rootReducer, preloadedState, composedEnhancer);
}
/**
 * An action with a string type and an associated payload. This is the
 * type of action returned by `createAction()` action creators.
 *
 * @template P The type of the action's payload.
 * @template T the type used for the action type.
 */

/**
 * An action creator that produces actions with a `payload` attribute.
 */

/**
 * A utility function to create an action creator for the given action type
 * string. The action creator accepts a single argument, which will be included
 * in the action object as a field called payload. The action creator function
 * will also have its toString() overriden so that it returns the action type,
 * allowing it to be used in reducer logic that is looking for that action type.
 *
 * @param type The action type to use for created actions.
 */


function createAction(type) {
  function actionCreator(payload) {
    return {
      type: type,
      payload: payload
    };
  }

  actionCreator.toString = function () {
    return "".concat(type);
  };

  actionCreator.type = type;
  return actionCreator;
}
/**
 * Returns the action type of the actions created by the passed
 * `createAction()`-generated action creator (arbitrary action creators
 * are not supported).
 *
 * @param action The action creator whose action type to get.
 * @returns The action type used by the action creator.
 */


function getType(actionCreator) {
  return "".concat(actionCreator);
}
/**
 * A utility function that allows defining a reducer as a mapping from action
 * type to *case reducer* functions that handle these action types. The
 * reducer's initial state is passed as the first argument.
 *
 * The body of every case reducer is implicitly wrapped with a call to
 * `produce()` from the [immer](https://github.com/mweststrate/immer) library.
 * This means that rather than returning a new state object, you can also
 * mutate the passed-in state object directly; these mutations will then be
 * automatically and efficiently translated into copies, giving you both
 * convenience and immutability.
 *
 * @param initialState The initial state to be returned by the reducer.
 * @param actionsMap A mapping from action types to action-type-specific
 *   case redeucers.
 */


function createReducer(initialState, actionsMap) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined; // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
    // than an Immutable<S>, and TypeScript cannot find out how to reconcile
    // these two types.

    return (0, _immer.default)(state, function (draft) {
      var caseReducer = actionsMap[action.type];
      return caseReducer ? caseReducer(draft, action) : undefined;
    });
  };
}

function createSliceSelector(slice) {
  if (!slice) {
    return function (state) {
      return state;
    };
  }

  return function (state) {
    return state[slice];
  };
}

function createSelectorName(slice) {
  if (!slice) {
    return 'getState';
  }

  return camelize("get ".concat(slice));
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '').replace(/[-_]/g, '');
}
/**
 * An action creator atttached to a slice.
 */


function getType$1(slice, actionKey) {
  return slice ? "".concat(slice, "/").concat(actionKey) : actionKey;
}
/**
 * A function that accepts an initial state, an object full of reducer
 * functions, and optionally a "slice name", and automatically generates
 * action creators, action types, and selectors that correspond to the
 * reducers and state.
 *
 * The `reducer` argument is passed to `createReducer()`.
 */


function createSlice(options) {
  var _options$slice = options.slice,
      slice = _options$slice === void 0 ? '' : _options$slice,
      initialState = options.initialState;
  var reducers = options.reducers || {};
  var extraReducers = options.extraReducers || {};
  var actionKeys = Object.keys(reducers);
  var reducerMap = actionKeys.reduce(function (map, actionKey) {
    map[getType$1(slice, actionKey)] = reducers[actionKey];
    return map;
  }, extraReducers);
  var reducer = createReducer(initialState, reducerMap);
  var actionMap = actionKeys.reduce(function (map, action) {
    var type = getType$1(slice, action);
    map[action] = createAction(type);
    return map;
  }, {});

  var selectors = _defineProperty({}, createSelectorName(slice), createSliceSelector(slice));

  return {
    slice: slice,
    reducer: reducer,
    actions: actionMap,
    selectors: selectors
  };
} // types using the `export { ... } from` syntax. Because it compiles
// modules, independently, it has no way of knowing whether an identifier
// refers to a type or value, and thus cannot strip the type re-exports
// out of the generated JS.
//
// https://github.com/babel/babel/issues/8361
//
// As a workaround, the root of this repository contains an `index.d.ts`
// that contains all type re-exports. Whenever adding a new public function
// or type, remember to export it in `index.d.ts` as well.
},{"redux":"../node_modules/redux/es/redux.js","immer":"../node_modules/immer/dist/immer.module.js","selectorator":"../node_modules/selectorator/dist/selectorator.js","redux-devtools-extension":"../node_modules/redux-devtools-extension/index.js","redux-thunk":"../node_modules/redux-thunk/es/index.js","redux-immutable-state-invariant":"../node_modules/redux-immutable-state-invariant/dist/index.js"}],"reducers/login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoginReducer;
var initialState = {
  token: "",
  name: "",
  email: ""
};

function LoginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case 'SIGN_IN':
      return Object.assign({}, state, payload);

    case 'SIGN_OUT':
      return Object.assign({}, state, payload);

    default:
      return state;
  }
}
},{}],"reducers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  LoginReducer: _login.default
});

exports.default = _default;
},{"redux":"../node_modules/redux/es/redux.js","./login":"reducers/login.js"}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxStarterKit = require("redux-starter-kit");

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _reduxStarterKit.configureStore)({
  reducer: _reducers.default
});
var _default = store;
exports.default = _default;
},{"redux-starter-kit":"../node_modules/redux-starter-kit/dist/redux-starter-kit.esm.js","../reducers":"reducers/index.js"}],"actions/index.js":[function(require,module,exports) {
var signIn = function signIn(text) {
  return {
    type: 'SIGN_IN'
  };
};

var signOut = function signOut(text) {
  return {
    type: 'SIGN_OUT'
  };
};
},{}],"components/login/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actions = require("../../actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Login =
/*#__PURE__*/
function () {
  function Login(store) {
    _classCallCheck(this, Login);

    this.store = store;
    this.value = null;
    this.init();
  }

  _createClass(Login, [{
    key: "init",
    value: function init() {
      this.store.dispatch({
        type: 'SIGN_IN',
        payload: {
          token: "1",
          name: "adasdsd",
          email: "3"
        }
      });
      console.log(this.store.getState());
    }
  }, {
    key: "render",
    value: function render() {
      return "<a href='/' data-page=\"/\">Login</a>";
    }
  }]);

  return Login;
}();

exports.default = Login;
;
},{"../../actions":"actions/index.js"}],"components/homepage/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actions = require("../../actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Homepage =
/*#__PURE__*/
function () {
  function Homepage(store) {
    _classCallCheck(this, Homepage);

    this.store = store;
    this.value = null;
    this.init();
  }

  _createClass(Homepage, [{
    key: "init",
    value: function init() {
      this.store.dispatch({
        type: 'SIGN_IN',
        payload: {
          token: "1",
          name: "adasdsd",
          email: "3"
        }
      });
      console.log(this.store.getState());
    }
  }, {
    key: "render",
    value: function render() {
      return "<a href='/login' data-page=\"/login/123\">Homepage</a>";
    }
  }]);

  return Homepage;
}();

exports.default = Homepage;
;
},{"../../actions":"actions/index.js"}],"components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Login", {
  enumerable: true,
  get: function () {
    return _login.default;
  }
});
Object.defineProperty(exports, "Homepage", {
  enumerable: true,
  get: function () {
    return _homepage.default;
  }
});

var _login = _interopRequireDefault(require("./login"));

var _homepage = _interopRequireDefault(require("./homepage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./login":"components/login/index.js","./homepage":"components/homepage/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _store = _interopRequireDefault(require("./store"));

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Siru =
/*#__PURE__*/
function () {
  function Siru() {
    _classCallCheck(this, Siru);

    // Components
    this.LoginComponent = new _components.Login(_store.default).render();
    this.HomepageComponent = new _components.Homepage(_store.default).render(); // Routes

    this.routes = {
      '/login': this.LoginComponent,
      '/': this.HomepageComponent // Events

    };
    this.events = this.events.bind(this);
    this.push = this.push.bind(this);
    this.start = this.start.bind(this); // DOM

    this.app = document.getElementById('app');
    this.app.innerHTML = this.routes[window.location.pathname]; // Start

    this.start();
  }

  _createClass(Siru, [{
    key: "push",
    value: function push(pathName) {
      window.history.pushState({}, pathName, window.location.origin + pathName);
      this.app.innerHTML = this.routes[pathName];
    }
  }, {
    key: "events",
    value: function events() {
      var self = this;
      self.app.addEventListener('click', function (e) {
        if (e.target != e.currentTarget) {
          e.preventDefault();
          self.push(e.target.dataset.page);
        }

        e.stopPropagation();
      }, false);

      window.onpopstate = function () {
        self.app.innerHTML = self.routes[window.location.pathname];
      };
    }
  }, {
    key: "start",
    value: function start() {
      this.events();
    }
  }]);

  return Siru;
}();

var app = new Siru();
app;
Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
});
},{"./store":"store/index.js","./components":"components/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51643" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
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

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
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
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/public.e31bb0bc.map