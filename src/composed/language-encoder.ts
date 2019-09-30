import { NumberEncoder } from "../base";
import { Decoded, Encoder } from "../interfaces";

export class LanguageEncoder implements Encoder<string> {

  private numberEncoder = new NumberEncoder();

  private DICT: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  private readonly DICT2 = Array.from(this.DICT).reduce((p, c, i) => {
    p[c] = i;
    return p;
  }, <{ [c: string]: number }>{});

  encode(value: string, numBits: number): string {
    if (numBits % 2 === 1) {
      throw new Error('numBits must be even');
    }
    if (!/^[A-Z]{2}$/i.test(value)) {
      throw new Error('Invalid Language Code');
    }
    const bits = numBits / 2;
    const [firstLetter, secondLetter] = value.toUpperCase();
    const firstLetterEncoded = this.numberEncoder.encode(this.DICT2[firstLetter], bits);
    const secondLetterEncoded = this.numberEncoder.encode(this.DICT2[secondLetter], bits);
    return firstLetterEncoded + secondLetterEncoded;
  }

  decode(value: string): Decoded<string> {
    if (value.length < 2) {
      throw new Error('Invalid Language Code');
    }
    if (value.length % 2 === 1) {
      throw new Error('numBits must be even');
    }
    const halfLength = value.length / 2;
    const { numBits: firstLetterBits, decoded: firstLetterNumber } = this.numberEncoder.decode(value.slice(0, halfLength));
    const { numBits: secondLetterBits, decoded: secondLetterNumber } = this.numberEncoder.decode(value.slice(halfLength));
    return {
      numBits: firstLetterBits + secondLetterBits,
      decoded: this.DICT[firstLetterNumber] + this.DICT[secondLetterNumber],
    }
  }
}
