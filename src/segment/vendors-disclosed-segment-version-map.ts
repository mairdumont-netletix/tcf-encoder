import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
import { IdSet } from "../model";

export const vendorsDisclosedSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => SegmentType.VENDORS_DISCLOSED,
      setValue: (m, v) => { },
    },
    [Field.VENDORS_DISCOLOSED]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: IdSetLinearEncoder.getInstance,
      getValue: (m) => m.vendorsDisclosed,
      setValue: (m, v) => m.vendorsDisclosed.add(v.toArray()),
    },
  },
}
