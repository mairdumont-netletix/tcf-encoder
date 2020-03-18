import { NumberEncoder } from '../base';
import { Decoded, Encoder } from '../interfaces';
import { PurposeRestrictions } from '../model';
import { Singleton } from '../utils';

export class PurposeRestrictionsEncoder implements Encoder<PurposeRestrictions> {

  public encode(value: PurposeRestrictions): string {
    const numberEncoder = Singleton.of(NumberEncoder);
    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    const bitString = numberEncoder.encode(0, 12);
    // TODO implement PurposeRestrictionsEncoder
    return bitString;
  }

  public decode(value: string): Decoded<PurposeRestrictions> {
    // TODO: implement decoding
    return {
      numBits: value.length,
      decoded: new PurposeRestrictions(),
    }
  }
}
