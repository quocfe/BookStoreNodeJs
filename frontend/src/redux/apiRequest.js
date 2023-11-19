import authApi from './../api/client/auth';
import booksApi from './../api/client/books';
import {
	loginFail,
	loginStart,
	loginSuccess,
	registerFail,
	registerStart,
	registerSuccess,
} from './authSlice';
import { searchBook as searchFetch } from './bookSlice';

const loginUser = async (user, dispatch, navigate) => {
	dispatch(loginStart());
	try {
		const res = await authApi.login(user);
		console.log('res login user', res);
		dispatch(loginSuccess(res.data));
		navigate('/book');
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
		const response = await booksApi.getAll(query);
		dispatch(getAllBook(response.data));
		navigate('/book');
	} catch (error) {
		console.log(error);
	}
};

export { loginUser, registerUser, searchBook, fetchBook };
