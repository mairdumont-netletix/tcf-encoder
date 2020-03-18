import { IdSet } from './id-set';
import { PurposeRestriction, RestrictionHash } from './purpose-restriction';

export class PurposeRestrictions {

  private data: Map<RestrictionHash, IdSet> = new Map<RestrictionHash, IdSet>();

  public add(vendorId: number, purposeRestriction: PurposeRestriction) {
    this.getRestrictions(vendorId).forEach((restriction: PurposeRestriction): void => {
      if (restriction.purposeId === purposeRestriction.purposeId) {
        this.remove(vendorId, purposeRestriction);
      }
    });

    const key: RestrictionHash = purposeRestriction.serialize();
    let idSet: IdSet | undefined = this.data.get(key);
    if (!idSet) {
      this.data.set(key, idSet = new IdSet());
    }
    idSet.add(vendorId);
  }

  public remove(vendorId: number, purposeRestriction: PurposeRestriction) {
    const key: RestrictionHash = purposeRestriction.serialize();
    const idSet: IdSet | undefined = this.data.get(key);
    if (idSet) {
      // remove vendorId from set
      idSet.delete(vendorId);
      // if set is empty, remove the set from data map
      if (idSet.size === 0) {
        this.data.delete(key);
      }
    }
  }

  public getVendors(purposeRestriction?: PurposeRestriction): IdSet {
    if (purposeRestriction) {
      const key: RestrictionHash = purposeRestriction.serialize();
      const idSet: IdSet | undefined = this.data.get(key);
      if (idSet) {
        return idSet.clone();
      }
    }
    const result: IdSet = new IdSet();
    this.data.forEach((idSet: IdSet) => {
      result.add(idSet.toArray());
    });
    return result;
  }

  public getRestrictions(vendorId?: number): PurposeRestriction[] {
    const result: PurposeRestriction[] = [];
    this.data.forEach((idSet: IdSet, restrictionHash: RestrictionHash) => {
      if (vendorId && idSet.has(vendorId) || !vendorId) {
        result.push(PurposeRestriction.parse(restrictionHash));
      }
    });
    return result;
  }

  public get numRestrictions(): number {
    return this.data.size;
  }
}
