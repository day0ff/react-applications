import { ACTION_TYPES } from '../actions/action-types';

const {UNLOCK_MINION, BLOCK_MINION} = ACTION_TYPES.MINIONS_TYPES;

const INITIAL_STATE = [
    {id: 10, type:'coin', name: 'Монетка Звезда', picture: 'coin-star', cost:0, isBlocked: false, width: 504, step: 84, interval: 100, position:0},
    {id: 1, type:'avatar', name: 'Денежный Мешок', picture: 'money-bag', cost:0, isBlocked: false, width: 500, step: 500, interval: 10000, position:0},
    {id: 2, type:'avatar', name: 'Свинка Копилка', picture: 'piggy-bank', cost:0, isBlocked: false, width: 3000, step: 250, interval: 100, position:0},
    {id: 100, type:'minion', name: 'Свинка Копилка', picture: 'piggy-bank', cost:1, isBlocked: false, width: 3000, step: 250, interval: 100, position:0},
    {id: 101, type:'minion', name: 'Жёлтый Кот', picture: 'yellow-cat', cost:5, isBlocked: true, width: 3840, step: 480, interval: 120, position:0},
    {id: 102, type:'minion', name: 'Красная Питичка', picture: 'bird-red', cost:3, isBlocked: true, width: 3840, step: 320, interval: 100, position:3},
    {id: 103, type:'minion', name: 'Жёлтый Пёс', picture: 'dog-yellow', cost:3, isBlocked: true, width: 3040, step: 380, interval: 150, position:0},
    {id: 1000, type:'menu', name: 'Стопка Монет', picture: 'coins-stack', cost:0, isBlocked: false, width: 500, step: 500, interval: 10000, position:0},
    {id: 1001, type:'menu', name: 'Плюс Зелёный', picture: 'plus-green', cost:0, isBlocked: false, width: 300, step: 300, interval: 10000, position:0},
    {id: 1002, type:'menu', name: 'Равно Зелёное', picture: 'equal-green', cost:0, isBlocked: false, width: 300, step: 300, interval: 10000, position:0},
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
