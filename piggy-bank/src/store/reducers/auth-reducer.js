import { ACTION_TYPES } from '../actions/action-types';

const {AUTH_LOGIN, AUTH_LOGOUT} = ACTION_TYPES.AUTH_TYPES;

const INITIAL_STATE = {isAuthenticated: false, role: null};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {isAuthenticated: true, role: action.role};
        case AUTH_LOGOUT:
            return {...INITIAL_STATE};
        default:
            return state;
    }
};

export default authReducer;
