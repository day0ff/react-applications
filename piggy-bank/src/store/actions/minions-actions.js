import { ACTION_TYPES } from './action-types';

const {UNLOCK_MINION, BLOCK_MINION} = ACTION_TYPES.MINIONS_TYPES;

const unlockMinion = (id) => ({type: UNLOCK_MINION, id});
const blockMinion = (id) => ({type: BLOCK_MINION, id});

export default {
    unlockMinion,
    blockMinion
};
