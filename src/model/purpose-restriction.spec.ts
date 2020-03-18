import { PurposeRestriction, RestrictionType } from './purpose-restriction';

describe('PurposeRestriction', (): void => {

  it('should set restrictionType and purposeId through the constructor', (): void => {
    const purposeId = 2;
    const restrictionType = RestrictionType.NOT_ALLOWED;

    const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);
    expect(purposeRestriction.purposeId).toBe(purposeId);
    expect(purposeRestriction.restrictionType).toBe(restrictionType);
  });

  it('two javascript-objects are not equal', () => {
    const restriction1 = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED);
    const restriction2 = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED);
    expect(restriction1).not.toBe(restriction2);
  });

  it('should serialize to the same string for same input', () => {
    const hash1 = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED).serialize();
    const hash2 = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED).serialize();
    expect(hash1).toBe(hash2);
  });

  it('should serialize to different string for different input', () => {
    const hash1 = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED).serialize();
    const hash2 = new PurposeRestriction(2, RestrictionType.REQUIRE_CONSENT).serialize();
    expect(hash1).not.toBe(hash2);
  });

  it('serialize and unserialize should produce same restriction', () => {
    const restriction1 = new PurposeRestriction(3, RestrictionType.REQUIRE_CONSENT);
    const hash = restriction1.serialize();
    const restriction2 = PurposeRestriction.parse(hash);
    expect(restriction1.equals(restriction2)).toBeTruthy();
  });
});
