import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
import { CustomPurposeData, CustomPurposeDataEncoder } from '../composed/custom-purpose-data-encoder';
import { Field, SegmentType, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';

export const publisherTcSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => SegmentType.PUBLISHER_TC,
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.publisherConsents,
      setValue: (m, v) => m.publisherConsents.add(v.toArray()),
    },
    [Field.PUBLISHER_LI_TRANSPARENCY]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.publisherLITransparency,
      setValue: (m, v) => m.publisherLITransparency.add(v.toArray()),
    },
    [Field.CUSTOM_PURPOSE_DATA]: <FieldInfo<CustomPurposeData>>{
      bits: undefined,
      getEncoder: () => Singleton.of(CustomPurposeDataEncoder),
      getValue: (m) => m,
      setValue: (m, v) => { },
    },
  }
}
