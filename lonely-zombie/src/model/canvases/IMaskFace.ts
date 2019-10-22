import { ICanvas } from '../ICanvas';
import { IPosition } from './IVideo';

export interface IMaskFace extends ICanvas<ImageData, ImageData> {
  positions?: IPosition[];
}
