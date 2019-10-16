import React, { Fragment } from 'react';
import Screen from './containers/Screen/Screen';
import Filters from './containers/Filters/Filters';
import Gallery from './containers/Gallery/Gallery';

const App: React.FC = () => {
  return (
    <Fragment>
      <header>
        Header
      </header>
      <Screen/>
      <Filters/>
      <Gallery/>
      <footer>
        Footer
      </footer>
    </Fragment>
  );
};

export default App;
