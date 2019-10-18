import React from 'react';
import house from '../../images/house.png';

export interface IDimensions {
  width: number;
  height: number;
}

const WorkArea: React.FC<IDimensions> = ({width, height}) => {
  return (
    <section>
      <p>WorkArea</p>
      <img src={house} width={width} height={height}/>
      <canvas id="middle" width={width} height={height}/>
    </section>
  );
};

export default WorkArea;
