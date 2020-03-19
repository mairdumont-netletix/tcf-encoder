import { PurposeInfo } from '@mdnx/tcf-types';
import { NumberEncoder } from '../base';
import { Decoded, Encoder, IdMap } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';
import { IdSetLinearEncoder } from './id-set-linear-encoder';

export interface CustomPurposeData {
  customPurposes: IdMap<PurposeInfo>;
  publisherCustomConsents: IdSet;
  publisherCustomLITransparency: IdSet;
}

export class CustomPurposeDataEncoder implements Encoder<CustomPurposeData> {

  public encode(value: CustomPurposeData): string {
    const numberEncoder = Singleton.of(NumberEncoder);
    const idSetEncoder = Singleton.of(IdSetLinearEncoder);

    const numCustomPurposes = Object.keys(value.customPurposes).length;
    let bitString = numberEncoder.encode(numCustomPurposes, 6);
    bitString += idSetEncoder.encode(value.publisherCustomConsents, numCustomPurposes);
    bitString += idSetEncoder.encode(value.publisherCustomLITransparency, numCustomPurposes);
    return bitString;
  }

  public decode(value: string): Decoded<CustomPurposeData> {
    const numberEncoder = Singleton.of(NumberEncoder);
    const idSetEncoder = Singleton.of(IdSetLinearEncoder);

    const { decoded: numCustomPurposes } = numberEncoder.decode(value.substr(0, 6));
    const { decoded: publisherCustomConsents } = idSetEncoder.decode(value.substr(6, numCustomPurposes));
    const { decoded: publisherCustomLITransparency } = idSetEncoder.decode(value.substr(6 + numCustomPurposes, numCustomPurposes));

    const customPurposes: IdMap<PurposeInfo> = {};
    for (let id = 1; id <= numCustomPurposes; id++) {
      customPurposes[id] = {
        id,
        name: `publisher purpose ${id}`,
        description: `publisher purpose description${id}`,
        descriptionLegal: `publisher purpose legal description ${id}`,
      };
    }

    return {
      numBits: 6 + 2 * numCustomPurposes,
      decoded: {
        customPurposes,
        publisherCustomConsents,
        publisherCustomLITransparency,
      }
    }
  }
}
