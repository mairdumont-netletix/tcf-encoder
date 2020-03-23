import { Singleton } from '../utils';
import { LanguageEncoder } from './language-encoder';

describe('LanguageEncoder', (): void => {

  let encoder: LanguageEncoder;

  beforeEach(() => {
    encoder = Singleton.of(LanguageEncoder);
  })

  describe('encode', (): void => {
    const shouldBeOk = (input: string, numBits: number, expected: string): void => {
      it(`should encode "${input}" into ${numBits}bit as "${expected}"`, (): void => {
        const encoded = encoder.encode(input, { numBits });
        expect(encoded).toBe(expected);
      });
    };

    const shouldBeNotOk = (input: string, numBits: number, reason: string): void => {
      it(`should not encode "${input}" into ${numBits}bit: ${reason}`, (): void => {
        expect(() => encoder.encode(input, { numBits })).toThrow();
      });
    };

    shouldBeOk('aa', 12, '000000000000');
    shouldBeOk('AA', 12, '000000000000');
    shouldBeOk('ba', 12, '000001000000');
    shouldBeOk('Ba', 12, '000001000000');
    shouldBeOk('DE', 12, '000011000100');
    shouldBeOk('US', 12, '010100010010');
    shouldBeOk('zz', 12, '011001011001');
    shouldBeOk('ZZ', 12, '011001011001');

    shouldBeNotOk('{Z', 12, '"{" is just after "Z"');
    shouldBeNotOk('-Z', 12, '"-" is before "A"');
    shouldBeNotOk('US', 11, 'cannot encode into odd number of bits');
    shouldBeNotOk('ZZ', 8, 'will not fit into 4 bits per letter');
  });

  describe('decode', (): void => {
    it('should decode an encoded language', (): void => {
      const { decoded } = encoder.decode('000101010001');
      expect(decoded).toBe('FR');
    });

    it('should throw an error if the bit length is odd', (): void => {
      expect(() => encoder.decode('0' + '000101010001')).toThrowError(/numBits must be even/);
    });
  });
});
