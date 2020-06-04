import { ACTION_TYPES } from '../actions/action-types';

const {AUTH_LOGIN, AUTH_LOGOUT} = ACTION_TYPES.AUTH_TYPES;

const INITIAL_STATE = {isAuthenticated: false};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {...state, isAuthenticated: true};
        case AUTH_LOGOUT:
            return {...state, isAuthenticated: false};
        default:
            return state;
    }
};

export default authReducer;
