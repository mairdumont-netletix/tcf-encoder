import { SegmentType, Version } from "../constants";
import { Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";
import { coreSegmentVersionMap } from "./core-segment-version-map";
import { publisherTcSegmentVersionMap } from "./publisher-tc-segment-version-map";
import { SegmentEncoder } from "./segment-encoder";
import { vendorsAllowedSegmentVersionMap } from "./vendors-allowed-segment-version-map";
import { vendorsDisclosedSegmentVersionMap } from "./vendors-disclosed-segment-version-map";

const segmentEncoderMap: { [version in Version]: { [segmentType in SegmentType]: Encoder<TCModel> } } = {
  [Version.V1]: {
    [SegmentType.CORE]: new SegmentEncoder(coreSegmentVersionMap[Version.V1]),
    [SegmentType.VENDORS_DISCLOSED]: new SegmentEncoder(vendorsDisclosedSegmentVersionMap[Version.V1]),
    [SegmentType.VENDORS_ALLOWED]: new SegmentEncoder(vendorsAllowedSegmentVersionMap[Version.V1]),
    [SegmentType.PUBLISHER_TC]: new SegmentEncoder(publisherTcSegmentVersionMap[Version.V1]),
  },
  [Version.V2]: {
    [SegmentType.CORE]: new SegmentEncoder(coreSegmentVersionMap[Version.V2]),
    [SegmentType.VENDORS_DISCLOSED]: new SegmentEncoder(vendorsDisclosedSegmentVersionMap[Version.V2]),
    [SegmentType.VENDORS_ALLOWED]: new SegmentEncoder(vendorsAllowedSegmentVersionMap[Version.V2]),
    [SegmentType.PUBLISHER_TC]: new SegmentEncoder(publisherTcSegmentVersionMap[Version.V2]),
  }
}

export const segmentEncoderLookup = (version: Version, segmentType: SegmentType): Encoder<TCModel> | undefined => segmentEncoderMap[version][segmentType];
