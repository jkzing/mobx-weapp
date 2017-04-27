'use strict';

var _observer = require('./observer');

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __store = null;

var createStore = function createStore(store) {
  __store = store;
  var __Page = Page;
  Page = function (_Page) {
    function Page() {
      return _Page.apply(this, arguments);
    }

    Page.toString = function () {
      return _Page.toString();
    };

    return Page;
  }(function () {
    var view = arguments[0] || {};
    view.$store = store;
    __Page.apply(Page, arguments);
  });
};

module.exports = {
  createStore: createStore,
  observer: _observer2.default
};