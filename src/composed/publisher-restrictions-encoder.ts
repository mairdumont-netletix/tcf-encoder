import { NumberEncoder } from "../base";
import { Decoded, Encoder } from "../interfaces";
import { PublisherRestrictions } from "../model";

export class PublisherRestrictionsEncoder implements Encoder<PublisherRestrictions> {

  private static instance: PublisherRestrictionsEncoder | null;

  public static getInstance() {
    if (!PublisherRestrictionsEncoder.instance) {
      PublisherRestrictionsEncoder.instance = new PublisherRestrictionsEncoder();
    }
    return PublisherRestrictionsEncoder.instance;
  }

  private constructor() { }

  encode(value: PublisherRestrictions): string {
    const numberEncoder = NumberEncoder.getInstance();
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
