import { BitFieldEncoder, NumberEncoder } from './base';
import { SegmentType } from './constants';
import { Decoded, Encoder } from './interfaces';
import { TCModel } from './model/tc-model';
import { segmentEncoderLookup } from './segment/segment-encoder-lookup';
import { Singleton } from './utils';

/**
 * Options to configure how to encode a consent string.
 */
export interface TCStringEncoderOptions {
  segments?: SegmentType[];
}

/**
 * Handles encoding/decoding of a TCModel to a consent string.
 *
 * This this the "main" encoder which makes use of all other encoders internally.
 */
export class TCStringEncoder implements Encoder<TCModel, TCStringEncoderOptions, never> {

  /**
   * Encodes a TCModel into an consent string.
   *
   * @param tcModel TCModel to encode
   * @param options configure how to encode the TCModel
   */
  public encode(tcModel: TCModel, { segments = [] }: TCStringEncoderOptions = {}): string {
    // use selected segments from options, but use always core segment in any case
    const segmentsToEncode: SegmentType[] = [
      SegmentType.CORE,
      ...segments
    ];

    return segmentsToEncode
      .map((segment) => segmentEncoderLookup(tcModel.version, segment))
      .map(encoder => encoder && encoder.encode(tcModel))
      .filter(encoded => encoded)
      .join('.');
  }

  /**
   * Decodes a consent string into a TCModel.
   *
   * @param value consent string to decode
   */
  public decode(value: string): Decoded<TCModel> {
    // first char will contain 6 bits, we only need the first numBits
    const inspectFirstBits = (chars: string, numBits: number): number => {
      const { decoded: firstBits } = Singleton.of(BitFieldEncoder).decode(chars[0]);
      const { decoded } = Singleton.of(NumberEncoder).decode(firstBits.substr(0, numBits));
      return decoded;
    }

    let tcModel: TCModel = new TCModel();

    const segments: string[] = value.split('.');
    if (segments.length) {
      // decode segment 0
      const version = inspectFirstBits(segments[0], 6);
      const segmentEncoder = segmentEncoderLookup(version, SegmentType.CORE);
      segmentEncoder!.decode(segments[0], { tcModel });
      // decode segment 1 - 3 if available
      for (let i = 1; i < segments.length; i++) {
        const segment: string = segments[i];
        const segType = inspectFirstBits(segment, 3);
        const segmentEncoder = segmentEncoderLookup(version, segType);
        if (segmentEncoder) {
          segmentEncoder.decode(segment, { tcModel });
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
