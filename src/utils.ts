import { BitFieldEncoder, NumberEncoder } from "./base";

const bitFieldEncoder = new BitFieldEncoder();
const numberEncoder = new NumberEncoder();

// first char will contain 6 bits, we only need the first numBits
export const inspectFirstBits = (chars: string, numBits: number): number => {
  const { decoded: firstBits } = bitFieldEncoder.decode(chars[0]);
  const { decoded: value } = numberEncoder.decode(firstBits.substr(0, numBits));
  return value;
}

export const isIntegerGreaterThan = (input: any, above: number): boolean => (Number.isInteger(input) && input > above);
