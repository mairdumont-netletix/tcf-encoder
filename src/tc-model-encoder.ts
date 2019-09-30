import { BitFieldEncoder, NumberEncoder } from "./base";
import { SegmentType, Version } from "./constants";
import { Decoded, Encoder } from "./interfaces";
import { TCModel } from "./model/tc-model";
import { segmentEncoderLookup } from "./segment/segment-encoder-lookup";
import { inspectFirstBits } from "./utils";

export class TCModelEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    const segmentsToEncode = [
      SegmentType.CORE,
      SegmentType.VENDORS_DISCLOSED,
      SegmentType.VENDORS_ALLOWED,
      SegmentType.PUBLISHER_TC,
    ];

    return segmentsToEncode
      .map((segment) => segmentEncoderLookup(Version.V2, segment))
      .map(encoder => encoder && encoder.encode(value))
      .filter(encoded => encoded)
      .join('.');
  }

  decode(value: string): Decoded<TCModel> {
    let tcModel: TCModel = new TCModel();
    const bitFieldEncoder = new BitFieldEncoder();
    const numberEncoder = new NumberEncoder();

    const segments: string[] = value.split('.');

    if (segments.length) {
      // decode segment 0
      const version = inspectFirstBits(segments[0], 6);
      const segmentEncoder = segmentEncoderLookup(version, SegmentType.CORE);
      segmentEncoder!.decode(segments[0], tcModel);
      // decode segment 1 - 3 if available
      for (let i = 1; i < segments.length; i++) {
        const segment: string = segments[i];
        const segType = inspectFirstBits(segment, 3);
        const segmentEncoder = segmentEncoderLookup(version, segType);
        if (segmentEncoder) {
          segmentEncoder.decode(segment, tcModel);
        }

        // console.log(`value=${value}, i=${i}, segment=${segment}, segTypeBits=${segTypeBits}, segType=${segType}`);
      }
    }

    return {
      numBits: value.length,
      decoded: tcModel,
    };
  }
}
