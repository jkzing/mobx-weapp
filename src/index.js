import observer from './observer';
import StoreMgr from './store';

const createStore = store => {
  StoreMgr.setStore(store);
};

module.exports = {
  createStore,
  observer,
};
