import React from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import auth from '../../services/auth';

function Login() {
    const history = useHistory();

    function handleClick() {
        auth.authenticate();
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
