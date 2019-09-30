import { NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType, Version } from "../constants";
import { VersionMap } from "../interfaces";

const numberEncoder = new NumberEncoder();
const idSetLinearEncoder = new IdSetLinearEncoder();

export const vendorsAllowedSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    // noop
  },
  [Version.V2]: {
    [Field.SEGMENT_TYPE]: {
      bits: 3,
      encoder: numberEncoder,
      value: () => SegmentType.VENDORS_ALLOWED,
    },
    [Field.VENDORS_ALLOWED]: {
      bits: undefined,
      encoder: idSetLinearEncoder,
      value: (m) => m.vendorsAllowed,
    },
  },
}
