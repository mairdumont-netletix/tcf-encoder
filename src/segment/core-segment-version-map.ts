import { BitField } from "@mdnx/tcf-types";
import { BitFieldEncoder, BooleanEncoder, DateEncoder, NumberEncoder } from "../base";
import { IdSetLinearEncoder, LanguageEncoder, PublisherRestrictionsEncoder, VendorEncoder } from "../composed";
import { Field, Version } from "../constants";
import { FieldInfo, VersionMap } from "../interfaces";
import { IdSet } from "../model";

export const coreSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => 1,
      setValue: (m, v) => { },
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: DateEncoder.getInstance,
      getValue: (m) => m.created,
      setValue: (m, v) => m.created = v,
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: DateEncoder.getInstance,
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => m.lastUpdated = v,
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.cmpId,
      setValue: (m, v) => m.cmpId = v,
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => m.cmpVersion = v,
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.consentScreen,
      setValue: (m, v) => m.consentScreen = v,
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      getEncoder: LanguageEncoder.getInstance,
      getValue: (m) => m.consentLanguage,
      setValue: (m, v) => m.consentLanguage = v,
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => m.vendorListVersion = v,
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: IdSetLinearEncoder.getInstance,
      getValue: (m) => m.purposeConsents,
      setValue: (m, v) => v.forEach(id => m.purposeConsents.add(id)),
    },
    [Field.VENDOR_CONSENTS]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: VendorEncoder.getInstance,
      getValue: (m) => m.vendorConsents,
      setValue: (m, v) => v.forEach(id => m.vendorConsents.add(id)),
    },
  },
  [Version.V2]: {
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: NumberEncoder.getInstance,
      getValue: () => 2,
      setValue: (m, v) => { },
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: DateEncoder.getInstance,
      getValue: (m) => m.created,
      setValue: (m, v) => { },
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: DateEncoder.getInstance,
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => { },
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.cmpId,
      setValue: (m, v) => { },
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => { },
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => 1, // TODO
      setValue: (m, v) => { },
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      getEncoder: LanguageEncoder.getInstance,
      getValue: (m) => 'DE', // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => { },
    },
    [Field.POLICY_VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: NumberEncoder.getInstance,
      getValue: (m) => 1, // TODO
      setValue: (m, v) => { },
    },
    [Field.IS_SERVICE_SPECIFIC]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: BooleanEncoder.getInstance,
      getValue: (m) => false, // TODO
      setValue: (m, v) => { },
    },
    [Field.USE_NON_STANDARD_STACKS]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: BooleanEncoder.getInstance,
      getValue: (m) => false, // TODO
      setValue: (m, v) => { },
    },
    [Field.SPECIAL_FEATURES_OPTINS]: <FieldInfo<BitField>>{
      bits: 12,
      getEncoder: BitFieldEncoder.getInstance,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<BitField>>{
      bits: 24,
      getEncoder: BitFieldEncoder.getInstance,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_LI_TRANSPARENCY]: <FieldInfo<BitField>>{
      bits: 24,
      getEncoder: BitFieldEncoder.getInstance,
      getValue: (m) => '0', // TODO
      setValue: (m, v) => { },
    },
    [Field.PURPOSE_ONE_TREATMENT]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: BooleanEncoder.getInstance,
      getValue: (m) => true, // TODO
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_COUNTRY_CODE]: {
      bits: 12,
      getEncoder: LanguageEncoder.getInstance,
      getValue: (m) => 'DE', // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_CONSENTS]: {
      bits: undefined,
      getEncoder: VendorEncoder.getInstance,
      getValue: (m) => new IdSet([], true, 1, 100), // TODO
      setValue: (m, v) => { },
    },
    [Field.VENDOR_LEGITIMATE_INTEREST]: {
      bits: undefined,
      getEncoder: VendorEncoder.getInstance,
      getValue: (m) => new IdSet([], true, 1, 100), // TODO
      setValue: (m, v) => { },
    },
    [Field.PUBLISHER_RESTRICTIONS]: {
      bits: undefined,
      getEncoder: PublisherRestrictionsEncoder.getInstance,
      getValue: (m) => undefined, // TODO
      setValue: (m, v) => { },
    },
    // TODO: many more
  },
}
