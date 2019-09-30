import { BitFieldEncoder } from "../base";
import { Field, Version } from "../constants";
import { Decoded, Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";
import { coreSegmentVersionMap } from "./core-segment-version-map";

export class CoreSegmentEncoder implements Encoder<TCModel> {

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
    const { numBits, decoded: bitField } = this.bitfieldEncoder.decode(value);
    let position = numBits;
    const fieldMap = coreSegmentVersionMap[Version.V2];
    for (const field in fieldMap) {
      const fieldInfo = fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, encoder } = fieldInfo;
        const chunk = bitField.substr(position, bits);
        const { numBits, decoded } = encoder.decode(chunk);
        position += numBits;
        // console.log(field, decoded);
      }
    }
    return {
      numBits: position,
      decoded: tcModel,
    }
  }
}
