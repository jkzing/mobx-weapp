import assert from 'assert';
import observer from '../src/observer';

describe('observer', () => {
    it('exposes observer function', () => {
        expect(typeof observer).toBe('function');
    });
})