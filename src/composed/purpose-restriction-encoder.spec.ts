import { Encoder } from '../interfaces';
import { PurposeRestriction, PurposeRestrictions, RestrictionType } from '../model';
import { Singleton } from '../utils';
import { PurposeRestrictionsEncoder } from './purpose-restrictions-encoder';

describe('PurposeRestrictionEncoder', (): void => {

  let encoder: Encoder<PurposeRestrictions>;

  beforeEach(() => {
    encoder = Singleton.of(PurposeRestrictionsEncoder);
  })

  it('should encode one vendor with one restriction', (): void => {
    const purposeRestriction = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED);

    const purposeRestrictions = new PurposeRestrictions();
    purposeRestrictions.add(4, purposeRestriction);

    const encoded: string = encoder.encode(purposeRestrictions);
    expect(encoded).toBe(
      '000000000001' + // 12 bit - number of restriction records = 1
      '000010' + // 6 bit - purposeId = 2
      '00' + // 2 bit - restrictionType = 0 = NOT_ALLOWED
      '0' + // 1 bit - defaultValue for not mentioned purposes = false
      '000000000001' + // 12 bit - number of range records = 1
      '0' + // 1 bit - rangeType = 0 = SINGLE_ID
      '0000000000000100' // 16 bit - single vendorId = 4
    );
  });

  it('should encode multiple vendors with one restriction', (): void => {
    // using purposeRestriction1 and purposeRestriction2 with same values to test consolidation
    const purposeRestriction1 = new PurposeRestriction(3, RestrictionType.REQUIRE_CONSENT);
    const purposeRestriction2 = new PurposeRestriction(3, RestrictionType.REQUIRE_CONSENT);

    const purposeRestrictions = new PurposeRestrictions();
    purposeRestrictions.add(7, purposeRestriction1);
    purposeRestrictions.add(8, purposeRestriction1);
    purposeRestrictions.add(9, purposeRestriction2);

    const encoded: string = encoder.encode(purposeRestrictions);
    expect(encoded).toBe(
      '000000000001' + // 12 bit - number of restriction records = 1
      '000011' + // 6 bit - purposeId = 3
      '01' + // 2 bit - restrictionType = 1 = REQUIRE_CONSENT
      '0' + // 1 bit - defaultValue for not mentioned purposes = false
      '000000000001' + // 12 bit - number of range records = 1
      '1' + // 1 bit - rangeType = 1 = ID_RANGE
      '0000000000000111' + // 16 bit - range start vendorId = 7
      '0000000000001001' // 16 bit - range end vendorId = 8
    );
  });

  it('should encode multiple vendors with multiple restrictions', (): void => {
    // using purposeRestriction1 and purposeRestriction2 with different values
    const purposeRestriction1 = new PurposeRestriction(4, RestrictionType.REQUIRE_CONSENT);
    const purposeRestriction2 = new PurposeRestriction(5, RestrictionType.REQUIRE_LI);

    const purposeRestrictions = new PurposeRestrictions();
    purposeRestrictions.add(10, purposeRestriction1);
    purposeRestrictions.add(11, purposeRestriction1);
    purposeRestrictions.add(12, purposeRestriction2);
    purposeRestrictions.add(21, purposeRestriction2);

    const encoded: string = encoder.encode(purposeRestrictions);
    expect(encoded).toBe(
      '000000000010' + // 12 bit - number of restriction records = 2
      '000100' + // 6 bit - purposeId = 4
      '01' + // 2 bit - restrictionType = 1 = REQUIRE_CONSENT
      '0' + // 1 bit - defaultValue for not mentioned purposes = false
      '000000000001' + // 12 bit - number of range records = 1
      '1' + // 1 bit - rangeType = 1 = ID_RANGE
      '0000000000001010' + // 16 bit - range start vendorId = 10
      '0000000000001011' + // 16 bit - range end vendorId = 11
      '000101' + // 6 bit - purposeId = 5
      '10' + // 2 bit - restrictionType = 2 = REQUIRE_LI
      '0' + // 1 bit - defaultValue for not mentioned purposes = false
      '000000000010' + // 12 bit - number of range records = 2
      '0' + // 1 bit - rangeType = 0 = SINGLE_ID
      '0000000000001100' + // 16 bit - single vendorId = 12
      '0' + // 1 bit - rangeType = 0 = SINGLE_ID
      '0000000000010101' // 16 bit - single vendorId = 21
    );
  });
});
