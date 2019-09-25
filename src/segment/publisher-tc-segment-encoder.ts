import { Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";

export class PublisherTCSegmentEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    throw new Error("Method not implemented.");
  }

  decode(value: string): TCModel {
    throw new Error("Method not implemented.");
  }
}
