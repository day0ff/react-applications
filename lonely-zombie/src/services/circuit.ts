import {average, length} from './helpers';
import {IPosition} from '../model/canvases/IVideo';

export function circuit(positions: IPosition[], canvasContext: CanvasRenderingContext2D) {
  canvasContext.beginPath();
  const angle = Math.acos((positions[14][0] - positions[0][0]) / length(positions[0], positions[14]));
  const sign = positions[14][1] - positions[0][1] > 0 ? 1 : -1;
  canvasContext.arc(
    average(positions[0][0], positions[14][0]),
    average(positions[0][1], positions[14][1]),
    Math.round(length(positions[0], positions[14]) / 2),
    sign * angle,
    sign * angle + Math.PI,
    true
  );
  positions.forEach((point, index) => {
    index == 0 && canvasContext.moveTo(point[0], point[1]);
    index <= 14 && canvasContext.lineTo(point[0], point[1]);
  });
  canvasContext.stroke();
  canvasContext.closePath();
}
