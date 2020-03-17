import { Encoder } from '../interfaces';
import { Singleton } from '../utils';
import { NumberEncoder } from './number-encoder';

describe('NumberEncoder', (): void => {

  let encoder: Encoder<number>;

  beforeEach(() => {
    encoder = Singleton.of(NumberEncoder);
  })

  describe('encode', (): void => {

    it('should encode an integer and pad zeros to fill width', (): void => {
      const encoded = encoder.encode(10, 6);
      // should have specified length
      expect(encoded.length).toBe(6);
      // should be padded
      expect(encoded).toBe('001010');
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
      const { decoded } = encoder.decode('0001010');
      expect(decoded).toBe(10);
    });
  });
});
