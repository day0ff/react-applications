import {ICanvas} from '../ICanvas';

declare global {
  interface Window {
    fx: any;
  }
}

export interface IGLFX extends ICanvas<ImageData, ImageData> {
  filter: (canvas: any, tempCanvas: HTMLCanvasElement) => HTMLCanvasElement;
}

