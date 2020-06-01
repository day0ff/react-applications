import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../Auth/index';

function PrivateRoute({component: Component, ...rest}) {
   return (
       <Route {...rest} render={props => auth.getAuth() ? (<Component {...props} />) : (<Redirect to={{pathname: '/login'}}/>)}/>
   );
}

export default PrivateRoute;
