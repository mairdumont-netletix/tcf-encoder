/**
 * There are 4 distinct TC String segments that are joined together on a “dot” character.
 */
export enum SegmentType {
  // The core vendor transparency and consent details
  CORE = 0,
  // Disclosed vendors for validating OOB signaling
  VENDORS_DISCLOSED = 1,
  // Allowed vendors for restricting OOB signaling to select vendors
  VENDORS_ALLOWED = 2,
  // Publisher purposes transparency and consent for their own data uses
  PUBLISHER_TC = 3,
}

/**
 * IsRangeEncoding, 1bit,
 * The encoding scheme used to encode the IDs in the section – Either a
 * BitField Section or Range Section follows. Encoding logic should choose
 * the encoding scheme that results in the smaller output size for a given set.
 */
export enum EncodingType {
  FIELD = 0,
  RANGE = 1
}

/**
 * IsARange, 1bit,
 */
export enum RangeType {
  SINGLE_ID = 0,
  ID_RANGE = 1,
}

export enum Version {
  V1 = 1,
  V2 = 2,
}

export enum Field {
  SEGMENT_TYPE = 'segmentType',
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
