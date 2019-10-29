import {ICanvas} from '../ICanvas';

declare global {
  interface Window {
    fx: any;
  }
}

export interface IFilter {
  (canvas: any, tempCanvas: HTMLCanvasElement): HTMLCanvasElement;
}

export interface IGLFX extends ICanvas<ImageData, ImageData> {
  filter: IFilter;
}

