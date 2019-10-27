import {ICanvas} from '../ICanvas';
import {IPosition} from './IVideo';

declare global {
  interface Window {
    pModel: any;
  }
}

export interface IDeformer extends ICanvas<ImageData, ImageData> {
  positions: { before: IPosition[], after: IPosition[] };
}
