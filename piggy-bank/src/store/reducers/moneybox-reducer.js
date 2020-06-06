import { ACTION_TYPES } from '../actions/action-types';

const {
    INCREMENT_COINS,
    DECREMENT_COINS,
    INCREMENT_NEW_COINS,
    DECREMENT_NEW_COINS,
    INCREMENT_MINIONS,
    DECREMENT_MINIONS
} = ACTION_TYPES.MONEYBOX_TYPES;

const INITIAL_STATE = {
    coins: 0,
    newCoins: 0,
    minions: 0
};

const moneyboxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT_COINS:
            return state.newCoins > 0 ? {...state, coins: state.coins++, newCoins: --state.newCoins} : state;
        case DECREMENT_COINS:
            return state.coins > 0 ? {...state, coins: --state.coins} : state;
        case INCREMENT_NEW_COINS:
            return {...state, newCoins: ++state.newCoins};
        case DECREMENT_NEW_COINS:
            return state.newCoins > 0 ? {...state, newCoins: --state.newCoins} : state;
        case INCREMENT_MINIONS:
            return {...state, minions: ++state.minions};
        case DECREMENT_MINIONS:
            return state.minions > 0 ? {...state, minions: --state.minions} : state;
        default:
            return state;
    }
};

export default moneyboxReducer;
