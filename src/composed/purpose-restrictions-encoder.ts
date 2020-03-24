import { NumberEncoder } from '../base';
import { Decoded, Encoder } from '../interfaces';
import { IdSet, PurposeRestriction, PurposeRestrictions } from '../model';
import { Singleton } from '../utils';
import { IdSetRangeEncoder } from './id-set-range-encoder';

/**
 * Handles encoding/decoding of publisher/purpose restrictions.
 */
export class PurposeRestrictionsEncoder implements Encoder<PurposeRestrictions, never, never> {

  /**
   * Encodes a purpose restriction into a binary string.
   *
   * @param value purpose restriction to encode
   */
  public encode(value: PurposeRestrictions): string {
    const numberEncoder = Singleton.of(NumberEncoder);
    const idSetRangeEncoder = Singleton.of(IdSetRangeEncoder);

    // required NumPubRestrictions, 12 bit, Number of restriction records to follow
    let bitString = numberEncoder.encode(value.numRestrictions, { numBits: 12 });

    value.getRestrictions().forEach((restriction: PurposeRestriction): void => {

      // every restriction group has the purposeId and the restrictionType;
      bitString += numberEncoder.encode(restriction.purposeId, { numBits: 6 });
      bitString += numberEncoder.encode(restriction.restrictionType, { numBits: 2 });

      // now get all the vendors under that restriction
      const vendors: IdSet = value.getVendors(restriction);
      bitString += idSetRangeEncoder.encode(vendors);
    });

    return bitString;
  }

  /**
   * Decodes a binary string into a purpose restriction.
   *
   * @param value binary string to decode.
   */
  public decode(value: string): Decoded<PurposeRestrictions> {
    // TODO: implement decoding
    return {
      numBits: value.length,
      decoded: new PurposeRestrictions(),
    }
  }
}
