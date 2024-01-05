import { determineMinifigure, isEmptyObject } from './utils';
import series25Mapping from './jsons/minifigure_series_25.json';

describe('determineMinifigure', () => {
    it('returns unknown minifigure for an invalid QR code', () => {
        const qrString = 'X9999';
        expect(determineMinifigure(qrString)).toEqual({
            name: 'Unknown Minifigure',
            image: "unknown.png",
        });
    });
});

describe('isEmptyObject', () => {
    it('returns true for an empty object', () => {
        expect(isEmptyObject({})).toBeTruthy();
    });

    it('returns false for a non-empty object', () => {
        expect(isEmptyObject({ key: 'value' })).toBeFalsy();
    });

    it('returns false for non-object inputs', () => {
        expect(isEmptyObject(123)).toBeFalsy();
        expect(isEmptyObject('string')).toBeFalsy();
    });
});
