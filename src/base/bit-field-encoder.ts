import { BitField } from '@mdnx/tcf-types';
import { Decoded, Encoder } from '../interfaces';

export class BitFieldEncoder implements Encoder<BitField> {

  /**
   * Our 64 character set.
   * Notable is that the last two are web safe and not
   * the traditional +/ that are used in standard base64 encoding.
   */
  private readonly DICT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  /**
   * Reverse Dictonary.
   */
  private readonly DICT2 = Array.from(this.DICT).reduce((p, c, i) => {
    p[c] = i;
    return p;
  }, <{ [c: string]: number }>{});

  public encode(value: BitField): string {
    // BitField string should contain only 0 or 1 chars
    if (!/^[01]+$/.test(value)) {
      throw new Error('Invalid BitField');
    }
    // encode
    let retr = '';
    const len: number = value.length;
    for (let i = 0; i < len; i += 6) {
      // get a chunk of 6 bits from BitField
      let chunk: string = value.substr(i, 6);
      // the last chunk might have less than 6 bits, we need to pad them
      const pad = '0'.repeat(6 - chunk.length);
      chunk = chunk + pad;
      // convert the BitField to base64url encoding
      retr += this.DICT[parseInt(chunk, 2)];
    }
    return retr;
  }

  public decode(value: string): Decoded<BitField> {
    // should contain only characters from the base64url set
    if (!/^[A-Za-z0-9\-_]+$/.test(value)) {
      throw new Error('Invalid Base64url Encoding');
    }

    const len: number = value.length;
    let bitField = '';
    for (let i = 0; i < len; i++) {
      // index the binary value of the character from out reverse map
      const strBits = this.DICT2[value[i]].toString(2);
      // Since a bit string converted to an integer on encoding will lose leading zeros and
      // all encoded characters must fit into a six bit bucket we will pad to the left for all characters
      const pad = '0'.repeat(6 - strBits.length);
      // build BitField
      bitField += pad + strBits;
    }
    return {
      numBits: len,
      decoded: bitField,
    };
  }
}
