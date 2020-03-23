import { NumberEncoder } from '../base';
import { Decoded, Encoder } from '../interfaces';
import { Singleton } from '../utils';

export interface LanguageEncodingOptions {
  numBits: number;
}

export class LanguageEncoder implements Encoder<string, LanguageEncodingOptions> {

  private DICT: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  private readonly DICT2 = Array.from(this.DICT).reduce((p, c, i) => {
    p[c] = i;
    return p;
  }, <{ [c: string]: number }>{});

  public encode(value: string, { numBits }: LanguageEncodingOptions): string {
    if (numBits % 2 === 1) {
      throw new Error('numBits must be even');
    }
    if (!/^[A-Z]{2}$/i.test(value)) {
      throw new Error('Invalid Language Code');
    }
    const bits = numBits / 2;
    const [firstLetter, secondLetter] = value.toUpperCase();
    const numberEncoder = Singleton.of(NumberEncoder);
    const firstLetterEncoded = numberEncoder.encode(this.DICT2[firstLetter], { numBits: bits });
    const secondLetterEncoded = numberEncoder.encode(this.DICT2[secondLetter], { numBits: bits });
    return firstLetterEncoded + secondLetterEncoded;
  }

  public decode(value: string): Decoded<string> {
    if (value.length < 2) {
      throw new Error('Invalid Language Code');
    }
    if (value.length % 2 === 1) {
      throw new Error('numBits must be even');
    }
    const halfLength = value.length / 2;
    const numberEncoder = Singleton.of(NumberEncoder);
    const { numBits: firstLetterBits, decoded: firstLetterNumber } = numberEncoder.decode(value.slice(0, halfLength));
    const { numBits: secondLetterBits, decoded: secondLetterNumber } = numberEncoder.decode(value.slice(halfLength));
    return {
      numBits: firstLetterBits + secondLetterBits,
      decoded: this.DICT[firstLetterNumber] + this.DICT[secondLetterNumber],
    }
  }
}
