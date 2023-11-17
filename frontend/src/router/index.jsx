import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';
import BookList from '../components/BookList/BookList';
import About from '../pages/client/About/About';
import SignIn from '../pages/client/Auth/SignIn/SignIn';
import SignUp from '../pages/client/Auth/SignUp/SignUp';
import Home from '../pages/client/Home/Home';
import Dashboad from '../pages/admin/Dashboad/Dashboad';
import View from '../pages/admin/Books/View/View';

const RoutesManage = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="/about" element={<About />} />
					<Route path="/book" element={<BookList />} />
					<Route path="/book/:id" element={<BookDetails />} />
				</Route>
				<Route path="/admin" element={<Dashboad />} />
				<Route path="/admin/book" element={<View />} />
				<Route path="/admin/book/:id" element={<View />} />
				{/* <Route path="/admin/add/book" element={<Add />} /> */}
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesManage;
