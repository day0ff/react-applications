import React, {useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { useDispatch } from 'react-redux';
import './AnimatedSwitch.css';
import PrivateRoute from '../../components/PrivateRoute';
import orientation from '../../store/actions/orientation-actions';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import About from '../../pages/About';
import Bank from '../../pages/Bank';
import Minions from '../../pages/Minions';

function Router() {
    const dispatch = useDispatch();

    useEffect(() => {
        function handleOrientation() {
            dispatch(orientation.changeOrientation(getOrientation(window.screen.orientation.type)));
        }
        dispatch(orientation.changeOrientation(getOrientation(window.screen.orientation.type)));
        window.addEventListener('orientationchange', handleOrientation);
        return () =>  window.removeEventListener('orientationchange', handleOrientation);
    }, []);

    function getOrientation(orientation){
        return orientation.match(/landscape/)? 'landscape': 'portrait';
    }

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
                <PrivateRoute path="/bank" roles={['admin']} exact component={Bank}/>
                <PrivateRoute path="/minions" exact component={Minions}/>
                <Route component={NotFound}/>
            </AnimatedSwitch>
        </BrowserRouter>
    );
}

export default Router;
