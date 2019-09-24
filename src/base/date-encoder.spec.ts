import { Encoder } from '../encoder';
import { DateEncoder } from './date-encoder';

describe('DateEncoder', (): void => {

  let encoder: Encoder<Date>;

  beforeEach(() => {
    encoder = new DateEncoder();
  })

  describe('encode', (): void => {

    it(`should encode a Date into 36 bits`, (): void => {
      const numBits = 36;
      const date: Date = new Date();
      const encoded = encoder.encode(date, numBits);

      let expected: string = Math.round(date.getTime() / 100).toString(2);

      // pad leading 0's
      expected = '0'.repeat(numBits - expected.length) + expected;

      expect(encoded.length).toBe(numBits);
      expect(encoded).toBe(expected);

    });

    it(`should not encode a Date into 26 bits`, (): void => {
      const numBits = 26;
      const date: Date = new Date();
      expect(() => encoder.encode(date, numBits)).toThrowError();
    });
  });

  describe('decode', (): void => {

    it(`should decode a Date`, (): void => {
      const date: Date = new Date();
      const encoded = encoder.encode(date, 36);
      const decoded = encoder.decode(encoded);
      const expected = Math.round(date.getTime() / 100) * 100;
      expect(decoded.getTime()).toBe(expected);
    });
  });
});
