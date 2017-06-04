import assert from 'assert';
import observer from '../src/observer';

describe('observer', () => {

    let options;
    beforeEach(() => {
        global.Page = jest.fn();
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
});