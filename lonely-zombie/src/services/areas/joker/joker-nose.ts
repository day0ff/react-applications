import {IPosition} from '../../../model/canvases/IVideo';

export function jpkerNose<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.moveTo(...points[34]);
  context.lineTo(...points[35]);
  context.lineTo(...points[36]);
  context.lineTo(...points[37]);
  context.lineTo(...points[38]);
  context.lineTo(...points[39]);
  context.lineTo(...points[40]);
  context.lineTo(...points[41]);
  context.fill();
  return context;
}
