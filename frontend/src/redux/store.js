import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import authSlice from './authSlice';

const store = configureStore({
	reducer: {
		books: bookReducer,
		auth: authSlice,
	},
});

export default store;
