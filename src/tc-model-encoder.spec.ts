import { Encoder } from './interfaces';
import { TCModel } from './model/tc-model';
import { TCModelEncoder } from './tc-model-encoder';

describe('TcModelEncoder', (): void => {

  let encoder: Encoder<TCModel>;

  beforeEach(() => {
    encoder = new TCModelEncoder();
  })

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
