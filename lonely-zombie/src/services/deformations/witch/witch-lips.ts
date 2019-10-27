import {IPosition} from '../../../model/canvases/IVideo';
import {lipsAroundPath} from '../../areas/lipsAround';

export function witchLips<IDeformation>(canvas: any, canvasElement: HTMLCanvasElement, positions: IPosition[]) {
  const {width, height} = canvasElement;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;

  const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

  tempContext.clearRect(0, 0, width, height);
  tempContext.save();
  tempContext.beginPath();

  lipsAroundPath(positions, tempContext);

  tempContext.closePath();
  tempContext.clip();

  tempContext.drawImage(canvasElement, 0, 0, width, height);
  tempContext.restore();

  const b = [...positions[2], ...positions[12], ...positions[4], ...positions[10]];
  const a = [...b];
  a[0] = a[0] * 1.05;
  a[2] = a[2] * 0.95;
  a[4] = a[4] * 1.05;
  a[6] = a[6] * 0.95;

  canvas.draw(canvas.texture(tempCanvas))
    .perspective(b, a)
    .update();

  return canvas;
}
