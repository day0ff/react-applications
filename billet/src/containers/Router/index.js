import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import './AnimatedSwitch.css';

import Station from '../../pages/Station';
import List from '../../pages/List';
import NotFound from '../../pages/NotFound';

function Router() {
    return (
        <BrowserRouter>
            <AnimatedSwitch
                atEnter={{opacity: 0}}
                atLeave={{opacity: 0}}
                atActive={{opacity: 1}}
                className="AnimatedSwitch"
            >
                <Route path="/" exact component={List}/>
                <Route path="/station" exact component={Station}/>
                <Route path="/list" exact component={List}/>
                <Route component={NotFound}/>
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
