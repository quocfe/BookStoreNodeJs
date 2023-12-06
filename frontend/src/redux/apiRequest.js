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
import { searchBook as searchFetch, setSearchStatus } from './bookSlice';

const loginUser = async (user, dispatch, navigate) => {
	dispatch(loginStart());
	try {
		const response = await authApi.login(user);

		const { accessToken, username, password, isAdmin } = response.data.user;
		const newUser = {
			username,
			password,
		};
		dispatch(loginSuccess(newUser));
		localStorage.setItem('accessToken', accessToken);
		const dataUser = {
			id: response.data.user.idUser,
			username: response.data.user.username,
			isAdmin: response.data.user.isAdmin,
		};
		localStorage.setItem('user', JSON.stringify(dataUser));
		if (isAdmin == 'true') {
			navigate('/admin');
		} else {
			navigate('/');
		}
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
		localStorage.removeItem('user');

		navigate('/signin');
	} catch (error) {
		dispatch(logoutFail());
	}
};

const searchBook = async (query, dispatch, navigate) => {
	try {
		const response = await booksApi.search(query);
		dispatch(searchFetch(response.data));
		navigate('/');
	} catch (error) {
		console.log(error);
	}
};

const fetchBook = async (query, dispatch, navigate) => {
	try {
		dispatch(setSearchStatus('loading'));
		const response = await booksApi.getAll();
		dispatch(getAllBook(response.data));
		navigate('/book');
		dispatch(setSearchStatus('succeeded'));
	} catch (error) {
		console.log(error);
		dispatch(setSearchStatus('failed'));
	}
};

export { loginUser, registerUser, searchBook, fetchBook, logOut };
