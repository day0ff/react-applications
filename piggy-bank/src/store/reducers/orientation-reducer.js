import { ACTION_TYPES } from '../actions/action-types';

const {CHANGE_ORIENTATION} = ACTION_TYPES.ORIENTATION_TYPES;

const INITIAL_STATE = {orientation:null};

const orientationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_ORIENTATION:
            return {orientation:action.orientation};
        default:
            return state;
    }
};

export default orientationReducer;
