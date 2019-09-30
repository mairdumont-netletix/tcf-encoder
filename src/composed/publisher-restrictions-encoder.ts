import { NumberEncoder } from "../base";
import { Decoded, Encoder } from "../interfaces";
import { PublisherRestrictions } from "../model";

export class PublisherRestrictionsEncoder implements Encoder<PublisherRestrictions> {

  private numberEncoder = new NumberEncoder();

  encode(value: PublisherRestrictions): string {
    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    const bitString = this.numberEncoder.encode(0, 12);
    // TODO implement PublisherRestrictionsEncoder
    return bitString;
  }

  decode(value: string): Decoded<PublisherRestrictions> {
    // TODO: implement decoding
    return {
      numBits: value.length,
      decoded: new PublisherRestrictions(),
    }
  }
}
