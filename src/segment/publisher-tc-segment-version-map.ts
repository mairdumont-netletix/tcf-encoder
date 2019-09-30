import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { VersionMap } from "../interfaces";

const numberEncoder = new NumberEncoder();
const idSetLinearEncoder = new IdSetLinearEncoder();

export const publisherTcSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: {
      bits: 3,
      encoder: numberEncoder,
      value: () => SegmentType.PUBLISHER_TC,
    },
    [Field.PUBLISHER_CONSENTS]: {
      bits: 24,
      encoder: idSetLinearEncoder,
      value: (m) => m.publisherConsents,
    },
    [Field.PUBLISHER_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: idSetLinearEncoder,
      value: (m) => m.publisherLITransparency,
    },
    [Field.NUM_CUSTOM_PURPOSES]: {
      bits: 6,
      encoder: numberEncoder,
      value: (m) => Object.keys(m.customPurposes).length,
    },
    [Field.PUBLISHER_CUSTOM_CONSENTS]: {
      bits: 24,
      encoder: idSetLinearEncoder,
      value: (m) => m.publisherCustomConsents,
    },
    [Field.PUBLISHER_CUSTOM_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: idSetLinearEncoder,
      value: (m) => m.publisherCustomLITransparency,
    },
  }
}
