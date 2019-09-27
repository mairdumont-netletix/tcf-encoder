import { PurposeInfo } from "@mdnx/tcf-types";
import { TCModelError } from "../error/tc-model-error";
import { IdMap } from "../interfaces";
import { isIntegerGreaterThan } from "../utils";
import { IdSet } from "./id-set";

export class TCModel /*implements TCData*/ {

  private cmpId_: number = 0;
  private cmpVersion_: number = 0;

  private created_: Date = new Date();
  private lastUpdated_: Date = new Date();
  private vendorListVersion_: number = 0;

  public readonly specialFeatureOptIns: IdSet = new IdSet();
  public readonly purposeConsents: IdSet = new IdSet();

  public readonly publisherConsents: IdSet = new IdSet();
  public readonly publisherLITransparency: IdSet = new IdSet();

  public customPurposes: IdMap<PurposeInfo> = {};

  public readonly publisherCustomConsents: IdSet = new IdSet();
  public readonly publisherCustomLITransparency: IdSet = new IdSet();

  public readonly vendorsDisclosed: IdSet = new IdSet();
  public readonly vendorsAllowed: IdSet = new IdSet();

  public set cmpId(value: number) {
    if (isIntegerGreaterThan(value, 1)) {
      this.cmpId_ = value;
    } else {
      throw new TCModelError('cmpId', value);
    }
  }

  public get cmpId(): number {
    return this.cmpId_;
  }

  public set cmpVersion(value: number) {
    if (isIntegerGreaterThan(value, -1)) {
      this.cmpVersion_ = value;
    } else {
      throw new TCModelError('cmpVersion', value);
    }
  }

  public get cmpVersion(): number {
    return this.cmpVersion_;
  }

  public set created(value: Date) {
    this.created_ = value;
  }

  public get created(): Date {
    return this.created_;
  }

  public set lastUpdated(value: Date) {
    this.lastUpdated_ = value;
  }

  public get lastUpdated(): Date {
    return this.lastUpdated_;
  }

  public set vendorListVersion(value: number) {
    if (isIntegerGreaterThan(value, 0)) {
      this.vendorListVersion_ = value;
    } else {
      throw new TCModelError('vendorListVersion', value);
    }
  }

  public get vendorListVersion(): number {
    return this.vendorListVersion_;
  }
}
