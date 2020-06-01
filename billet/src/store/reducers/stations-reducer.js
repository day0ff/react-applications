import { ACTION_TYPES } from '../actions/action-types';

const {SET_STATION_NAME} = ACTION_TYPES.STATION_ACTION_TYPES;

const INITIAL_STATE = {
    stations: [{id:1,name:'1111'},{id:2,name:'2222'}]
};

const stationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_STATION_NAME:
            return {
                ...state,
                stations: state.stations.map(station =>
                    station.id === action.id ? {
                        ...station,
                        name: action.name
                    } : station)
            };
        default:
            return state;
    }
};

export default stationsReducer;
