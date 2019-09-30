import { SegmentType, Version } from "../constants";
import { Encoder, FieldMap, VersionMap } from "../interfaces";
import { TCModel } from "../model/tc-model";
import { coreSegmentVersionMap } from "./core-segment-version-map";
import { publisherTcSegmentVersionMap } from "./publisher-tc-segment-version-map";
import { SegmentEncoder } from "./segment-encoder";
import { vendorsAllowedSegmentVersionMap } from "./vendors-allowed-segment-version-map";
import { vendorsDisclosedSegmentVersionMap } from "./vendors-disclosed-segment-version-map";

const segmentToVersionMap: { [segmentType in SegmentType]: VersionMap } = {
  [SegmentType.CORE]: coreSegmentVersionMap,
  [SegmentType.VENDORS_DISCLOSED]: vendorsDisclosedSegmentVersionMap,
  [SegmentType.VENDORS_ALLOWED]: vendorsAllowedSegmentVersionMap,
  [SegmentType.PUBLISHER_TC]: publisherTcSegmentVersionMap,
}

export const segmentEncoderLookup = (version: Version, segmentType: SegmentType): Encoder<TCModel> | undefined => {
  const versionMap: VersionMap = segmentToVersionMap[segmentType];
  const fieldMap: FieldMap = versionMap[version];
  return new SegmentEncoder(fieldMap);
}
