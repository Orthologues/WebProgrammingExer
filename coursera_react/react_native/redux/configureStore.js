import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Dishes } from './reducers/dishes';
import { Comments } from './reducers/comments';
import { Promotions } from './reducers/promotions';
import { Leaders } from './reducers/leaders';
import { favorites } from './reducers/favorites';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}