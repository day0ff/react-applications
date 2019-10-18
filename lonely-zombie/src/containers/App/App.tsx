import React, { Fragment, useState } from 'react';
import Screen, { IScreen } from '../Screen/Screen';
import Filters from '../Filters/Filters';
import Gallery from '../Gallery/Gallery';
import WorkArea, { IDimensions } from '../WorkArea/WorkArea';
import { config } from '../../config';

const App: React.FC = () => {
  const {width, height, autoPlay} = config;

  const [video, setVideo] = useState<IScreen>({width, height, autoPlay});
  const [canvas, setCanvas] = useState<IDimensions>({width, height});

  return (
    <Fragment>
      <header>
        Header
      </header>
      <Screen {...video}/>
      <WorkArea {...canvas}/>
      <Filters/>
      <Gallery/>
      <footer>
        Footer
      </footer>
    </Fragment>
  );
};

export default App;
