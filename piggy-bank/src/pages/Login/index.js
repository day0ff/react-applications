import React from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions/action-types';

const {AUTH_LOGIN} = ACTION_TYPES.AUTH_TYPES;

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleClick() {
        dispatch({type: AUTH_LOGIN});
        history.push('home');
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <p>
                <button onClick={handleClick}>Login</button>
            </p>
        </div>
    );
}

export default Login;
