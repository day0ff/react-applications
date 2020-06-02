import { createStore, combineReducers } from 'redux';
import stationsReducer from './reducers/stations-reducer';

const rootReducer = combineReducers({
    stations:stationsReducer
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
