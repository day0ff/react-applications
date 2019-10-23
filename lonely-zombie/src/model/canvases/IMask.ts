import { ICanvas } from '../ICanvas';
import { IPosition } from './IVideo';

export interface IMask extends ICanvas<ImageData, ImageData> {
  positions?: IPosition[];
}
