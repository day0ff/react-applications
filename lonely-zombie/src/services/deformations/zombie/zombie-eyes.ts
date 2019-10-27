import {IPosition} from '../../../model/canvases/IVideo';

export function zombieEyes<IDeformation>(canvas: any, canvasElement: HTMLCanvasElement, positions: IPosition[]) {
  canvas.draw(canvas.texture(canvasElement))
    .denoise(50)
    .unsharpMask(20, 1)
    .hueSaturation(0.4, -0.3)
    .bulgePinch(...positions[27], 30, 0.5)
    .bulgePinch(...positions[32], 30, 0.5)
    .update();

  return canvas;
}
