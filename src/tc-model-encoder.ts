import { BitFieldEncoder, NumberEncoder } from "./base";
import { Encoder } from "./interfaces";
import { TCModel } from "./model/tc-model";

export class TCModelEncoder implements Encoder<TCModel> {

  encode(value: TCModel): string {
    throw new Error("Method not implemented.");
  }

  decode(value: string): TCModel {
    const tcModel: TCModel = new TCModel();
    const bitFieldEncoder = new BitFieldEncoder();
    const numberEncoder = new NumberEncoder();

    const segments: string[] = value.split('.');
    for (let i = 0; i < segments.length; i++) {
      const segment: string = segments[i];
      // first char will contain 6 bits, we only need the first 3
      const segTypeBits: string = bitFieldEncoder.decode(segment.charAt(0));
      const segType: number = numberEncoder.decode(segTypeBits.substr(0, 3));

      // console.log(`value=${value}, i=${i}, segment=${segment}, segType=${segType}`);
    }

    return tcModel;
  }
}
