import { ACTION_TYPES } from '../actions/action-types';

const {STATION_ACTION_TYPES:{SET_STATION_NAME}} = ACTION_TYPES;

const setStationName = (id, name) => ({type: SET_STATION_NAME, id, name});

export const STATION_ACTION = {
    setStationName
};
