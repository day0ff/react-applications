declare global {
    interface Window {
        clm: any;
    }
}

type IPosition = [number, number];

const faceTracker = new window.clm.tracker();
faceTracker.init();

export const startFaceTracking = (videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement): void => {

    faceTracker.start(videoElement);

    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    trackingLoop();

    function trackingLoop() {
        requestAnimationFrame(trackingLoop);

        let currentPositions = faceTracker.getCurrentPosition();

        if (currentPositions) {
            canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            // canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
            pathFace(currentPositions, canvasContext)
            // faceTracker.draw(canvasElement);

        }
    }
};

function pathFace(positions: IPosition[], canvasContext: CanvasRenderingContext2D) {
    canvasContext.fillStyle = 'red';
    canvasContext.beginPath();
    positions.forEach((point, index) => {
        index == 0 && canvasContext.moveTo(point[0], point[1]);
        index <= 14 && canvasContext.lineTo(point[0], point[1]);
    });
    canvasContext.arc(average(positions[0][0], positions[14][0]), average(positions[0][1], positions[14][1]),
        Math.round(length(positions[0], positions[14]) / 2), 0, 2 * Math.PI, false);
    canvasContext.stroke();
    canvasContext.closePath();
}

function average(a: number, b: number): number {
    return Math.round((a + b) / 2);
}

function length(x: IPosition, y: IPosition): number {
    return Math.round(Math.sqrt((x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2));
}
