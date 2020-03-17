import { DateString, FeatureInfo, GlobalVendorList, PurposeInfo, StackInfo, VendorInfo } from '@mdnx/tcf-types';
import { IdMap } from '../interfaces';

export class GVL implements GlobalVendorList {

  gvlSpecificationVersion: 2 = 2;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: DateString;
  purposes: IdMap<PurposeInfo>;
  specialPurposes: IdMap<PurposeInfo>;
  features: IdMap<FeatureInfo>;
  specialFeatures: IdMap<FeatureInfo>;
  vendors: IdMap<VendorInfo>;
  stacks: IdMap<StackInfo>;

  constructor(json: GlobalVendorList) {
    this.vendorListVersion = json.vendorListVersion;
    this.tcfPolicyVersion = json.tcfPolicyVersion;
    this.lastUpdated = json.lastUpdated;
    this.purposes = json.purposes;
    this.specialPurposes = json.specialPurposes;
    this.features = json.features;
    this.specialFeatures = json.specialFeatures;
    this.vendors = json.vendors;
    this.stacks = json.stacks;
  }
}
