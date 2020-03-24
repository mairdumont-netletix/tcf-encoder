import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
import { Field, SegmentType, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';

/**
 * Allowed Vendors (OOB) segment per tcf version per field.
 *
 * Signals which vendors the publisher permits to use OOB legal bases.
 */
export const vendorsAllowedSegmentVersionMap: VersionMap = {
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
      getValue: (m) => SegmentType.VENDORS_ALLOWED,
      setValue: (m, v) => { },
    },
    [Field.VENDORS_ALLOWED]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.vendorsAllowed,
      setValue: (m, v) => m.vendorsAllowed.add(v.toArray()),
    },
  },
}
