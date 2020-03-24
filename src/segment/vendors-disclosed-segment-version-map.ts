import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
import { Field, SegmentType, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';

/**
 * Disclosed Vendors (OOB) segment per tcf version per field.
 *
 * The DisclosedVendors is a TC String segment that signals which vendors have
 * been disclosed to a given user by a CMP.
 * This segment is required when saving a global-context TC String.
 * When a CMP updates a globally-scoped TC String, the CMP MUST retain
 * the existing values and only add new disclosed Vendor IDs that had
 * not been added by other CMPs in prior interactions with this user.
 */
export const vendorsDisclosedSegmentVersionMap: VersionMap = {
  /**
   * Description of consent string version 1
   */
  [Version.V1]: {
    // noop - this segment does not exist in version 1
  },
  /**
   * Description of consent string version 2
   */
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: () => SegmentType.VENDORS_DISCLOSED,
      setValue: () => { },
    },
    [Field.VENDORS_DISCOLOSED]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.vendorsDisclosed,
      setValue: (m, v) => m.vendorsDisclosed.add(v.toArray()),
    },
  },
}
