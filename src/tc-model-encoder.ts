import { BitFieldEncoder, NumberEncoder } from "./base";
import { SegmentType } from "./constants";
import { Encoder } from "./interfaces";
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

  decode(value: string): TCModel {
    const tcModel: TCModel = new TCModel();
    const bitFieldEncoder = new BitFieldEncoder();
    const numberEncoder = new NumberEncoder();

    const segments: string[] = value.split('.');
    for (let i = 0; i < segments.length; i++) {
      const segment: string = segments[i];
      // first char will contain 6 bits, we only need the first 3
      const segTypeBits: string = bitFieldEncoder.decode(segment.charAt(0));
      const segType: number = numberEncoder.decode(segTypeBits.substr(0, 3));

      const segmentEncoder = segmentEncoderLookup(segType);

      // console.log(`value=${value}, i=${i}, segment=${segment}, segTypeBits=${segTypeBits}, segType=${segType}`);
    }

    return tcModel;
  }
}