import { SegmentType } from "../constants";
import { Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";
import { CoreSegmentEncoder } from "./core-segment-encoder";
import { PublisherTCSegmentEncoder } from "./publisher-tc-segment-encoder";
import { VendorsAllowedSegmentEncoder } from "./vendors-allowed-segment-encoder";
import { VendorsDisclosedSegmentEncoder } from "./vendors-disclosed-segment-encoder";

const segmentEncoderMap: { [segmentType in SegmentType]: Encoder<TCModel> } = {
  [SegmentType.CORE]: new CoreSegmentEncoder(),
  [SegmentType.VENDORS_DISCLOSED]: new VendorsDisclosedSegmentEncoder(),
  [SegmentType.VENDORS_ALLOWED]: new VendorsAllowedSegmentEncoder(),
  [SegmentType.PUBLISHER_TC]: new PublisherTCSegmentEncoder(),
}

export const segmentEncoderLookup = (segmentType: SegmentType): Encoder<TCModel> | undefined => segmentEncoderMap[segmentType];
