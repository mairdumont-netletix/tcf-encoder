import { BooleanEncoder, DateEncoder, NumberEncoder } from '../base';
import { IdSetLinearEncoder, LanguageEncoder, PublisherRestrictionsEncoder, VendorEncoder } from '../composed';
import { Field, Version } from '../constants';
import { FieldInfo, VersionMap } from '../interfaces';
import { IdSet, PublisherRestrictions } from '../model';
import { Singleton } from '../utils';

export const coreSegmentVersionMap: VersionMap = {
  [Version.V1]: {
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.version,
      setValue: (m, v) => m.version = 1,
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: () => Singleton.of(DateEncoder),
      getValue: (m) => m.created,
      setValue: (m, v) => m.created = v,
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: () => Singleton.of(DateEncoder),
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => m.lastUpdated = v,
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.cmpId,
      setValue: (m, v) => m.cmpId = v,
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => m.cmpVersion = v,
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.consentScreen,
      setValue: (m, v) => m.consentScreen = v,
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      getEncoder: () => Singleton.of(LanguageEncoder),
      getValue: (m) => m.consentLanguage,
      setValue: (m, v) => m.consentLanguage = v,
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => m.vendorListVersion = v,
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.purposeConsents,
      setValue: (m, v) => v.forEach(id => m.purposeConsents.add(id)),
    },
    [Field.VENDOR_CONSENTS]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(VendorEncoder),
      getValue: (m) => m.vendorConsents,
      setValue: (m, v) => v.forEach(id => m.vendorConsents.add(id)),
    },
  },
  [Version.V2]: {
    [Field.VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.version,
      setValue: (m, v) => m.version = 2,
    },
    [Field.CREATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: () => Singleton.of(DateEncoder),
      getValue: (m) => m.created,
      setValue: (m, v) => m.created = v,
    },
    [Field.LAST_UPDATED]: <FieldInfo<Date>>{
      bits: 36,
      getEncoder: () => Singleton.of(DateEncoder),
      getValue: (m) => m.lastUpdated,
      setValue: (m, v) => m.lastUpdated = v,
    },
    [Field.CMP_ID]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.cmpId,
      setValue: (m, v) => m.cmpId = v,
    },
    [Field.CMP_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.cmpVersion,
      setValue: (m, v) => m.cmpVersion = v,
    },
    [Field.CONSENT_SCREEN]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.consentScreen,
      setValue: (m, v) => m.consentScreen = v,
    },
    [Field.CONSENT_LANGUAGE]: <FieldInfo<string>>{
      bits: 12,
      getEncoder: () => Singleton.of(LanguageEncoder),
      getValue: (m) => m.consentLanguage,
      setValue: (m, v) => m.consentLanguage = v,
    },
    [Field.VENDOR_LIST_VERSION]: <FieldInfo<number>>{
      bits: 12,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.vendorListVersion,
      setValue: (m, v) => m.vendorListVersion = v,
    },
    [Field.POLICY_VERSION]: <FieldInfo<number>>{
      bits: 6,
      getEncoder: () => Singleton.of(NumberEncoder),
      getValue: (m) => m.tcfPolicyVersion,
      setValue: (m, v) => m.tcfPolicyVersion = v,
    },
    [Field.IS_SERVICE_SPECIFIC]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: () => Singleton.of(BooleanEncoder),
      getValue: (m) => m.isServiceSpecific,
      setValue: (m, v) => m.isServiceSpecific = v,
    },
    [Field.USE_NON_STANDARD_STACKS]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: () => Singleton.of(BooleanEncoder),
      getValue: (m) => m.useNonStandardStacks,
      setValue: (m, v) => m.useNonStandardStacks = v,
    },
    [Field.SPECIAL_FEATURES_OPTINS]: <FieldInfo<IdSet>>{
      bits: 12,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.specialFeatureOptIns,
      setValue: (m, v) => v.forEach(id => m.specialFeatureOptIns.add(id)),
    },
    [Field.PURPOSE_CONSENTS]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.purposeConsents,
      setValue: (m, v) => v.forEach(id => m.purposeConsents.add(id)),
    },
    [Field.PURPOSE_LI_TRANSPARENCY]: <FieldInfo<IdSet>>{
      bits: 24,
      getEncoder: () => Singleton.of(IdSetLinearEncoder),
      getValue: (m) => m.purposeLITransparency,
      setValue: (m, v) => v.forEach(id => m.purposeLITransparency.add(id)),
    },
    [Field.PURPOSE_ONE_TREATMENT]: <FieldInfo<boolean>>{
      bits: 1,
      getEncoder: () => Singleton.of(BooleanEncoder),
      getValue: (m) => m.purposeOneTreatment,
      setValue: (m, v) => m.purposeOneTreatment = v,
    },
    [Field.PUBLISHER_COUNTRY_CODE]: <FieldInfo<string>>{
      bits: 12,
      getEncoder: () => Singleton.of(LanguageEncoder),
      getValue: (m) => m.publisherCountryCode,
      setValue: (m, v) => m.publisherCountryCode = v,
    },
    [Field.VENDOR_CONSENTS]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(VendorEncoder),
      getValue: (m) => m.vendorConsents,
      setValue: (m, v) => v.forEach(id => m.vendorConsents.add(id)),
    },
    [Field.VENDOR_LEGITIMATE_INTEREST]: <FieldInfo<IdSet>>{
      bits: undefined,
      getEncoder: () => Singleton.of(VendorEncoder),
      getValue: (m) => m.vendorLegitimateInterest,
      setValue: (m, v) => v.forEach(id => m.vendorLegitimateInterest.add(id)),
    },
    [Field.PUBLISHER_RESTRICTIONS]: <FieldInfo<PublisherRestrictions>>{
      bits: undefined,
      getEncoder: () => Singleton.of(PublisherRestrictionsEncoder),
      getValue: (m) => m.publisherRestrictions,
      setValue: (m, v) => { }, // TODO
    },
    // TODO: many more
  },
}
