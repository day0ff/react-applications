import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import './AnimatedSwitch.css';
import PrivateRoute from '../../components/PrivateRoute';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import About from '../../pages/About';

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
                <Route path="/home" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/about" exact component={About}/>
                <Route component={NotFound}/>
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
