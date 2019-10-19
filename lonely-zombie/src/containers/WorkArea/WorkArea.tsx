import React, {forwardRef} from 'react';

export interface IDimensions {
    width: number;
    height: number;
}

const WorkArea = forwardRef<HTMLCanvasElement, IDimensions>(({width, height}, ref) => {
    return (
        <section>
            <canvas id="middle" ref={ref} width={width} height={height}/>
        </section>
    );
});

export default WorkArea;
