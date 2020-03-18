import { PurposeRestriction, RestrictionType } from './purpose-restriction';
import { PurposeRestrictions } from './purpose-restrictions';

describe('PurposeRestrictions', (): void => {

  const makeRandomInt = (betweenStart: number, betweenEnd: number): number => {
    return Math.round(Math.random() * (betweenEnd - betweenStart)) + betweenStart;
  }

  it('should return restrictions for a vendor', (): void => {
    const vendorId: number = makeRandomInt(1, 100);
    const purposeId: number = makeRandomInt(2, 12);
    const restrictionType: number = makeRandomInt(0, 2) as RestrictionType;

    const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);

    const purposeRestrictions = new PurposeRestrictions();
    purposeRestrictions.add(vendorId, purposeRestriction);

    const restrictions = purposeRestrictions.getRestrictions(vendorId);
    expect(purposeRestriction.equals(restrictions[0])).toBeTruthy();
  });
});
