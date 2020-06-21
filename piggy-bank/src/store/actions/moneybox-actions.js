import { ACTION_TYPES } from './action-types';

const {
    INCREMENT_COINS,
    DECREMENT_COINS,
    ADD_COINS,
    INCREMENT_NEW_COINS,
    DECREMENT_NEW_COINS,
    INCREMENT_MINIONS,
    DECREMENT_MINIONS
} = ACTION_TYPES.MONEYBOX_TYPES;

const addCoins = (amount) => ({type: ADD_COINS, amount});
const incrementCoins = () => ({type: INCREMENT_COINS});
const decrementCoins = () => ({type: DECREMENT_COINS});
const incrementNewCoins = () => ({type: INCREMENT_NEW_COINS});
const decrementNewCoins = () => ({type: DECREMENT_NEW_COINS});
const incrementMinions = () => ({type: INCREMENT_MINIONS});
const decrementMinions = () => ({type: DECREMENT_MINIONS});

export default {
    addCoins,
    incrementCoins,
    decrementCoins,
    incrementNewCoins,
    decrementNewCoins,
    incrementMinions,
    decrementMinions
};
