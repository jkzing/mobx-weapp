import observer from './observer';

let __store = null;

const createStore = store => {
  __store = store;
  const __Page = Page;
  Page = function() {
    let view = arguments[0] || {};
    view.$store = store;
    __Page.apply(Page, arguments);
  }
};

module.exports = {
  createStore,
  observer,
};
