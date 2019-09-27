import { Encoder } from '../interfaces';
import { IdSet } from '../model';
import { IdSetRangeEncoder } from './id-set-range-encoder';

describe('IdSetRangeEncoder', (): void => {

  let encoder: Encoder<IdSet>;

  beforeEach(() => {
    encoder = new IdSetRangeEncoder();
  })

  describe('encode', (): void => {
    it('should encode a range list', (): void => {
      const input = new IdSet([1, 2, 3, 4, 5, 6, 50, 101, 102, 103, 104]);
      const expected = '' +
        '000000000011' + // 12 bit numEntries = 3
        '1' + '0000000000000001' + '0000000000000110' + // range 1-6
        '0' + '0000000000110010' + // single 50
        '1' + '0000000001100101' + '0000000001101000'; // range 101 - 104
      const encoded = encoder.encode(input, input.maxId);
      expect(encoded).toBe(expected);
    });
  });
});
