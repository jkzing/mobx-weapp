import assert from 'assert';
import {createStore, observer} from '../src';
import StoreMgr from '../src/store';


describe('mobx-weapp main', () => {
    let store;
    beforeEach(() => {
        store = {};
        createStore(store);
    });

    it('exposes APIs', () => {
        expect(typeof createStore).toBe('function');
        expect(typeof observer).toBe('function');
    });
    it('creates and saves store properly', () => {
        expect(StoreMgr.getStore()).toBe(store);
    });
})