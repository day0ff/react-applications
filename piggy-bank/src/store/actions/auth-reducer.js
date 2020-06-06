import { ACTION_TYPES } from '../actions/action-types';

const {AUTH_LOGIN,AUTH_LOGOUT} = ACTION_TYPES.AUTH_TYPES;

const login = (role) => ({type: AUTH_LOGIN, role});
const logout = () => ({type: AUTH_LOGOUT});

export const STATION_ACTION = {
    login,
    logout
};
