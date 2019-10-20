import {ICanvas} from '../ICanvas';

export type IPosition = [number, number];

export interface IVideoData {
  imageData?: ImageData;
  positions?: IPosition[];
}

export interface IVideo extends ICanvas<undefined, IVideoData> {
  name: 'video';
  autoPlay: boolean;
}
