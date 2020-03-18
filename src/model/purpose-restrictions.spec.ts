import { makeRandomInteger } from '../utils';
import { PurposeRestriction, RestrictionType } from './purpose-restriction';
import { PurposeRestrictions } from './purpose-restrictions';

describe('PurposeRestrictions', (): void => {

  it('should return restrictions for a vendor', (): void => {
    const vendorId: number = makeRandomInteger(1, 100);
    const purposeId: number = makeRandomInteger(2, 12);
    const restrictionType: number = makeRandomInteger(0, 2) as RestrictionType;

    const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);

    const purposeRestrictions = new PurposeRestrictions();
    purposeRestrictions.add(vendorId, purposeRestriction);

    const restrictions = purposeRestrictions.getRestrictions(vendorId);
    expect(purposeRestriction.equals(restrictions[0])).toBeTruthy();
  });
});
