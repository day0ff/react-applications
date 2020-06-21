import React, {useState, useEffect} from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import CoinsTotal from '../CoinsTotal';
import NewCoins from '../NewCoins';
import MinionsTotal from '../MinionsTotal';

function Header(props) {
    const moneybox = useSelector(store => store.moneybox);
    const [newCoins, setNewCoins] = useState(moneybox.newCoins);
    const [coinsTotal, setCoinsTotal] = useState(moneybox.coins);
    const [minionsTotal, setMinionsTotal] = useState(moneybox.minions);
    const minions = useSelector(state => state.minions);
    const piggyBank = minions.find(minion => minion.picture === 'piggy-bank');


    useEffect(() => {
        !isNaN(props.coinsTotal) && setCoinsTotal(props.coinsTotal);
        !isNaN(props.newCoins) && setNewCoins(props.newCoins);
        !isNaN(props.minionsTotal) && setMinionsTotal(props.minionsTotal);
    }, [props]);

    return (
        <header className="Header">
            <CoinsTotal coinsTotal={coinsTotal}/>
            <NewCoins newCoins={newCoins}/>
            <MinionsTotal minion={piggyBank} minionsTotal={minionsTotal}/>
        </header>
    );
}

export default Header;
