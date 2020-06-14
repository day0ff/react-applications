import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import auth from '../../store/actions/auth-actions';
import Button from '../../components/Button';
import Sprite from '../../components/Sprite';

function Login() {
    const users = useSelector(store => store.users);
    const minions = useSelector(store => store.minions);
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
        dispatch(auth.login(user.role));
    }

    return (
        <div className="Login">
            <header>
                <h1>Войти</h1>
            </header>
            <article className="oriented">
                {users.map(user => (
                    <div key={user.id} className="column">
                        <Button outerHandler={() => handleClick(user)}>
                            <Sprite {...minions.find(minion=>minion.id===user.spriteId)}/>
                            <span className="button-text">{user.name}</span>
                        </Button>
                        <input onChange={(event) => handleChange(event, user)}
                               className={isHidden.find(elem => elem.id === user.id).hidden ? 'hidden' : 'visible'}
                               type="password"/>
                    </div>
                ))}
            </article>
        </div>
    );
}

export default Login;
