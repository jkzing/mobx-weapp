import observer from './observer';

let __store = null;

const createStore = store => {
  __store = store;
  const __Page = Page;
  Page = function() {
    const view = arguments[0] || {};
    view.$store = store;
    __Page.apply(Page, arguments);
  }

  const __App = App;
  App = function() {
    const app = arguments[0] || {};
    app.$store = store;
    __App.apply(App, arguments);
  }
};

module.exports = {
  createStore,
  observer,
};
