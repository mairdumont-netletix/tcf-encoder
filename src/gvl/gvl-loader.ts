import { GlobalVendorList } from "@mdnx/tcf-types";
import { isIntegerGreaterThan } from "../utils";
import { GVL } from "./gvl";

export class GVLLoader {

  public async load(version?: number | string, timeout?: number): Promise<GVL> {
    const url = this.getUrl(version);
    const json = await this.fetch(url, timeout);
    return new GVL(json as GlobalVendorList);
  }

  protected getUrl(version?: number | string): string {
    if (isIntegerGreaterThan(version, 0)) {
      return `https://vendorlist.consensu.org/v2/archives/vendor-list-v${version}.json`;
    } else {
      return 'https://vendorlist.consensu.org/v2/vendor-list.json';
    }
  }

  protected async fetch(url: string, timeout: number = 0): Promise<object> {
    return new Promise((resolve: (response: object) => void, reject: (error: Error) => void): void => {
      const req: XMLHttpRequest = new XMLHttpRequest();
      const onLoad: (evt: Event) => void = (): void => {
        if (req.readyState == XMLHttpRequest.DONE) {
          // anything that is not in the two hundreds is an error and if the responseText is null that means it failed
          if (req.status >= 200 && req.status < 300 && req.responseType === 'json' && req.response) {
            resolve(req.response);
          } else {
            reject(new Error(`JSON Error Status: ${req.status} responeType: ${req.responseType}`));
          }
        }
      };
      const onError: (evt: Event) => void = (): void => {
        reject(new Error('fetch error'));
      };
      const onAbort: (evt: Event) => void = (): void => {
        reject(new Error('fetch aborted'));
      };
      const onTimeout: () => void = (): void => {
        reject(new Error('Timeout ' + timeout + 'ms ' + url));
      };

      req.responseType = 'json';
      req.withCredentials = true;

      req.addEventListener('load', onLoad);
      req.addEventListener('error', onError);
      req.addEventListener('abort', onAbort);


      req.open('GET', url, true);

      // IE has a problem if this is before the open
      req.timeout = timeout;
      req.ontimeout = onTimeout;

      req.send(null);
    });
  }
}
