import {IPosition} from '../../../model/canvases/IVideo';
import {angle, average} from '../../helpers';

export function jokerEyebrowsTriangle<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  const indent = -40;
  const corner = angle(points);
  context.lineCap = 'round';
  context.lineWidth = 15;
  context.moveTo(...points[18]);
  context.lineTo(...points[15]);
  const leftX = average(points[15][0], points[18][0]) - indent * Math.sin(corner);
  const leftY = average(points[15][1], points[18][1]) + indent * Math.cos(corner);
  context.lineTo(leftX, leftY);

  context.moveTo(...points[19]);
  context.lineTo(...points[22]);
  const rightX = average(points[22][0], points[19][0]) - indent * Math.sin(corner);
  const rightY = average(points[22][1], points[19][1]) + indent * Math.cos(corner);
  context.lineTo(rightX, rightY);
  context.fill();
  return context;
}

