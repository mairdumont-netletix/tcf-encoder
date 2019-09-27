import { Encoder } from '../interfaces';
import { IdSet } from '../model/id-set';
import { IdSetLinearEncoder } from './id-set-linear-encoder';

describe('IdSetLinearEncoder', (): void => {

  let encoder: Encoder<IdSet>;

  beforeEach(() => {
    encoder = new IdSetLinearEncoder();
  })

  describe('encode', (): void => {

    it('should encode a idSet', (): void => {
      const idSet: IdSet = new IdSet([1, 2, 5]);
      const numBits = 10;

      const result = encoder.encode(idSet, numBits);

      expect(result.length).toBe(numBits);
      expect(result).toBe('1100100000');
    });
  });

  describe('decode', (): void => {

    it('should decode a idSet', (): void => {
      const idSetBits = '01100011101';

      const idSet = encoder.decode(idSetBits);

      expect(idSet.maxId).toBe(idSetBits.length);

      for (let i = 1; i <= idSetBits.length; i++) {
        if (idSetBits[i - 1] === '1') {
          expect(idSet.has(i)).toBeTruthy();
        } else {
          expect(idSet.has(i)).toBeFalsy();
        }
      }
    });
  });
});
