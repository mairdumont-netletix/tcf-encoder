import { Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";

export class VendorsDisclosedSegmentEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    throw new Error("Method not implemented.");
  }

  decode(value: string): TCModel {
    throw new Error("Method not implemented.");
  }
}