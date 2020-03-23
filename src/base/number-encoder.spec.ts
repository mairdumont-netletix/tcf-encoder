import { Singleton } from '../utils';
import { NumberEncoder } from './number-encoder';

describe('NumberEncoder', (): void => {

  let encoder: NumberEncoder;

  beforeEach(() => {
    encoder = Singleton.of(NumberEncoder);
  })

  describe('encode', (): void => {

    it('should encode an integer and pad zeros to fill width', (): void => {
      const encoded = encoder.encode(10, { numBits: 6 });
      // should have specified length
      expect(encoded.length).toBe(6);
      // should be padded
      expect(encoded).toBe('001010');
    });

    it('should throw an error if the int is too large for the number of bits', (): void => {
      expect(() => encoder.encode(10, { numBits: 3 })).toThrowError(/10 is too large to encode into 3 bits/);
    });

    it('should throw if a negative int is passed', (): void => {
      expect(() => encoder.encode(-1, { numBits: 3 })).toThrowError(/-1 is not a positive integer/);
    });

    it('should throw if numBits is negative', (): void => {
      expect(() => encoder.encode(1, { numBits: -1 })).toThrowError(/numBits not given/);
    });

    it('should throw if numBits is not given', (): void => {
      expect(() => encoder.encode(1, { numBits: undefined as unknown as number })).toThrowError(/numBits not given/);
    });
  });

  describe('decode', (): void => {

    it('should decode an int and pad zeros to fill width', (): void => {
      const { decoded } = encoder.decode('0001010');
      expect(decoded).toBe(10);
    });
  });
});
