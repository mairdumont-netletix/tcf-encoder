import { BitFieldEncoder, BooleanEncoder, DateEncoder, NumberEncoder } from "../base";
import { IdSetEncoder, LanguageEncoder } from "../composed";
import { Field } from "../constants";
import { Encoder, FieldMap } from "../interfaces";
import { IdSet } from "../model";
import { TCModel } from "../model/tc-model";

export class CoreSegmentEncoder implements Encoder<TCModel> {

  private bitfieldEncoder = new BitFieldEncoder();
  private numberEncoder = new NumberEncoder();
  private booleanEncoder = new BooleanEncoder();
  private dateEncoder = new DateEncoder();
  private idSetEncoder = new IdSetEncoder();
  private languageEncoder = new LanguageEncoder();

  private fieldMap: FieldMap = {
    [Field.VERSION]: {
      bits: 6,
      encoder: this.numberEncoder,
      value: () => 2,
    },
    [Field.CREATED]: {
      bits: 36,
      encoder: this.dateEncoder,
      value: (m) => m.created,
    },
    [Field.LAST_UPDATED]: {
      bits: 36,
      encoder: this.dateEncoder,
      value: (m) => m.lastUpdated,
    },
    [Field.CMP_ID]: {
      bits: 12,
      encoder: this.numberEncoder,
      value: (m) => m.cmpId,
    },
    [Field.CMP_VERSION]: {
      bits: 12,
      encoder: this.numberEncoder,
      value: (m) => m.cmpVersion,
    },
    [Field.CONSENT_SCREEN]: {
      bits: 6,
      encoder: this.numberEncoder,
      value: (m) => 1, // TODO
    },
    [Field.CONSENT_LANGUAGE]: {
      bits: 12,
      encoder: this.languageEncoder,
      value: (m) => 'DE', // TODO
    },
    [Field.VENDOR_LIST_VERSION]: {
      bits: 12,
      encoder: this.numberEncoder,
      value: (m) => m.vendorListVersion,
    },
    [Field.POLICY_VERSION]: {
      bits: 6,
      encoder: this.numberEncoder,
      value: (m) => 1, // TODO
    },
    [Field.IS_SERVICE_SPECIFIC]: {
      bits: 1,
      encoder: this.booleanEncoder,
      value: (m) => 0, // TODO
    },
    [Field.USE_NON_STANDARD_STACKS]: {
      bits: 1,
      encoder: this.booleanEncoder,
      value: (m) => 0, // TODO
    },
    [Field.SPECIAL_FEATURES_OPTINS]: {
      bits: 12,
      encoder: this.bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_CONSENTS]: {
      bits: 24,
      encoder: this.bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: this.bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_ONE_TREATMENT]: {
      bits: 1,
      encoder: this.booleanEncoder,
      value: (m) => 1, // TODO
    },
    [Field.PUBLISHER_COUNTRY_CODE]: {
      bits: 12,
      encoder: this.languageEncoder,
      value: (m) => 'DE', // TODO
    },
    [Field.VENDOR_CONSENTS]: {
      bits: undefined,
      encoder: this.idSetEncoder,
      value: (m) => new IdSet(), // TODO
    },
    // TODO: many more
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

  decode(value: string): TCModel {
    throw new Error("Method not implemented.");
  }
}