import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
// import { axiosClient } from '../../../api/config';
import authApi from '../../../api/auth';
import { loginSuccess } from '../../../redux/authSlice';

const Home = () => {
	const user = useSelector((state) => state.auth.login.currentUser);
	const navigate = useNavigate();

	useEffect(() => {
		// if (!user) {
		// 	navigate('/signin');
		// }

		if (user?.isAdmin === 'true') {
			navigate('/admin');
		}
	});

	return (
		<main>
			<Header />
			<Outlet />
		</main>
	);
};

export default Home;
