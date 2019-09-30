import { BitFieldEncoder, NumberEncoder } from "../base";
import { IdSetLinearEncoder } from "../composed";
import { Field, SegmentType } from "../constants";
import { Decoded, Encoder, FieldMap } from "../interfaces";
import { TCModel } from "../model/tc-model";

export class PublisherTCSegmentEncoder implements Encoder<TCModel> {

  private numberEncoder = new NumberEncoder();
  private idSetLinearEncoder = new IdSetLinearEncoder();
  private bitfieldEncoder = new BitFieldEncoder();

  private fieldMap: FieldMap = {
    [Field.SEGMENT_TYPE]: {
      bits: 3,
      encoder: this.numberEncoder,
      value: () => SegmentType.PUBLISHER_TC,
    },
    [Field.PUBLISHER_CONSENTS]: {
      bits: 24,
      encoder: this.idSetLinearEncoder,
      value: (m) => m.publisherConsents,
    },
    [Field.PUBLISHER_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: this.idSetLinearEncoder,
      value: (m) => m.publisherLITransparency,
    },
    [Field.NUM_CUSTOM_PURPOSES]: {
      bits: 6,
      encoder: this.numberEncoder,
      value: (m) => Object.keys(m.customPurposes).length,
    },
    [Field.PUBLISHER_CUSTOM_CONSENTS]: {
      bits: 24,
      encoder: this.idSetLinearEncoder,
      value: (m) => m.publisherCustomConsents,
    },
    [Field.PUBLISHER_CUSTOM_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: this.idSetLinearEncoder,
      value: (m) => m.publisherCustomLITransparency,
    },
  }

  encode(tcModel: TCModel): string {
    let bitField = '';
    for (const field in this.fieldMap) {
      const fieldInfo = this.fieldMap[field as Field];
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
