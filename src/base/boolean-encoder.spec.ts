import { Encoder } from '../interfaces';
import { BooleanEncoder } from './boolean-encoder';

describe('BooleanEncoder', (): void => {

  let encoder: Encoder<boolean>;

  beforeEach(() => {
    encoder = new BooleanEncoder();
  })

  describe('encode', (): void => {

    it('should encode true to 1', (): void => {
      expect(encoder.encode(true)).toBe('1');
    });

    it('should encode false to 0', (): void => {
      expect(encoder.encode(false)).toBe('0');
    });
  });

  describe('decode', (): void => {

    it('should decode 1 to true', (): void => {
      expect(encoder.decode('1')).toBe(true);
    });

    it('should decode 0 to false', (): void => {
      expect(encoder.decode('0')).toBe(false);
    });
  });
});
