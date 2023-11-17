import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		login: {
			currentUser: null,
			isFetching: false,
			error: false,
		},
		register: {
			isFetching: false,
			error: false,
			success: false,
		},
	},
	reducers: {
		loginStart: (state) => {
			state.login.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.login.isFetching = false;
			state.login.currentUser = action.payload.user;
			state.login.error = false;
		},
		loginFail: (state) => {
			state.login.isFetching = false;
			state.login.error = true;
		},
		// register
		registerStart: (state) => {
			state.register.isFetching = true;
		},
		registerSuccess: (state) => {
			state.register.isFetching = false;
			state.register.error = false;
			state.register.success = true;
		},
		registerFail: (state) => {
			state.register.isFetching = false;
			state.register.error = true;
			state.register.success = false;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFail,
	registerStart,
	registerSuccess,
	registerFail,
} = authSlice.actions;

export default authSlice.reducer;
