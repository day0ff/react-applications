import { ICanvas } from '../ICanvas';
import { IVideoData } from './IVideo';

export interface IImage extends ICanvas<undefined, IVideoData> {
  src: string;
}
