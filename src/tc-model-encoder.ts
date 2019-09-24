import { BooleanEncoder, DateEncoder, IdSetEncoder, NumberEncoder } from "./base";
import { Encoder } from "./encoder";
import { TCModel } from "./model/tc-model";

export class TCModelEncoder implements Encoder<TCModel> {

  private numberEncoder = new NumberEncoder();
  private booleanEncoder = new BooleanEncoder();
  private dateEncoder = new DateEncoder();
  private idSetEncoder = new IdSetEncoder();

  encode(tcModel: TCModel): string {
    let result = '';
    result += this.numberEncoder.encode(/* version */ 2, 1)
    result += this.dateEncoder.encode(tcModel.created, 36);
    result += this.dateEncoder.encode(tcModel.lastUpdated, 36);
    result += this.numberEncoder.encode(tcModel.cmpId, 12);
    result += this.numberEncoder.encode(tcModel.cmpVersion, 12);
    result += this.numberEncoder.encode(/* TODO consentScreen */ 0, 6);
    result += this.numberEncoder.encode(/* TODO consentLanguage */ 0, 12);
    result += this.numberEncoder.encode(/* TODO vendorListVersion */ 0, 12);
    result += this.numberEncoder.encode(/* TODO policyVersion */ 0, 6);

    result += this.booleanEncoder.encode(/* TODO isServiceSpecific */ false);
    result += this.booleanEncoder.encode(/* TODO useNonStandardStacks */ false);

    result += this.idSetEncoder.encode(tcModel.specialFeatureOptIns, 12);
    result += this.numberEncoder.encode(/* TODO purposeConsents */ 0, 0);
    result += this.numberEncoder.encode(/* TODO purposeLITransparency */ 0, 0);
    result += this.booleanEncoder.encode(/* TODO purposeOneTreatment */ false);
    result += this.numberEncoder.encode(/* TODO publisherCountryCode */ 0, 0);
    result += this.numberEncoder.encode(/* TODO vendorConsents */ 0, 0);
    result += this.numberEncoder.encode(/* TODO vendorLegitimateInterest */ 0, 0);
    result += this.numberEncoder.encode(/* TODO publisherRestrictions */ 0, 0);
    return result;
  }

  decode(value: string): TCModel {
    throw new Error("Method not implemented.");
  }
}
