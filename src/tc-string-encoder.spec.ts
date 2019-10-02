import { Encoder } from './interfaces';
import { TCModel } from './model';
import { TCStringEncoder } from './tc-string-encoder';

describe('TcModelEncoder', (): void => {

  let encoder: Encoder<TCModel>;

  beforeEach(() => {
    encoder = new TCStringEncoder();
  })

  describe('encode TCF v1.0', (): void => {
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
  });

  describe('encode TCF v2.0', (): void => {
    it('should encode TCModel', (): void => {
      const tcModel = new TCModel();
      tcModel.version = 2;
      tcModel.created = new Date('2019-02-04T21:16:05.200Z');
      tcModel.lastUpdated = new Date('2019-04-09T14:35:10.200Z');
      tcModel.cmpId = 31;
      tcModel.cmpVersion = 234;
      tcModel.vendorListVersion = 141;
      tcModel.consentLanguage = 'en'
      tcModel.consentScreen = 5;
      const encoded = encoder.encode(tcModel);
      const expected = 'CObdrPUOevsguAfDqFENCNAAAAAmeAAA';
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
  });

  describe('decode TCF v2.0', (): void => {

    it('should decode [Core]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors].[AllowedVendors]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors].[AllowedVendors].[PublisherTC]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA.OevsguAfDq';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[PublisherTC]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.OevsguAfDq';
      const { decoded: tcModel } = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });
  });
});
