import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Station from '../../pages/Station';
import List from '../../pages/Schedule';
import './AnimatedSwitch.css';

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
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
