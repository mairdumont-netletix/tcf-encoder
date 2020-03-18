import { NumberEncoder } from '../base';
import { Decoded, Encoder } from '../interfaces';
import { IdSet, PurposeRestriction, PurposeRestrictions } from '../model';
import { Singleton } from '../utils';
import { IdSetRangeEncoder } from './id-set-range-encoder';

export class PurposeRestrictionsEncoder implements Encoder<PurposeRestrictions> {

  public encode(value: PurposeRestrictions): string {
    const numberEncoder = Singleton.of(NumberEncoder);
    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    let bitString = numberEncoder.encode(value.numRestrictions, 12);

    value.getRestrictions().forEach((restriction: PurposeRestriction): void => {

      // every restriction group has the purposeId and the restrictionType;
      bitString += numberEncoder.encode(restriction.purposeId, 6);
      bitString += numberEncoder.encode(restriction.restrictionType, 2);

      // now get all the vendors under that restriction
      const vendors: IdSet = value.getVendors(restriction);
      bitString += new IdSetRangeEncoder(vendors.maxId).encode(vendors);
    });

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
