import {IPosition} from '../model/canvases/IVideo';
import {Color} from '../containers/ColorPicker/ColorPicker';

export function fillFace(positions: IPosition[], canvasContext: CanvasRenderingContext2D) {
  canvasContext.beginPath();
  positions.forEach((point, index) => {
    index == 0 && canvasContext.moveTo(point[0], point[1]);
    index <= 14 && canvasContext.lineTo(point[0], point[1]);
  });
  canvasContext.arc(average(positions[0][0], positions[14][0]), average(positions[0][1], positions[14][1]),
    Math.round(length(positions[0], positions[14]) / 2), -0.2 * Math.PI, 1.2 * Math.PI, true);
  canvasContext.closePath();
  canvasContext.clip();
}

export function average(a: number, b: number): number {
  return Math.round((a + b) / 2);
}

export function length(x: IPosition, y: IPosition): number {
  return Math.round(Math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2));
}

export function rgba(color:Color){
  return `rgba(${color.r},${color.g},${color.b},${color.a})`
}
