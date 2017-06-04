import 'assert';
import {assert, warning} from '../src/utils';

describe('utils', () => {
    global.console = {
        warn: jest.fn()
    };

    it('throws when assert fails', () => {
        expect(() => {
            assert(false);
        }).toThrow();
    });
    it('warn in console when warning condition fails', () => {
        warning(false, '');
        expect(console.warn).toHaveBeenCalled();
    });
});