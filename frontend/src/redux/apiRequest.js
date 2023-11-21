import reviewApi from '../api/client/review';
import authApi from './../api/client/auth';
import booksApi from './../api/client/books';
import {
	loginFail,
	loginStart,
	loginSuccess,
	logoutFail,
	logoutStart,
	logoutSuccess,
	registerFail,
	registerStart,
	registerSuccess,
} from './authSlice';
import { searchBook as searchFetch } from './bookSlice';

const loginUser = async (user, dispatch, navigate) => {
	dispatch(loginStart());
	try {
		const response = await authApi.login(user);

		const { accessToken, refreshToken } = response.data.user;
		const { username, password } = response.data.user;
		const newUser = {
			username,
			password,
		};
		dispatch(loginSuccess(newUser));
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		navigate('/');
	} catch (error) {
		dispatch(loginFail());
	}
};

const registerUser = async (user, dispatch, navigate) => {
	dispatch(registerStart());
	try {
		await authApi.register(user);
		dispatch(registerSuccess());
		navigate('/signin');
	} catch (error) {
		dispatch(registerFail());
	}
};

const logOut = async (dispatch, navigate) => {
	dispatch(logoutStart());
	try {
		await authApi.logout();
		dispatch(logoutSuccess());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigate('/signin');
	} catch (error) {
		dispatch(logoutFail());
	}
};

const searchBook = async (query, dispatch, navigate) => {
	try {
		const response = await booksApi.search(query);
		dispatch(searchFetch(response.data));
		navigate('/home');
	} catch (error) {
		console.log(error);
	}
};
const fetchBook = async (query, dispatch, navigate) => {
	try {
		const response = await booksApi.getAll(query);
		dispatch(getAllBook(response.data));
		navigate('/book');
	} catch (error) {
		console.log(error);
	}
};

export { loginUser, registerUser, searchBook, fetchBook, logOut };
