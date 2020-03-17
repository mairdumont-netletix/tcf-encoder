import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
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
    [Field.NUM_CUSTOM_PURPOSES]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => Object.keys(m.customPurposes).length,
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_CUSTOM_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.publisherCustomConsents,
      setValue: (m, v) => m.publisherCustomConsents.add(v.toArray()),
    },
    [Field.PUBLISHER_CUSTOM_LI_TRANSPARENCY]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.publisherCustomLITransparency,
      setValue: (m, v) => m.publisherCustomLITransparency.add(v.toArray()),
    },
  }
}
