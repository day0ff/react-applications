import {ICanvas} from '../ICanvas';

export type IPosition = [number, number];

export interface IVideoData {
  videoData?: ImageData;
  positions?: IPosition[];
}

export interface IVideo extends ICanvas<undefined, IVideoData> {
  autoPlay: boolean;
}
