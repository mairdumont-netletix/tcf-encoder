import { Encoder } from "./interfaces";
import { TCModel } from "./model/tc-model";

export class TCModelEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    throw new Error("Method not implemented.");
  }

  decode(value: string = ''): TCModel {
    const tcModel: TCModel = new TCModel();

    const segments: string[] = value.split('.');
    for (let i = 0; i < segments.length; i++) {
      const segment: string = segments[i];

    }

    return tcModel;
  }
}
