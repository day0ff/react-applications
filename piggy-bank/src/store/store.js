import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth-reducer';
import usersReducer from './reducers/users-reducer';
import moneyboxReducer from './reducers/moneybox-reducer';
import minionsReducer from './reducers/minions-reducer';
import orientationReducer from './reducers/orientation-reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    users:usersReducer,
    moneybox:moneyboxReducer,
    minions:minionsReducer,
    orientation:orientationReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['orientation']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);
