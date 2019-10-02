import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
import { IdSet } from "../model";

const numberEncoder = new NumberEncoder();
const idSetLinearEncoder = new IdSetLinearEncoder();

export const publisherTcSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      encoder: numberEncoder,
      getValue: (m) => SegmentType.PUBLISHER_TC,
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      encoder: idSetLinearEncoder,
      getValue: (m) => m.publisherConsents,
      setValue: (m, v) => v.forEach(id => m.publisherConsents.add(id)),
    },
    [Field.PUBLISHER_LI_TRANSPARENCY]: <FieldInfo<IdSet>>{
      bits: 24,
      encoder: idSetLinearEncoder,
      getValue: (m) => m.publisherLITransparency,
      setValue: (m, v) => v.forEach(id => m.publisherLITransparency.add(id)),
    },
    [Field.NUM_CUSTOM_PURPOSES]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: (m) => Object.keys(m.customPurposes).length,
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_CUSTOM_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      encoder: idSetLinearEncoder,
      getValue: (m) => m.publisherCustomConsents,
      setValue: (m, v) => v.forEach(id => m.publisherCustomConsents.add(id)),
    },
    [Field.PUBLISHER_CUSTOM_LI_TRANSPARENCY]: <FieldInfo<IdSet>>{
      bits: 24,
      encoder: idSetLinearEncoder,
      getValue: (m) => m.publisherCustomLITransparency,
      setValue: (m, v) => v.forEach(id => m.publisherCustomLITransparency.add(id)),
    },
  }
}
