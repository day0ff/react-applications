import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({component: Component, roles, ...rest}) {
    const {isAuthenticated, role} = useSelector(state => state.auth);

    return (
        <Route {...rest} render={props => {
            if (!isAuthenticated) return <Redirect to={{pathname: '/login'}}/>;
            if (roles && !roles.find(value => value === role)) return <Redirect to={{pathname: '/'}}/>;
            return <Component {...props} />;
        }}/>
    );
}

export default PrivateRoute;
