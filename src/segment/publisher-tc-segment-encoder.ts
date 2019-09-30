import { BitFieldEncoder } from "../base";
import { Field, Version } from "../constants";
import { Decoded, Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";
import { coreSegmentVersionMap } from "./core-segment-version-map";

export class PublisherTCSegmentEncoder implements Encoder<TCModel> {

  private bitfieldEncoder = new BitFieldEncoder();

  encode(tcModel: TCModel): string {
    let bitField = '';
    const fieldMap = coreSegmentVersionMap[Version.V2];
    for (const field in fieldMap) {
      const fieldInfo = fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, encoder, value } = fieldInfo;
        bitField += encoder.encode(value(tcModel), bits);
      }
    }
    return this.bitfieldEncoder.encode(bitField);
  }

  decode(value: string, tcModel: TCModel): Decoded<TCModel> {
    return {
      numBits: 0,
      decoded: tcModel
    }
  }
}
