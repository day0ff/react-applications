import {IPosition} from '../../../model/canvases/IVideo';
import {average} from '../../helpers';

export function jokerEyebrowsTriangle<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.lineCap = 'round';
  context.lineWidth = 15;
  context.moveTo(...points[18]);
  context.lineTo(...points[15]);
  const leftX = average(points[15][0], points[18][0]);
  const leftY = points[15][1] - 40;
  context.lineTo(leftX, leftY);

  context.moveTo(...points[19]);
  context.lineTo(...points[22]);
  const rightX = average(points[22][0], points[19][0]);
  const rightY = points[22][1] - 40;
  context.lineTo(rightX, rightY);
  context.fill();
  return context;
}
