import { NumberEncoder } from "../base";
import { Encoder } from "../interfaces";
import { PublisherRestrictions } from "../model";

export class PublisherRestrictionsEncoder implements Encoder<PublisherRestrictions> {

  private numberEncoder = new NumberEncoder();

  encode(value: PublisherRestrictions): string {
    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    const bitString = this.numberEncoder.encode(0, 12);
    // TODO implement PublisherRestrictionsEncoder
    return bitString;
  }

  decode(value: string): PublisherRestrictions {
    // TODO: implement decoding
    return new PublisherRestrictions();
  }
}
