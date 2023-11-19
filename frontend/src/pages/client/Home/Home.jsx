import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import BookList from '../../../components/BookList/BookList';
// import { axiosClient } from '../../../api/config';

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
			<BookList />
		</main>
	);
};

export default Home;
