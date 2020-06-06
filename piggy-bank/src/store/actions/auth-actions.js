import { ACTION_TYPES } from './action-types';

const {AUTH_LOGIN,AUTH_LOGOUT} = ACTION_TYPES.AUTH_TYPES;

const login = (role) => ({type: AUTH_LOGIN, role});
const logout = () => ({type: AUTH_LOGOUT});

export default {
    login,
    logout
};
