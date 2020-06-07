import { ACTION_TYPES } from './action-types';

const { CHANGE_ORIENTATION } = ACTION_TYPES.ORIENTATION_TYPES;

const changeOrientation = (orientation) => ({type: CHANGE_ORIENTATION, orientation});


export default {
    changeOrientation,
};
