export type RestrictionHash = string;

export enum RestrictionType {
  NOT_ALLOWED = 0,
  REQUIRE_CONSENT = 1,
  REQUIRE_LI = 2
}

export class PurposeRestriction {

  public constructor(
    public readonly purposeId: number,
    public readonly restrictionType: RestrictionType,
  ) { }

  public serialize(): RestrictionHash {
    return `${this.purposeId}_${this.restrictionType}`;
  }

  public static parse(hash: RestrictionHash): PurposeRestriction {
    const [purposeId, restrictionType] = hash.split('_').map(e => parseInt(e, 10));
    return new PurposeRestriction(purposeId, restrictionType);
  }

  public equals(other: PurposeRestriction): boolean {
    return this.purposeId === other.purposeId && this.restrictionType === other.restrictionType;
  }
}
