import { BitFieldEncoder, NumberEncoder } from "../base";
import { VendorEncoder } from "../composed";
import { SegmentType } from "../constants";
import { Encoder } from "../interfaces";
import { TCModel } from "../model/tc-model";

export class VendorsAllowedSegmentEncoder implements Encoder<TCModel> {

  private numberEncoder = new NumberEncoder();
  private bitFieldEncoder = new BitFieldEncoder();
  private vendorEncoder = new VendorEncoder();

  encode(tcModel: TCModel): string {
    let bitString: string = this.numberEncoder.encode(SegmentType.VENDORS_DISCLOSED, 3);
    bitString += this.vendorEncoder.encode(tcModel.vendorsAllowed);
    return this.bitFieldEncoder.encode(bitString);
  }

  decode(value: string, tcModel: TCModel = new TCModel()): TCModel {
    const bitString: string = this.bitFieldEncoder.decode(value);
    const idSet = this.vendorEncoder.decode(bitString.substr(3));
    idSet.forEachBit((enabled: boolean, vendorId: number) => {
      if (enabled) {
        tcModel.vendorsAllowed.add(vendorId);
      }
    });
    return tcModel;
  }
}
