import { Encoder } from '../interfaces';
import { NumberEncoder } from './number-encoder';

describe('NumberEncoder', (): void => {

  let encoder: Encoder<number>;

  beforeEach(() => {
    encoder = new NumberEncoder();
  })

  describe('encode', (): void => {

    it('should encode an integer and pad zeros to fill width', (): void => {
      const theInt = 10;
      const bitLength = 6;
      const encoded = encoder.encode(theInt, bitLength);
      // should have specified length
      expect(encoded.length).toBe(bitLength);
      // should be padded
      expect(encoded).toBe('00' + (theInt).toString(2));
    });

    it('should throw an error if the int is too large for the number of bits', (): void => {
      expect(() => encoder.encode(10, 3)).toThrowError(/10 is too large to encode into 3 bits/);
    });

    it('should throw an error if a negative int is passed', (): void => {
      expect(() => encoder.encode(-1, 3)).toThrowError(/-1 is a negative number which can not be encoded/);
    });

  });

  describe('decode', (): void => {

    it('should decode an int and pad zeros to fill width', (): void => {
      const theInt = 10;
      const binaryString = '000' + theInt.toString(2);
      const decoded = encoder.decode(binaryString);
      expect(decoded).toBe(theInt);
    });
  });
});
