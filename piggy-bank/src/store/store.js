import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth-reducer';
import usersReducer from './reducers/users-reducer';
import moneyboxReducer from './reducers/moneybox-reducer';

const rootReducer = combineReducers({
    auth:authReducer,
    users:usersReducer,
    moneybox:moneyboxReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);
