import assert from 'assert';
import observer from '../src/observer';

describe('observer', () => {

    let options;
    beforeEach(() => {
        global.Page = jest.fn();
        global.App = jest.fn();
        options = {
            setData: jest.fn(),
        };
    });

    it('exposes observer function', () => {
        expect(typeof observer).toBe('function');
    });

    it('creates proxy methods for onLoad and onUnload', () => {
        let mapState = store => ({});
        let onLoad = jest.fn();
        let onUnload = jest.fn();
        options.onLoad = onLoad;
        options.onUnload = onUnload;

        options = observer(mapState)(options);
        expect(options.onLoad).not.toBe(onLoad);
        expect(options.onUnload).not.toBe(onUnload);

        options.onLoad();
        options.onUnload();
        expect(onLoad).toHaveBeenCalled();
        expect(onUnload).toHaveBeenCalled();
    });

    it('should pass original arguments into proxied onLoad and onUnload', () => {
        let onLoad = jest.fn();
        let onUnload = jest.fn();
        options.onLoad = onLoad;
        options.onUnload = onUnload;

        options = observer()(options);
        options.onLoad(1, 2);
        options.onUnload(1, 2);

        expect(onLoad.mock.calls[0]).toEqual([1, 2]);
        expect(onUnload.mock.calls[0]).toEqual([1, 2]);
    })

    it('should not create reaction when mapState is not defined', () => {
        options = observer()(options);
        expect(options.setData).not.toHaveBeenCalled();
    });

    it('should use empty object as options when it is not defined', () => {
        options = observer()();
        expect(typeof options).toBe('object');
    });

    it('passes store and data into mapActions helper', () => {
        options.$store = {};
        options.data = {};
        let mapActions = jest.fn();
        mapActions.mockReturnValue({
            getName: () => {},
            setName: () => {},
        });
        options = observer(null, mapActions)(options);
        options.onLoad();
        expect(mapActions.mock.calls[0][0]).toBe(options.$store);
        expect(mapActions.mock.calls[0][1]).toBe(options.data);
    })

});