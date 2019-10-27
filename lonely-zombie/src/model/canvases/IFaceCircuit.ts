import { ICanvas } from '../ICanvas';
import { IPosition } from './IVideo';

export interface IFaceCircuit extends ICanvas<ImageData, ImageData> {
  positions?: IPosition[];
}
