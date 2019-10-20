import React, {forwardRef} from 'react';

const WorkArea: React.FC<{ canvases: Element[] }> = ({canvases}) => {
  return (
    <section>
      <p>WorkArea</p>
      {canvases}
    </section>
  );
};

export default WorkArea;
