import { PurposeInfo } from '@mdnx/tcf-types';
import { Version } from '../constants';
import { TCModelError } from '../error/tc-model-error';
import { GVL } from '../gvl/gvl';
import { IdMap } from '../interfaces';
import { isIntegerGreaterThan } from '../utils';
import { IdSet } from './id-set';
import { PublisherRestrictions } from './publisher-restrictions';

export class TCModel /*implements TCData*/ {

  private version_: Version = Version.V2;
  private consentScreen_: number = 0;
  private tcfPolicyVersion_: number = 2;
  private isServiceSpecific_: boolean = false;
  private useNonStandardStacks_: boolean = false;
  private purposeOneTreatment_: boolean = false;
  private publisherCountryCode_: string = 'AA';
  private supportOOB_: boolean = false;

  private cmpId_: number = 0;
  private cmpVersion_: number = 0;
  private consentLanguage_: string = 'EN';
  private gvl_?: GVL;

  private created_: Date = new Date();
  private lastUpdated_: Date = new Date();
  private vendorListVersion_: number = 0;

  public readonly specialFeatureOptIns: IdSet = new IdSet();

  public readonly purposeConsents: IdSet = new IdSet();
  public readonly purposeLITransparency: IdSet = new IdSet();

  public readonly publisherConsents: IdSet = new IdSet();
  public readonly publisherLITransparency: IdSet = new IdSet();

  public customPurposes: IdMap<PurposeInfo> = {};

  public readonly publisherCustomConsents: IdSet = new IdSet();
  public readonly publisherCustomLITransparency: IdSet = new IdSet();

  public readonly vendorConsents: IdSet = new IdSet();
  public readonly vendorLegitimateInterest: IdSet = new IdSet();

  public readonly vendorsDisclosed: IdSet = new IdSet();
  public readonly vendorsAllowed: IdSet = new IdSet();

  public readonly publisherRestrictions: PublisherRestrictions = new PublisherRestrictions();

  constructor(gvl?: GVL) {
    this.gvl = gvl;
  }

  public set gvl(gvl: GVL | undefined) {
    if (gvl) {
      if (this.gvl_ !== undefined) {
        throw new Error('you should set gvl only once');
      }
      this.gvl_ = gvl;
      this.vendorListVersion = gvl.vendorListVersion;
      this.tcfPolicyVersion = gvl.tcfPolicyVersion;
      // TODO
    }
  }

  public get gvl(): GVL | undefined {
    return this.gvl_;
  }

  public set version(value: number) {
    if (isIntegerGreaterThan(value, 0) && value in Version) {
      this.version_ = value;
    } else {
      throw new TCModelError('version', value);
    }
  }

  public get version(): number {
    return this.version_;
  }

  public set consentScreen(value: number) {
    if (isIntegerGreaterThan(value, -1)) {
      this.consentScreen_ = value;
    } else {
      throw new TCModelError('consentScreen', value);
    }
  }

  public get consentScreen(): number {
    return this.consentScreen_;
  }

  public set tcfPolicyVersion(value: number) {
    if (isIntegerGreaterThan(value, 1)) {
      this.tcfPolicyVersion_ = value;
    } else {
      throw new TCModelError('tcfPolicyVersion', value);
    }
  }

  public get tcfPolicyVersion(): number {
    return this.tcfPolicyVersion_;
  }

  public set isServiceSpecific(value: boolean) {
    this.isServiceSpecific_ = value;
  }

  public get isServiceSpecific(): boolean {
    return this.isServiceSpecific_;
  }

  public set useNonStandardStacks(value: boolean) {
    this.useNonStandardStacks_ = value;
  }

  public get useNonStandardStacks(): boolean {
    return this.useNonStandardStacks_;
  }

  public set purposeOneTreatment(value: boolean) {
    this.purposeOneTreatment_ = value;
  }

  public get purposeOneTreatment(): boolean {
    return this.purposeOneTreatment_;
  }

  public set publisherCountryCode(value: string) {
    if (/^([A-Za-z]){2}$/.test(value)) {
      this.publisherCountryCode_ = value.toUpperCase();
    } else {
      throw new TCModelError('publisherCountryCode', value);
    }
  }

  public get publisherCountryCode(): string {
    return this.publisherCountryCode_;
  }

  public set supportOOB(value: boolean) {
    this.supportOOB_ = value;
  }

  public get supportOOB(): boolean {
    return this.supportOOB_;
  }

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

  public set consentLanguage(lang: string) {
    if (/^([A-Za-z]){2}$/.test(lang)) {
      this.consentLanguage_ = lang.toUpperCase();
    } else {
      throw new TCModelError('consentLanguage', lang);
    }
  }

  public get consentLanguage(): string {
    return this.consentLanguage_;
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
