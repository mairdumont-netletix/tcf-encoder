import { BitField } from "@mdnx/tcf-types";
import { BitFieldEncoder, BooleanEncoder, DateEncoder, NumberEncoder } from "../base";
import { LanguageEncoder, PublisherRestrictionsEncoder, VendorEncoder } from "../composed";
import { Field, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
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
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: (m) => 1,
      setValue: (m, v) => { },
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      encoder: dateEncoder,
      getValue: (m) => m.created,
      setValue: (m, v) => m.created = v,
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      encoder: dateEncoder,
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => m.lastUpdated = v,
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.cmpId,
      setValue: (m, v) => m.cmpId = v,
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => m.cmpVersion = v,
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: (m) => m.consentScreen,
      setValue: (m, v) => m.consentScreen = v,
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      encoder: languageEncoder,
      getValue: (m) => m.consentLanguage,
      setValue: (m, v) => m.consentLanguage = v,
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => m.vendorListVersion = v,
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<BitField>>{
      bits: 24,
      encoder: bitfieldEncoder,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_CONSENTS]: <FieldInfo<IdSet>>{
      bits: undefined,
      encoder: vendorEncoder,
      getValue: (m) => new IdSet([], true, 1, 100), // TODO
      setValue: (m, v) => { },
    },
  },
  [Version.V2]: {
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: () => 2,
      setValue: (m, v) => { },
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      encoder: dateEncoder,
      getValue: (m) => m.created,
      setValue: (m, v) => { },
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      encoder: dateEncoder,
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => { },
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.cmpId,
      setValue: (m, v) => { },
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => { },
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: (m) => 1, // TODO
      setValue: (m, v) => { },
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      encoder: languageEncoder,
      getValue: (m) => 'DE', // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      encoder: numberEncoder,
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => { },
    },
    [Field.POLICY_VERSION]: <FieldInfo<number>>{
      bits: 6,
      encoder: numberEncoder,
      getValue: (m) => 1, // TODO
      setValue: (m, v) => { },
    },
    [Field.IS_SERVICE_SPECIFIC]: <FieldInfo<boolean>>{
      bits: 1,
      encoder: booleanEncoder,
      getValue: (m) => false, // TODO
      setValue: (m, v) => { },
    },
    [Field.USE_NON_STANDARD_STACKS]: <FieldInfo<boolean>>{
      bits: 1,
      encoder: booleanEncoder,
      getValue: (m) => false, // TODO
      setValue: (m, v) => { },
    },
    [Field.SPECIAL_FEATURES_OPTINS]: <FieldInfo<BitField>>{
      bits: 12,
      encoder: bitfieldEncoder,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<BitField>>{
      bits: 24,
      encoder: bitfieldEncoder,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_LI_TRANSPARENCY]: <FieldInfo<BitField>>{
      bits: 24,
      encoder: bitfieldEncoder,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_ONE_TREATMENT]: <FieldInfo<boolean>>{
      bits: 1,
      encoder: booleanEncoder,
      getValue: (m) => true, // TODO
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_COUNTRY_CODE]: {
      bits: 12,
      encoder: languageEncoder,
      getValue: (m) => 'DE', // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_CONSENTS]: {
      bits: undefined,
      encoder: vendorEncoder,
      getValue: (m) => new IdSet([], true, 1, 100), // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_LEGITIMATE_INTEREST]: {
      bits: undefined,
      encoder: vendorEncoder,
      getValue: (m) => new IdSet([], true, 1, 100), // TODO
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_RESTRICTIONS]: {
      bits: undefined,
      encoder: publisherRestrictionsEncoder,
      getValue: (m) => undefined, // TODO
      setValue: (m, v) => { },
    },
    // TODO: many more
  },
}
