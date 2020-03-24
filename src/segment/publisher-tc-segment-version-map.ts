import { NumberEncoder } from '../base';
import { IdSetLinearEncoder } from '../composed';
import { Field, SegmentType, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';

/**
 * Describes "Publisher transparency and consent" segment of consent string
 * per tcf version per field.
 *
 * Publishers may need to establish transparency and consent for a set of
 * personal data processing purposes for their own use. For example,
 * a publisher that wants to set a frequency-capping first-party cookie should
 * request user consent for Purpose 1 "Store and/or access information on a device"
 * in jurisdictions where it is required.
 *
 * The Publisher TC segment in the TC string represents publisher purposes
 * transparency & consent signals which is different than the other TC String
 * segments; they are used to collect consumer purposes transparency & consent
 * for vendors. This segment supports the standard list of purposes defined
 * by the TCF as well as Custom Purposes defined by the publisher if they
 * so choose.
 */
export const publisherTcSegmentVersionMap: VersionMap = {
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
