import { BitFieldEncoder, NumberEncoder } from '../base';
import { Singleton } from './singleton';

export * from './singleton';

// first char will contain 6 bits, we only need the first numBits
export const inspectFirstBits = (chars: string, numBits: number): number => {
  const { decoded: firstBits } = Singleton.of(BitFieldEncoder).decode(chars[0]);
  const { decoded: value } = Singleton.of(NumberEncoder).decode(firstBits.substr(0, numBits));
  return value;
}

export const isIntegerGreaterThan = (input: any, above: number): boolean => (Number.isInteger(input) && input > above);
