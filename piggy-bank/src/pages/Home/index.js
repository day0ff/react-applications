import React, { useState, useEffect } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import CoinsTotal from '../../components/CoinsTotal';
import NewCoins from '../../components/NewCoins';
import MinionsTotal from '../../components/MinionsTotal';
import Minion from '../../components/Minion';
import Sprite from '../../components/Sprite';
import moneyboxAction from '../../store/actions/moneybox-actions';
import minionsAction from '../../store/actions/minions-actions';

function Home() {
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);
    const coinSprite = minions.find(minion => minion.type === 'coin');
    const plusSprite = minions.find(minion => minion.picture === 'plus-green');
    const equalSprite = minions.find(minion => minion.picture === 'equal-green');
    const [minion, setMinion] = useState(minions.find(minion => minion.id === 101 + moneybox.minions));
    const [previousMinion, setPreviousMinion] = useState(minions.find(minion => minion.id === 100 + moneybox.minions));
    const [newCoins, setNewCoins] = useState(moneybox.newCoins);
    const [coinsTotal, setCoinsTotal] = useState(moneybox.coins);
    const [minionsTotal, setMinionsTotal] = useState(moneybox.minions);
    const [coins, setCoins] = useState(new Array(minion.cost).fill(false));
    const dispatch = useDispatch();


    function handleCoinClick(index) {
        if (newCoins > 0 && !coins[index]) {
            setNewCoins(newCoins - 1);
            setCoinsTotal(coinsTotal + 1);
            setCoins(coins.map((value, i) => i === index ? true : value));
        }
    }

    function handleMinionClick() {
        if (coins.every(coin => coin === true) && minion.isBlocked) {
            setMinion({...minion, isBlocked: false, isRunning:true});
            setMinionsTotal(minionsTotal + 1);
            dispatch(minionsAction.unlockMinion(minion.id));
            dispatch(moneyboxAction.incrementMinions());
        }
    }

    return (
        <div className="Home">
            <header>
                <CoinsTotal coinsTotal={coinsTotal}/>
                <NewCoins newCoins={newCoins}/>
                <MinionsTotal minion={previousMinion} minionsTotal={minionsTotal}/>
            </header>
            <article>
                <div className="coins">
                    {coins.map((coin, index) => (<>
                        <div  className={`coin triple${coin ? ' shadow' : ' locked'}`}
                             onClick={() => handleCoinClick(index)}>
                            <Sprite {...coinSprite}/>
                        </div>
                        <div className={`plus triple${coin ? ' shadow' : ' locked'}`}>
                            <Sprite {...index === coins.length - 1 ? equalSprite : plusSprite}/>
                        </div>
                    </>))}
                </div>
                <div className="minion" onClick={handleMinionClick}>
                    <Minion {...minion}/>
                </div>
            </article>
        </div>
    );
}

export default Home;
