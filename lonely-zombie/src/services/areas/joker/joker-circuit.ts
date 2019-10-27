import {average, length} from '../../helpers';
import {IPosition} from '../../../model/canvases/IVideo';

export function jokerCircuit<IPath>(points: IPosition[], context: CanvasRenderingContext2D) {
  context.beginPath();
  points.forEach((point, index) => {
    index == 0 && context.moveTo(point[0], point[1]);
    index <= 14 && context.lineTo(point[0], point[1]);
  });
  context.arc(average(points[0][0], points[14][0]), average(points[0][1], points[14][1]),
    Math.round(length(points[0], points[14]) / 2), -0.2 * Math.PI, 1.2 * Math.PI, true);
  context.closePath();
  context.fill();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.fillStyle = 'blue';
  context.moveTo(...points[23]);
  context.lineTo(...points[63]);
  context.lineTo(...points[26]);
  context.lineTo(...points[64]);
  context.lineTo(...points[25]);
  context.lineTo(...points[65]);
  context.lineTo(...points[26]);
  context.lineTo(...points[66]);
  context.lineTo(...points[23]);

  context.moveTo(...points[30]);
  context.lineTo(...points[68]);
  context.lineTo(...points[29]);
  context.lineTo(...points[67]);
  context.lineTo(...points[28]);
  context.lineTo(...points[70]);
  context.lineTo(...points[31]);
  context.lineTo(...points[69]);
  context.lineTo(...points[30]);
  context.closePath();
  context.fill();
  return context;
}
