import {ICanvas} from '../ICanvas';
import {IPosition} from './IVideo';
import {IPath} from './IMakeup';
import {IFilter} from './IGLFX';

declare global {
  interface Window {
    pModel: any;
  }
}

export interface IDeformation {
  (canvas: any, tempCanvas: HTMLCanvasElement, positions: IPosition[]): HTMLCanvasElement;
}

export interface IDeformer extends ICanvas<ImageData, ImageData> {
  positions: IPosition[];
  deformations: IDeformation[];
}
