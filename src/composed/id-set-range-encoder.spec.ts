import { IdSet } from '../model';
import { IdSetRangeEncoder } from './id-set-range-encoder';

describe('IdSetRangeEncoder', (): void => {

  describe('encode', (): void => {
    it('should encode a range list', (): void => {
      const input = new IdSet([1, 2, 3, 4, 5, 6, 50, 101, 102, 103, 104]);
      const expected = '' +
        '0' + // defaultValue
        '000000000011' + // 12 bit numEntries = 3
        '1' + '0000000000000001' + '0000000000000110' + // range 1-6
        '0' + '0000000000110010' + // single 50
        '1' + '0000000001100101' + '0000000001101000'; // range 101 - 104
      const encoded = new IdSetRangeEncoder(input.maxId).encode(input);
      expect(encoded).toBe(expected);
    });
  });

  describe('decode', (): void => {
    it('should decode a range with 0 as default', (): void => {
      const input = '' +
        '0' + // defaultValue
        '000000000011' + // 12 bit numEntries = 3
        '1' + '0000000000000001' + '0000000000000110' + // range 1-6
        '0' + '0000000000110010' + // single 50
        '1' + '0000000001100101' + '0000000001101000'; // range 101 - 104
      const expected = new IdSet([1, 2, 3, 4, 5, 6, 50, 101, 102, 103, 104]);
      const { decoded } = new IdSetRangeEncoder(104).decode(input);
      expect(decoded).toStrictEqual(expected);
    });
    // TODO: how to do default 1?
    it('should decode a range with 1 as default', (): void => {
      const input = '' +
        '1' + // defaultValue
        '000000000001' + // 12 bit numEntries = 1
        '1' + '0000000000000010' + '0000000000000110'; // range 2-6
      const expected = new IdSet([1, 7]);
      const { decoded } = new IdSetRangeEncoder(7).decode(input);
      expect(decoded).toStrictEqual(expected);
    });
  });
});
