import { NumberEncoder } from "../base";
import { Decoded, Encoder } from "../interfaces";
import { PublisherRestrictions } from "../model";
import { Singleton } from "../utils";

export class PublisherRestrictionsEncoder implements Encoder<PublisherRestrictions> {

  encode(value: PublisherRestrictions): string {
    const numberEncoder = Singleton.of(NumberEncoder);
    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    const bitString = numberEncoder.encode(0, 12);
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
