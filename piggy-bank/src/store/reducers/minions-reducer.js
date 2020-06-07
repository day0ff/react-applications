import { ACTION_TYPES } from '../actions/action-types';

const {UNLOCK_MINION, BLOCK_MINION} = ACTION_TYPES.MINIONS_TYPES;

const INITIAL_STATE = [
    {id: 1, name: 'Свинка Копилка', picture: 'piggy-bank', cost:0, isBlocked: false, width: 3000, step: 250, interval: 100, position:0},
    {id: 2, name: 'Жёлтый Кот', picture: 'yellow-cat', cost:3, isBlocked: false, width: 3840, step: 480, interval: 120, position:0},
];

const minionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UNLOCK_MINION:
            return state.map(minion => minion.id === action.id ? {...minion, isBlocked: false} : minion);
        case BLOCK_MINION:
            return state.map(minion => minion.id === action.id ? {...minion, isBlocked: true} : minion);
        default:
            return state;
    }
};

export default minionsReducer;
