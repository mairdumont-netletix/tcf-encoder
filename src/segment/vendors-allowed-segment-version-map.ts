import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
import { IdSet } from "../model";

export const vendorsAllowedSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => SegmentType.VENDORS_ALLOWED,
      setValue: (m, v) => { },
    },
    [Field.VENDORS_ALLOWED]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: IdSetLinearEncoder.getInstance,
      getValue: (m) => m.vendorsAllowed,
      setValue: (m, v) => v.forEach(id => m.vendorsAllowed.add(id)),
    },
  },
}
