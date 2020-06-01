import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import PrivateRoute from '../../auth/PrivateRoute';
import './AnimatedSwitch.css';

import Home from '../../pages/Home';
import Station from '../../pages/Station';
import List from '../../pages/List';
import NotFound from '../../pages/NotFound';
import Login from '../../pages/Login';

function Router() {
    return (
        <BrowserRouter>
            <AnimatedSwitch
                atEnter={{opacity: 0}}
                atLeave={{opacity: 0}}
                atActive={{opacity: 1}}
                className="AnimatedSwitch"
            >
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/station/:name" exact component={Station}/>
                <PrivateRoute path="/list" exact component={List}/>
                <Route component={NotFound}/>
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
