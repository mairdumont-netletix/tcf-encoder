import { BitField } from '@mdnx/tcf-types';
import { Encoder } from '../interfaces';
import { BitFieldEncoder } from './bit-field-encoder';

describe('BitFieldEncoder', (): void => {

  let encoder: Encoder<BitField>;

  beforeEach(() => {
    encoder = new BitFieldEncoder();
  })

  const createRandomBinaryString = (length: number): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += Math.round(Math.random());
    }
    return str;
  };

  const shouldEncodeAndDecode = (input: string) => {
    it(`should encode and decode ${input.length} bit long input`, (): void => {
      const encoded = encoder.encode(input);
      const { decoded } = encoder.decode(encoded);

      // there might be some additional zeros added to the end if the string is
      // an arbitrary length and doesn't fit evenly into 6 bits
      let expected = input;
      if (expected.length % 6 !== 0) {
        expected += '0'.repeat(6 - (expected.length % 6));
      }

      expect(decoded).toBe(expected);
    });
  }

  shouldEncodeAndDecode('01');
  shouldEncodeAndDecode(createRandomBinaryString(4));
  shouldEncodeAndDecode(createRandomBinaryString(8));
  shouldEncodeAndDecode(createRandomBinaryString(16));
  shouldEncodeAndDecode(createRandomBinaryString(32));
  shouldEncodeAndDecode(createRandomBinaryString(64));
  shouldEncodeAndDecode(createRandomBinaryString(128));
  shouldEncodeAndDecode(createRandomBinaryString(256));
  shouldEncodeAndDecode(createRandomBinaryString(512));
  shouldEncodeAndDecode(createRandomBinaryString(1024));
  shouldEncodeAndDecode(createRandomBinaryString(2048));

  it('should encode theese fixtures', (): void => {
    expect(encoder.encode('010')).toBe('Q');
    expect(encoder.encode('010000')).toBe('Q');
    expect(encoder.encode('000011')).toBe('D');
    expect(encoder.encode('00001100')).toBe('DA');
  });

  it('should throw an error if non-binary string is passed to encode', (): void => {
    const notABinaryString = '01helloworld';
    expect(() => encoder.encode(notABinaryString)).toThrowError(/Invalid BitField/);
  });

  it('should throw an error non-base64url string is passed to decode', (): void => {
    const notABase64UrlString = 'not;base64';
    expect(() => encoder.decode(notABase64UrlString)).toThrowError(/Invalid Base64url Encoding/);
  });
});
