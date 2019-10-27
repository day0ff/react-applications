import {IPosition} from '../../../model/canvases/IVideo';
import {chin as chinPath} from '../../areas/chin';

export function zombieChin<IDeformation>(canvas: any, canvasElement: HTMLCanvasElement, positions: IPosition[]) {
  const {width, height} = canvasElement;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;

  const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

  tempContext.clearRect(0, 0, width, height);
  tempContext.save();
  tempContext.beginPath();

  chinPath(positions, tempContext);

  tempContext.closePath();
  tempContext.clip();

  tempContext.drawImage(canvasElement, 0, 0, width, height);
  tempContext.restore();

  const b = [...positions[2], ...positions[12], ...positions[6], ...positions[8]];
  const a = [...b];
  a[4] = a[4] - 10;
  a[6] = a[6] + 10;

  canvas.draw(canvas.texture(tempCanvas))
    .perspective(b, a)
    .update();

  return canvas;
}
