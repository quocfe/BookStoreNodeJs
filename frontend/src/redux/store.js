import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import authSlice from './authSlice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reviewSlice from './reviewSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['auth'],
};
const rootReducer = combineReducers({
	books: bookReducer,
	auth: authSlice,
	review: reviewSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store);
