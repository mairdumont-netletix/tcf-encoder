import { Singleton } from '../utils';
import { BooleanEncoder } from './boolean-encoder';

describe('BooleanEncoder', (): void => {

  let encoder: BooleanEncoder;

  beforeEach(() => {
    encoder = Singleton.of(BooleanEncoder);
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
      const { decoded } = encoder.decode('1');
      expect(decoded).toBe(true);
    });

    it('should decode 0 to false', (): void => {
      const { decoded } = encoder.decode('0');
      expect(decoded).toBe(false);
    });
  });
});
