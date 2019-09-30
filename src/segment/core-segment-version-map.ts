import { BitFieldEncoder, BooleanEncoder, DateEncoder, NumberEncoder } from "../base";
import { LanguageEncoder, PublisherRestrictionsEncoder, VendorEncoder } from "../composed";
import { Field, Version } from "../constants";
import { VersionMap } from "../interfaces";
import { IdSet } from "../model";

const bitfieldEncoder = new BitFieldEncoder();
const numberEncoder = new NumberEncoder();
const booleanEncoder = new BooleanEncoder();
const dateEncoder = new DateEncoder();
const languageEncoder = new LanguageEncoder();
const vendorEncoder = new VendorEncoder();
const publisherRestrictionsEncoder = new PublisherRestrictionsEncoder();

export const coreSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    [Field.VERSION]: {
      bits: 6,
      encoder: numberEncoder,
      value: () => 2,
    },
    [Field.CREATED]: {
      bits: 36,
      encoder: dateEncoder,
      value: (m) => m.created,
    },
    [Field.LAST_UPDATED]: {
      bits: 36,
      encoder: dateEncoder,
      value: (m) => m.lastUpdated,
    },
    [Field.CMP_ID]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.cmpId,
    },
    [Field.CMP_VERSION]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.cmpVersion,
    },
    [Field.CONSENT_SCREEN]: {
      bits: 6,
      encoder: numberEncoder,
      value: (m) => 1, // TODO
    },
    [Field.CONSENT_LANGUAGE]: {
      bits: 12,
      encoder: languageEncoder,
      value: (m) => 'DE', // TODO
    },
    [Field.VENDOR_LIST_VERSION]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.vendorListVersion,
    },
    [Field.PURPOSE_CONSENTS]: {
      bits: 24,
      encoder: bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.VENDOR_CONSENTS]: {
      bits: undefined,
      encoder: vendorEncoder,
      value: (m) => new IdSet([], true, 1, 100), // TODO
    },
  },
  [Version.V2]: {
    [Field.VERSION]: {
      bits: 6,
      encoder: numberEncoder,
      value: () => 2,
    },
    [Field.CREATED]: {
      bits: 36,
      encoder: dateEncoder,
      value: (m) => m.created,
    },
    [Field.LAST_UPDATED]: {
      bits: 36,
      encoder: dateEncoder,
      value: (m) => m.lastUpdated,
    },
    [Field.CMP_ID]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.cmpId,
    },
    [Field.CMP_VERSION]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.cmpVersion,
    },
    [Field.CONSENT_SCREEN]: {
      bits: 6,
      encoder: numberEncoder,
      value: (m) => 1, // TODO
    },
    [Field.CONSENT_LANGUAGE]: {
      bits: 12,
      encoder: languageEncoder,
      value: (m) => 'DE', // TODO
    },
    [Field.VENDOR_LIST_VERSION]: {
      bits: 12,
      encoder: numberEncoder,
      value: (m) => m.vendorListVersion,
    },
    [Field.POLICY_VERSION]: {
      bits: 6,
      encoder: numberEncoder,
      value: (m) => 1, // TODO
    },
    [Field.IS_SERVICE_SPECIFIC]: {
      bits: 1,
      encoder: booleanEncoder,
      value: (m) => 0, // TODO
    },
    [Field.USE_NON_STANDARD_STACKS]: {
      bits: 1,
      encoder: booleanEncoder,
      value: (m) => 0, // TODO
    },
    [Field.SPECIAL_FEATURES_OPTINS]: {
      bits: 12,
      encoder: bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_CONSENTS]: {
      bits: 24,
      encoder: bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_LI_TRANSPARENCY]: {
      bits: 24,
      encoder: bitfieldEncoder,
      value: (m) => 0, // TODO
    },
    [Field.PURPOSE_ONE_TREATMENT]: {
      bits: 1,
      encoder: booleanEncoder,
      value: (m) => 1, // TODO
    },
    [Field.PUBLISHER_COUNTRY_CODE]: {
      bits: 12,
      encoder: languageEncoder,
      value: (m) => 'DE', // TODO
    },
    [Field.VENDOR_CONSENTS]: {
      bits: undefined,
      encoder: vendorEncoder,
      value: (m) => new IdSet([], true, 1, 100), // TODO
    },
    [Field.VENDOR_LEGITIMATE_INTEREST]: {
      bits: undefined,
      encoder: vendorEncoder,
      value: (m) => new IdSet([], true, 1, 100), // TODO
    },
    [Field.PUBLISHER_RESTRICTIONS]: {
      bits: undefined,
      encoder: publisherRestrictionsEncoder,
      value: (m) => undefined, // TODO
    },
    // TODO: many more
  },
}
