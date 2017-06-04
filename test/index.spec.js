import assert from 'assert';
import {createStore, observer} from '../src';


describe('mobx-weapp main', () => {
    let oldPage;
    let store;
    beforeEach(() => {
        global.Page = jest.fn();
        oldPage = Page;
        store = {};
        createStore(store);
    });

    it('exposes APIs', () => {
        expect(typeof createStore).toBe('function');
        expect(typeof observer).toBe('function');
    });
    it('creates proxy method for global Page', () => {
        expect(Page).not.toBe(oldPage);
        Page({});
        expect(oldPage).toHaveBeenCalled();
    });
    it('adds alias $store for store on Page options', () => {
        let options = {};
        Page(options);
        expect(options.$store).toBeDefined();
        expect(options.$store).toBe(store);
    });
    it('creates empty Page options if it is undefined', () => {
        expect(() => {
            Page();
        }).not.toThrow();
    })
})