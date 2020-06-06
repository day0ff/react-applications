import React from 'react';
import './Bank.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import moneyboxAction from '../../store/actions/moneybox-actions';

function Bank() {
    const moneybox = useSelector(state => state.moneybox);
    const dispatch = useDispatch();

    function addCoin() {
        dispatch(moneyboxAction.incrementNewCoins());
    }
    function removeCoin() {
        dispatch(moneyboxAction.decrementNewCoins());
    }

    return (
        <div className="Bank">
            <h1>Bank</h1>
            <p>Coins:{moneybox.coins}</p>
            <p>New coins:{moneybox.newCoins}</p>
            <div className="oriented">
                <button onClick={addCoin}>Add Coin</button>
                <button onClick={removeCoin}>Remove Coin</button>
            </div>
            <p><Link to="login">Go Login</Link></p>
        </div>
    );
}

export default Bank;
