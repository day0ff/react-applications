import {IPosition} from '../../../model/canvases/IVideo';

export function witchNose<IDeformation>(canvas: any, canvasElement: HTMLCanvasElement, positions: IPosition[]) {
  canvas.draw(canvas.texture(canvasElement))
    .denoise(50)
    .unsharpMask(20, 1)
    .hueSaturation(0.1, 0.5)
    .bulgePinch(positions[62][0], positions[62][1], 30, 0.5)
    .bulgePinch(...positions[60], 50, -0.6)
    .update();

  return canvas;
}
