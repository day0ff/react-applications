import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions/action-types';

const {AUTH_LOGIN} = ACTION_TYPES.AUTH_TYPES;

function Login() {
    const users = useSelector(store => store.users);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isHidden, setIsHidden] = useState(users.map(user => ({id: user.id, hidden: true})));

    function handleClick(user) {
        if (user.password) {
            setIsHidden(isHidden.map(elem => elem.id === user.id ? {id: user.id, hidden: !elem.hidden} : elem));
            return;
        }
        login(user);
        history.push('home');
    }

    function handleChange(event, user) {
        if (event.target.value === user.password) {
            login(user);
            history.push('bank');
        }
    }

    function login(user) {
        dispatch({type: AUTH_LOGIN, role: user.role});
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="oriented">
                {users.map(user => (
                    <div key={user.id} className="column">
                        <button onClick={() => handleClick(user)}>{user.name}</button>
                        <input onChange={(event) => handleChange(event, user)}
                               className={isHidden.find(elem => elem.id === user.id).hidden ? 'hidden' : 'visible'}
                               type="password"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;
