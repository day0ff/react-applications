import { createStore, combineReducers } from 'redux';
import stationsReducer from './reducers/stations-reducer';

const rootReducer = combineReducers({
    stationsReducer
});

export const store = createStore(rootReducer);
