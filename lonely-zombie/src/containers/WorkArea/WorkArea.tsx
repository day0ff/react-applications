import React from 'react';

export interface IDimensions {
    width: number;
    height: number;
}

const WorkArea: React.FC<IDimensions> = ({width, height}) => {
    return (
        <section>
            <p>WorkArea</p>
            <canvas id="middle" width={width} height={height}/>
        </section>
    );
};

export default WorkArea;
