import {IPosition} from '../../model/canvases/IVideo';

export function eyePath<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.moveTo(...points[23]);
  context.lineTo(...points[63]);
  context.lineTo(...points[24]);
  context.lineTo(...points[64]);
  context.lineTo(...points[25]);
  context.lineTo(...points[65]);
  context.lineTo(...points[26]);
  context.lineTo(...points[66]);
  return context;
}
