import { Encoder } from './interfaces';
import { TCModel } from './model/tc-model';
import { TCModelEncoder } from './tc-model-encoder';

describe('TcModelEncoder', (): void => {

  let encoder: Encoder<TCModel>;

  beforeEach(() => {
    encoder = new TCModelEncoder();
  })

  describe('encode', (): void => {
    it('should encode TCModel', (): void => {
      const tcModel = new TCModel();
      tcModel.cmpId = 9999;
      tcModel.cmpVersion = 17;
      tcModel.vendorListVersion = 2;
      const encoded = encoder.encode(tcModel);
      const expected = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA';
      expect(encoded).toBe(expected);
    });
  });

  describe('decode', (): void => {

    it('should decode [Core]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA';
      const tcModel = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA';
      const tcModel = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors].[AllowedVendors]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA';
      const tcModel = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[DisclosedVendors].[AllowedVendors].[PublisherTC]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.PVAfDObdrA.DqFENCAmeAENCDA.OevsguAfDq';
      const tcModel = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });

    it('should decode [Core].[PublisherTC]', (): void => {
      const tc = 'BObdrPUOevsguAfDqFENCNAAAAAmeAAA.OevsguAfDq';
      const tcModel = encoder.decode(tc);
      expect(tcModel).toBeDefined();
    });
  });
});
