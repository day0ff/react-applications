import { ACTION_TYPES } from '../actions/action-types';

const {AUTH_LOGIN,AUTH_LOGOUT} = ACTION_TYPES.AUTH_TYPES;

const login = () => ({type: AUTH_LOGIN});
const logout = () => ({type: AUTH_LOGOUT});

export const STATION_ACTION = {
    login,
    logout
};
