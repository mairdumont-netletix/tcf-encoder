import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
import { Field, SegmentType, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';

export const vendorsDisclosedSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: <FieldInfo<number>>{
      bits: 3,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => SegmentType.VENDORS_DISCLOSED,
      setValue: (m, v) => { },
    },
    [Field.VENDORS_DISCOLOSED]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.vendorsDisclosed,
      setValue: (m, v) => m.vendorsDisclosed.add(v.toArray()),
    },
  },
}
