import { SegmentType, Version } from '../constants';
import { Encoder, FieldMap, VersionMap } from '../interfaces';
import { TCModel } from '../model';
import { coreSegmentVersionMap } from './core-segment-version-map';
import { publisherTcSegmentVersionMap } from './publisher-tc-segment-version-map';
import { SegmentDecodingOptions, SegmentEncoder } from './segment-encoder';
import { vendorsAllowedSegmentVersionMap } from './vendors-allowed-segment-version-map';
import { vendorsDisclosedSegmentVersionMap } from './vendors-disclosed-segment-version-map';

/**
 * Meta data of the tcf segments per segment type.
 */
const segmentToVersionMap: { [segmentType in SegmentType]: VersionMap } = {
  [SegmentType.CORE]: coreSegmentVersionMap,
  [SegmentType.VENDORS_DISCLOSED]: vendorsDisclosedSegmentVersionMap,
  [SegmentType.VENDORS_ALLOWED]: vendorsAllowedSegmentVersionMap,
  [SegmentType.PUBLISHER_TC]: publisherTcSegmentVersionMap,
}

/**
 * Lookup of the segment encoder per segment type.
 *
 * @param version tcf version to use
 * @param segmentType segment type to use
 */
export const segmentEncoderLookup = (version: Version, segmentType: SegmentType): Encoder<TCModel, never, SegmentDecodingOptions> | undefined => {
  const versionMap: VersionMap = segmentToVersionMap[segmentType];
  const fieldMap: FieldMap = versionMap[version];
  return new SegmentEncoder(fieldMap);
}
