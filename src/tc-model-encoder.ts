import { BitFieldEncoder, NumberEncoder } from "./base";
import { SegmentType } from "./constants";
import { Decoded, Encoder } from "./interfaces";
import { TCModel } from "./model/tc-model";
import { segmentEncoderLookup } from "./segment/segment-encoder-lookup";

export class TCModelEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    const segmentsToEncode = [
      SegmentType.CORE,
      SegmentType.VENDORS_DISCLOSED,
      SegmentType.VENDORS_ALLOWED,
      SegmentType.PUBLISHER_TC,
    ];

    return segmentsToEncode
      .map(segmentEncoderLookup)
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
      segmentEncoderLookup(SegmentType.CORE)!.decode(segments[0], tcModel);
      // decode segment 1 - 3 if available
      for (let i = 1; i < segments.length; i++) {
        const segment: string = segments[i];
        // first char will contain 6 bits, we only need the first 3
        const { decoded: segTypeBits } = bitFieldEncoder.decode(segment.charAt(0));
        const { decoded: segType } = numberEncoder.decode(segTypeBits.substr(0, 3));

        const segmentEncoder = segmentEncoderLookup(segType);
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
