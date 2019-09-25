import { Encoder } from "../encoder";
import { TCModel } from "../model/tc-model";

export class VendorsAllowedSegmentEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    throw new Error("Method not implemented.");
  }

  decode(value: string): TCModel {
    throw new Error("Method not implemented.");
  }
}
