import {ICanvas} from '../ICanvas';

declare global {
  interface Window {
    fx: any;
  }
}

export interface IGLFX extends ICanvas<ImageData, ImageData> {
  filter: (tempCanvas:HTMLCanvasElement) => HTMLCanvasElement;
}

