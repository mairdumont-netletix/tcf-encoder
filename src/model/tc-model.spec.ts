import { GlobalVendorList } from "@mdnx/tcf-types";
import { GVL } from "../gvl/gvl";
import jsonGvlV2 from '../__tests__/fixtures/gvl-v2.json';
import { TCModel } from "./tc-model";

describe('TCModel', (): void => {

  it('should create TCModel with no args', (): void => {
    const tcModel = new TCModel();
    expect(tcModel).toBeDefined();
    expect(tcModel.created).toBeDefined();
    expect(tcModel.lastUpdated).toBeDefined();
  })

  it('should create TCModel with gvl', (): void => {
    const date = new Date();
    const gvl = new GVL(jsonGvlV2 as GlobalVendorList);
    const tcModel = new TCModel(gvl);
    expect(tcModel).toBeDefined();
    expect(tcModel.gvl).toStrictEqual(gvl);
    expect(tcModel.vendorListVersion).toBe(2);
    expect(tcModel.tcfPolicyVersion).toBe(2);
    expect(tcModel.created).toBeDefined();
    expect(tcModel.created.getTime()).toBeGreaterThanOrEqual(date.getTime());
    expect(tcModel.lastUpdated).toBeDefined();
    expect(tcModel.lastUpdated.getTime()).toBeGreaterThanOrEqual(date.getTime());
  })
});
