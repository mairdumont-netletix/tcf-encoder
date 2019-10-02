import { Encoder } from '../interfaces';
import { IdSet } from '../model';
import { VendorEncoder } from './vendor-encoder';

describe('VendorEncoder', (): void => {

  let encoder: Encoder<IdSet>;

  beforeEach(() => {
    encoder = VendorEncoder.getInstance();
  })

  describe('encode', (): void => {
    it('should encode a list of vendors as range list', (): void => {
      const input = new IdSet([1, 2, 3, 4, 5, 6, 50, 101, 102, 103, 104]);
      const expected = '' +
        '0000000001101000' + // 16 bit maxId = 104
        '1' + // 1 bit rangeEncoding = RANGE
        '0' + // defaultValue
        '000000000011' + // 12 bit numEntries = 3
        '1' + '0000000000000001' + '0000000000000110' + // range 1-6
        '0' + '0000000000110010' + // single 50
        '1' + '0000000001100101' + '0000000001101000'; // range 101 - 104
      const encoded = encoder.encode(input, input.maxId);
      expect(encoded).toBe(expected);
    });

    it('should encode a list of vendors as bitstring', (): void => {
      const input = new IdSet([1, 3, 5, 7, 8]);
      const expected = '' +
        '0000000000001000' + // 16 bit maxId = 8
        '0' + // 1 bit rangeEncoding = FIELD
        '10101011'; // bitField
      const encoded = encoder.encode(input, input.maxId);
      expect(encoded).toBe(expected);
    });
  });

  describe('decode', (): void => {
    it('should produce same IdSet when encoding and decoding a range', (): void => {
      const input = new IdSet([1, 2, 3, 4, 5, 6, 50, 101, 102, 103, 104]);
      const encoded = encoder.encode(input, input.maxId);
      const { decoded } = encoder.decode(encoded);
      expect(decoded).toStrictEqual(input);
    });

    it('should produce same IdSet when encoding and decoding a bitstring', (): void => {
      const input = new IdSet([1, 3, 5, 7, 8]);
      const encoded = encoder.encode(input, input.maxId);
      const { decoded } = encoder.decode(encoded);
      expect(decoded).toStrictEqual(input);
    });
  });
});
