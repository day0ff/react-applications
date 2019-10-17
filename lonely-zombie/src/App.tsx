import React, {Fragment, useState} from 'react';
import Screen from './containers/Screen/Screen';
import Filters from './containers/Filters/Filters';
import Gallery from './containers/Gallery/Gallery';
import WorkArea from './containers/WorkArea/WorkArea';

const App: React.FC = () => {
    const [video, setVideo] = useState({width: 400, height: 300, autoPlay: true});
    const [canvas, setCanvas] = useState({width: 400, height: 300});

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
