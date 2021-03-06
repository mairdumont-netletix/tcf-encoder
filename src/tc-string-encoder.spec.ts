import { SegmentType } from './constants';
import { TCModel } from './model';
import { TCStringEncoder } from './tc-string-encoder';

describe('TcModelEncoder', (): void => {

  let encoder: TCStringEncoder;

  beforeEach(() => {
    encoder = new TCStringEncoder();
  })

  describe('encode TCF v1.0', (): void => {
    // TODO: tcstring from tcf2 example, check why we generate something different

    /**
     * example from: tcstring from tcf2 example, check why we generate something different
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA
     */
    it('should encode TCModel', (): void => {
      const tcModel = new TCModel();
      tcModel.version = 1;
      tcModel.created = new Date('2019-02-04T21:16:05.200Z');
      tcModel.lastUpdated = new Date('2019-04-09T14:35:10.200Z');
      tcModel.cmpId = 31;
      tcModel.cmpVersion = 234;
      tcModel.vendorListVersion = 141;
      tcModel.consentLanguage = 'en'
      tcModel.consentScreen = 5;
      const encoded = encoder.encode(tcModel);
      const expected = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA';
      expect(encoded).toBe(expected);
    });

    // generated with mdnxcmp, should be ok
    it('should encode TCModel with range encoding for some ids', (): void => {
      const tcModel = new TCModel();
      tcModel.version = 1;
      tcModel.created = new Date('2019-09-04T13:02:55.300Z');
      tcModel.lastUpdated = new Date('2019-10-02T11:46:17.400Z');
      tcModel.cmpId = 252;
      tcModel.cmpVersion = 1;
      tcModel.vendorListVersion = 167;
      tcModel.consentLanguage = 'de'
      tcModel.consentScreen = 0;
      tcModel.purposeConsents.add([1, 3, 4, 5]);
      tcModel.vendorConsents.add([3, 128, 231, 299]);
      const encoded = encoder.encode(tcModel);
      const expected = 'BOmXRv5OnzYxeD8ABADECnuAAAASuAEAAGAIAAc4BKw';
      expect(encoded).toBe(expected);
    });
  });

  describe('encode TCF v2.0', (): void => {
    // TODO: check generated tcstring manually again
    it('should encode [Core] from TCModel', (): void => {
      const tcModel = new TCModel();
      tcModel.version = 2;
      tcModel.created = new Date('2019-02-04T21:16:05.200Z');
      tcModel.lastUpdated = new Date('2019-04-09T14:35:10.200Z');
      tcModel.cmpId = 31;
      tcModel.cmpVersion = 234;
      tcModel.vendorListVersion = 29;
      tcModel.consentLanguage = 'en'
      tcModel.consentScreen = 5;
      const encoded = encoder.encode(tcModel);
      const expected = 'CObdrPUOevsguAfDqFENAdCAAAAAAAAAAAAAAAAAAAAA';
      expect(encoded).toBe(expected);
    });

    // TODO: check generated tcstring manually again
    it('should encode [Core].[DisclosedVendors].[AllowedVendors].[PublisherTC] from TCModel with range encoding for some ids', (): void => {
      const tcModel = new TCModel();
      tcModel.version = 2;
      tcModel.created = new Date('2019-09-04T13:02:55.300Z');
      tcModel.lastUpdated = new Date('2019-10-02T11:46:17.400Z');
      tcModel.cmpId = 252;
      tcModel.cmpVersion = 1;
      tcModel.vendorListVersion = 29;
      tcModel.consentLanguage = 'de'
      tcModel.consentScreen = 0;
      tcModel.purposeConsents.add([1, 3, 4, 5]);
      tcModel.vendorConsents.add([3, 128, 231, 299]);
      const encoded = encoder.encode(tcModel, { segments: [SegmentType.VENDORS_DISCLOSED, SegmentType.VENDORS_ALLOWED, SegmentType.PUBLISHER_TC] });
      const expected = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAACVwBAABgCAAHOASsAAAAAA.IF0EWSQgCYWgho0QUBzBAIYAfJgSCAMgSAAQIoSkFQISERBAGOiAQHAEQJAAAGBAAkACAAQAoHGBMCQABgAARiRCEQUGIDzNIBIBAggEaYUFAAAVmmkHC3ZCY702yumQ.YAAAAAAAAAAAAAAAAAA'
      expect(encoded).toBe(expected);
    });
  });

  describe('decode TCF v1.0', (): void => {

    it('should decode [Core] (Version 1, no purposes allowed)', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expect(tcModel.created.toISOString()).toBe('2019-02-04T21:16:05.200Z');
      expect(tcModel.lastUpdated.toISOString()).toBe('2019-04-09T14:35:10.200Z');
      expect(tcModel.cmpId).toBe(31);
      expect(tcModel.cmpVersion).toBe(234);
      expect(tcModel.consentScreen).toBe(5);
      expect(tcModel.consentLanguage).toBe('EN');
      expect(tcModel.vendorListVersion).toBe(141);
      expect(tcModel.purposeConsents.toArray()).toStrictEqual([]);
      // TODO maxVendorId = 615
      expect(tcModel.vendorConsents.toArray()).toStrictEqual([]);
    });

    it('should decode [Core] (Version 1, some purposes and vendors allowed, Test 1)', (): void => {
      const tc = 'BOdTG66OfDvtu__A3tDECMAAADAmeACgAOABQAIQ';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expect(tcModel.created.toISOString()).toBe('2019-03-12T12:23:08.200Z');
      expect(tcModel.lastUpdated.toISOString()).toBe('2019-04-15T16:35:10.200Z');
      expect(tcModel.cmpId).toBe(4095);
      expect(tcModel.cmpVersion).toBe(55);
      expect(tcModel.consentScreen).toBe(45);
      expect(tcModel.consentLanguage).toBe('DE');
      expect(tcModel.vendorListVersion).toBe(140);
      expect(tcModel.purposeConsents.toArray()).toStrictEqual([23, 24]);
      // TODO maxVendorId = 615
      expect(tcModel.vendorConsents.toArray()).toStrictEqual([7, 8, 9, 10, 33]);
    });

    it('should decode [Core] (Version 1, some purposes and vendors allowed, Test 2)', (): void => {
      const tc = 'BOmXRv5OnzYxeD8ABADECn-AAAAqyAEAAGAIAAc4BKw';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expect(tcModel.created.toISOString()).toBe('2019-09-04T13:02:55.300Z');
      expect(tcModel.lastUpdated.toISOString()).toBe('2019-10-02T11:46:17.400Z');
      expect(tcModel.cmpId).toBe(252);
      expect(tcModel.cmpVersion).toBe(1);
      expect(tcModel.consentScreen).toBe(0);
      expect(tcModel.consentLanguage).toBe('DE');
      expect(tcModel.vendorListVersion).toBe(167);
      expect(tcModel.purposeConsents.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
      expect(tcModel.vendorConsents.toArray()).toStrictEqual([3, 128, 231, 299]);
    });

    it('should decode [Core] (Version 1, example from sdk1)', (): void => {
      const tc = 'BOhs9bQOjjnLQAXABBENCfeAAAApmABgAYADoA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expect(tcModel.version).toBe(1);
      expect(tcModel.created.toISOString()).toBe('2019-06-06T00:46:00.000Z');
      expect(tcModel.lastUpdated.toISOString()).toBe('2019-07-12T00:46:00.000Z');
      expect(tcModel.cmpId).toBe(23);
      expect(tcModel.cmpVersion).toBe(1);
      expect(tcModel.consentScreen).toBe(1);
      expect(tcModel.consentLanguage).toBe('EN');
      expect(tcModel.vendorListVersion).toBe(159);
      expect(tcModel.purposeConsents.toArray()).toStrictEqual([2, 3, 4, 5]);
      expect(tcModel.vendorConsents.toArray()).toStrictEqual([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
    });
  });

  describe('decode TCF v2.0', (): void => {

    const expectSegmentCoreToBeOK = (tcModel: TCModel): void => {
      expect(tcModel.created.toISOString()).toBe('2019-09-04T13:02:55.300Z');
      expect(tcModel.lastUpdated.toISOString()).toBe('2019-10-02T11:46:17.400Z');
      expect(tcModel.cmpId).toBe(252);
      expect(tcModel.cmpVersion).toBe(1);
      expect(tcModel.consentScreen).toBe(0);
      expect(tcModel.consentLanguage).toBe('DE');
      expect(tcModel.vendorListVersion).toBe(29);
      expect(tcModel.purposeConsents.toArray()).toStrictEqual([1, 3, 4, 5]);
      expect(tcModel.vendorConsents.toArray()).toStrictEqual([1]);
    }

    /**
     * example from: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#disclosed-vendors-oob
     *
     * TODO: recheck tc as examples in tcf2 spec are wrong:
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA
     */
    it('should decode [Core]', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAAAAoABMAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);
    });

    /**
     * example from: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#disclosed-vendors-oob
     *
     * TODO: recheck tc as examples in tcf2 spec are wrong:
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA
     */
    it('should decode [Core].[DisclosedVendors]', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAAAAoABMAA.QAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);
    });

    /**
     * example from: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#disclosed-vendors-oob
     *
     * TODO: recheck tc as examples in tcf2 spec are wrong:
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA
     */
    it('should decode [Core].[DisclosedVendors].[AllowedVendors]', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAAAAoABMAA.IAAA.QAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);
    });

    /**
     * example from: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#disclosed-vendors-oob
     *
     * TODO: recheck tc as examples in tcf2 spec are wrong:
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA.OevsguAfDq
     */
    it('should decode [Core].[DisclosedVendors].[AllowedVendors].[PublisherTC]', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAAAAoABMAA.IAAA.QAAA.YAAAAAAAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);
    });

    /**
     * example from: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#disclosed-vendors-oob
     *
     * TODO: recheck tc as examples in tcf2 spec are wrong:
     * BObdrPUOevsguAfDqFENCNAAAAAmeAAA.OevsguAfDq
     */
    it('should decode [Core].[PublisherTC]', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAAAAoABMAA.YAAAAAAAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);
    });

    it('should decode publisher tc', (): void => {
      const tc = 'COmXRv5OnzYxeD8ABADEAdCAALgAAAAAAAAACWQBAABgCAAHPASsBLAAAAAA.IF0GWSQgCYWgho0QUBzBAIYAfJgSCAMgSAAQIoSkFSISERBAGOiAQ3AEQJAAAGBAAkACAAQAoHGBMCQABgAARiRCEQUGIDzNIBIBAggEaYUFAAAVmmkHC3ZCY702yumQ.QCXQAgCWAEuA.YQAAAAAAAAAAAQAAAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
      expectSegmentCoreToBeOK(tcModel);

      expect(tcModel.vendorsAllowed.toArray()).toStrictEqual([300, 302]);
      expect(tcModel.vendorsDisclosed.toArray()).toStrictEqual([3, 128, 231, 299, 300, 302, 303]);
      expect(tcModel.publisherConsents.toArray()).toStrictEqual([5]);
      expect(tcModel.publisherCustomConsents.toArray()).toStrictEqual([23]);
    });
  });
});
