import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Home from '../../pages/Home';
import About from '../../pages/About';
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
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
