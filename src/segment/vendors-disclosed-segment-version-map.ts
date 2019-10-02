import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
import { IdSet } from "../model";

const numberEncoder = new NumberEncoder();
const idSetLinearEncoder = new IdSetLinearEncoder();

export const vendorsDisclosedSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      encoder: numberEncoder,
      getValue: () => SegmentType.VENDORS_DISCLOSED,
      setValue: (m, v) => { },
    },
    [Field.VENDORS_ALLOWED]: <FieldInfo<IdSet>>{
      bits: undefined,
      encoder: idSetLinearEncoder,
      getValue: (m) => m.vendorsDisclosed,
      setValue: (m, v) => v.forEach(id => m.vendorsDisclosed.add(id)),
    },
  },
}
