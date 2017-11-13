export default class StoreManager {
    static store = null;

    static getStore() {
      return this.store;
    }

    static setStore(store) {
      this.store = store;
    }
  }