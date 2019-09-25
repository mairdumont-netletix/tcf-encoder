import xhrMock, { MockRequest, MockResponse } from 'xhr-mock';
import jsonGvlV1 from '../__tests__/fixtures/gvl-v1.json';
import jsonGvlV2 from '../__tests__/fixtures/gvl-v2.json';
import { GVLLoader } from "./gvl-loader";

describe('GVLLoader', (): void => {

  const jsonHandler = (json: any) => (_req: MockRequest, res: MockResponse) => res
    .status(200)
    .header('Content-Type', 'application/json')
    .body(json)

  let loader: GVLLoader;

  beforeEach(() => {
    xhrMock.setup();
    loader = new GVLLoader();
  })

  afterEach(() => {
    xhrMock.teardown();
    (loader as any) = undefined;
  });

  describe('should load GlobalVendorList', (): void => {

    beforeEach(() => {
      xhrMock.get('*', (_req: MockRequest, res: MockResponse) => res.status(404));
      xhrMock.get('https://vendorlist.consensu.org/v2/vendor-list.json', jsonHandler(jsonGvlV2));
      xhrMock.get('https://vendorlist.consensu.org/v2/archives/vendor-list-v1.json', jsonHandler(jsonGvlV1));
      xhrMock.get('https://vendorlist.consensu.org/v2/archives/vendor-list-v2.json', jsonHandler(jsonGvlV2));
    })

    it('should load latest gvl when not providing a version', async () => {
      const gvl = await loader.load();
      expect(gvl.gvlSpecificationVersion).toBe(2);
      expect(gvl.vendorListVersion).toBe(2);
      expect(gvl.tcfPolicyVersion).toBe(2);
      expect(gvl.lastUpdated).toBe('2019-09-19T16:05:14Z');
      expect(gvl.purposes[1].name).toBe('Store and/or access information on a device');
    });

    it('should load latest gvl when using "latest" as version', async () => {
      const gvl = await loader.load('latest');
      expect(gvl.gvlSpecificationVersion).toBe(2);
      expect(gvl.vendorListVersion).toBe(2);
      expect(gvl.tcfPolicyVersion).toBe(2);
      expect(gvl.lastUpdated).toBe('2019-09-19T16:05:14Z');
      expect(gvl.purposes[1].name).toBe('Store and/or access information on a device');
    });

    it('should load a version when using a number', async () => {
      const gvl = await loader.load(1);
      expect(gvl.gvlSpecificationVersion).toBe(2);
      expect(gvl.vendorListVersion).toBe(1);
      expect(gvl.tcfPolicyVersion).toBe(2);
      expect(gvl.lastUpdated).toBe('2019-09-01T00:00:00Z');
      expect(gvl.purposes[1].name).toBe('Store and/or access information on a device');
    });

  });

  describe('should handle errors', (): void => {

    it('should handle timeout', async () => {
      xhrMock.get('https://vendorlist.consensu.org/v2/archives/vendor-list-v2.json', () => new Promise(() => { }));
      await expect(loader.load(2, 1)).rejects.toThrowError(/Timeout/);
    });

    it('should handle 500 status code', async () => {
      xhrMock.get('https://vendorlist.consensu.org/v2/archives/vendor-list-v2.json', (_, res) => res.status(500));
      await expect(loader.load(2, 1)).rejects.toThrowError(/JSON Error Status: 500/);
    });

    it('should handle error', async () => {
      xhrMock.error(() => { }); // mute errors
      xhrMock.get('https://vendorlist.consensu.org/v2/archives/vendor-list-v2.json', () => Promise.reject(new Error()));
      await expect(loader.load(2, 1)).rejects.toThrowError(/fetch error/);
    });
  });
});
