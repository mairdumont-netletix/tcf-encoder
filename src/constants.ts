export enum SegmentType {
  CORE = 0,
  VENDORS_DISCLOSED = 1,
  VENDORS_ALLOWED = 2,
  PUBLISHER_TC = 3,
}

export enum Version {
  V1 = 1,
  V2 = 2,
}

export enum Field {
  VERSION = 'version',
  CREATED = 'created',
  LAST_UPDATED = 'lastUpdated',
  CMP_ID = 'cmpId',
  CMP_VERSION = 'cmpVersion',
  CONSENT_SCREEN = 'consentScreen',
  CONSENT_LANGUAGE = 'consentLanguage',
  VENDOR_LIST_VERSION = 'vendorListVersion',
  POLICY_VERSION = 'policyVersion',
  IS_SERVICE_SPECIFIC = 'isServiceSpecific',
  USE_NON_STANDARD_STACKS = 'useNonStandardStacks',
  SPECIAL_FEATURES_OPTINS = 'specialFeatureOptIns',
  PURPOSE_CONSENTS = 'purposeConsents',
  PURPOSE_LI_TRANSPARENCY = 'purposeLITransparency',
  PURPOSE_ONE_TREATMENT = 'purposeOneTreatment',
  PUBLISHER_COUNTRY_CODE = 'publisherCountryCode',
  VENDOR_CONSENTS = 'vendorConsents',
  VENDOR_LEGITIMATE_INTEREST = 'vendorLegitimateInterest',
  PUBLISHER_RESTRICTIONS = 'publisherRestrictions',
  VENDORS_DISCOLOSED = 'vendorsDisclosed',
  VENDORS_ALLOWED = 'vendorsAllowed',
  PUBLISHER_CONSENTS = 'publisherConsents',
  PUBLISHER_LI_TRANSPARENCY = 'publisherLITransparency',
  NUM_CUSTOM_PURPOSES = 'numCustomPurposes',
  PUBLISHER_CUSTOM_CONSENTS = 'publisherCustomConsents',
  PUBLISHER_CUSTOM_LI_TRANSPARENCY = 'publisherCustomLITransparency',
}
