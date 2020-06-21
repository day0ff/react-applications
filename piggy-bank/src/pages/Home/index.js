import React, { useState, useEffect } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CoinsTotal from '../../components/CoinsTotal';
import NewCoins from '../../components/NewCoins';
import MinionsTotal from '../../components/MinionsTotal';
import Minion from '../../components/Minion';
import Sprite from '../../components/Sprite';
import moneyboxAction from '../../store/actions/moneybox-actions';
import minionsAction from '../../store/actions/minions-actions';

function Home() {
    let history = useHistory();
    const moneybox = useSelector(store => store.moneybox);
    const minions = useSelector(store => store.minions);
    const coinSprite = minions.find(minion => minion.picture === 'coin-star');
    const plusSprite = minions.find(minion => minion.picture === 'plus-green');
    const equalSprite = minions.find(minion => minion.picture === 'equal-green');
    const piggyBank = minions.find(minion => minion.picture === 'piggy-bank');
    const [previousMinion, setPreviousMinion] = useState(minions.find(minion => minion.id === 100 + moneybox.minions));
    const [minion, setMinion] = useState(minions.find(minion => minion.id === 101 + moneybox.minions));
    const [nextMinion, setNextMinion] = useState(minions.find(minion => minion.id === 102 + moneybox.minions));
    const [newCoins, setNewCoins] = useState(moneybox.newCoins);
    const [coinsTotal, setCoinsTotal] = useState(moneybox.coins);
    const [minionsTotal, setMinionsTotal] = useState(moneybox.minions);
    const [coins, setCoins] = useState(new Array(minion.cost).fill(false));
    const [isVisible, setIsVisible] = useState(true);
    const [isArrowsVisible, setIsArrowsVisible] = useState(false);
    const dispatch = useDispatch();


    function handleCoinClick(index) {
        if (newCoins > 0 && !coins[index] && checkPrevious(index)) {
            setNewCoins(newCoins - 1);
            setCoinsTotal(coinsTotal + 1);
            setCoins(coins.map((value, i) => i === index ? true : value));
        }
    }

    function handleMinionClick() {
        if (coins.every(coin => coin === true) && minion.isBlocked) {
            setIsVisible(false);
        }
    }

    function unlockMinion() {
        if (coins.every(coin => coin === true) && minion.isBlocked) {
            setIsArrowsVisible(true);
            setMinion({...minion, isBlocked: false});
            setMinionsTotal(minionsTotal + 1);
            dispatch(moneyboxAction.addCoins(minion.cost));
            dispatch(minionsAction.unlockMinion(minion.id));
            dispatch(moneyboxAction.incrementMinions());
        }
    }

    function handlePreviousClick() {
        history.push('minions');
    }

    function handleNextClick() {
        setIsArrowsVisible(false);
        setIsVisible(true);
        setCoins(new Array(nextMinion.cost).fill(false));
        setPreviousMinion(minion);
        setMinion(nextMinion);
        setNextMinion(minions.find(minion => minion.id === 102 + moneybox.minions));
    }

    function checkPrevious(index) {
        const arr = coins.slice(0, index);
        console.log(arr.every(elem => elem === true));
        return arr.every(elem => elem === true);
    }

    return (
        <div className="Home">
            <header>
                <CoinsTotal coinsTotal={coinsTotal}/>
                <NewCoins newCoins={newCoins}/>
                <MinionsTotal minion={piggyBank} minionsTotal={minionsTotal}/>
            </header>
            <section className={isVisible ? 'hidden' : 'visible'}>
                <div className={`previous ${isArrowsVisible ? 'visible' : 'hidden'}`} onClick={handlePreviousClick}>
                    <div className="minion">
                        <Sprite {...previousMinion}/>
                    </div>
                    <div className="arrow">
                        <Sprite {...equalSprite}/>
                    </div>
                </div>
                <div className="minion" onClick={unlockMinion}>
                    <Minion {...minion}/>
                </div>
                <div className={`next ${isArrowsVisible ? 'visible' : 'hidden'}`} onClick={handleNextClick}>
                    <div className="arrow">
                        <Sprite {...equalSprite}/>
                    </div>
                    <div className="minion">
                        <Sprite {...nextMinion}/>
                    </div>
                </div>
            </section>
            <article className={isVisible ? 'visible' : 'hidden'}>
                <div className="coins">
                    {coins.map((coin, index) => (<>
                        <div className={`coin triple${coin ? ' shadow' : ' locked'}`}
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
