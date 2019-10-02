import { Encoder } from '../interfaces';
import { LanguageEncoder } from './language-encoder';

describe('LanguageEncoder', (): void => {

  let encoder: Encoder<string>;

  beforeEach(() => {
    encoder = LanguageEncoder.getInstance();
  })

  describe('encode', (): void => {
    const shouldBeOk = (input: string, bits: number, expected: string): void => {
      it(`should encode "${input}" into ${bits}bits as "${expected}"`, (): void => {
        const encoded = encoder.encode(input, bits);
        expect(encoded).toBe(expected);
      });
    };

    const shouldBeNotOk = (input: string, bits: number, reason: string): void => {
      it(`should not encode "${input}" into ${bits}: ${reason}`, (): void => {
        expect(() => encoder.encode(input, bits)).toThrow();
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
});
