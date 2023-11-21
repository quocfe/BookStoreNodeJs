import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import View from '../pages/admin/Books/View/View';
import ViewCate from '../pages/admin/Category/View/View';
import Dashboad from '../pages/admin/Dashboad/Dashboad';
import About from '../pages/client/About/About';
import SignIn from '../pages/client/Auth/SignIn/SignIn';
import SignUp from '../pages/client/Auth/SignUp/SignUp';
import Home from '../pages/client/Home/Home';
import BookDetails from './../pages/client/BookDetails/BookDetails';
import PrivateRoute from './PrivateRoute';

const RoutesManage = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/book/:id" element={<BookDetails />} />
					<Route path="/about" element={<About />} />
				</Route>
				<Route path="/admin" element={<Dashboad />} />
				<Route path="/admin/book" element={<View />} />
				<Route path="/admin/book/:id" element={<View />} />
				<Route path="/admin/add/book" element={<View />} />
				<Route path="/admin/category" element={<ViewCate />} />
				<Route path="/admin/category/:id" element={<ViewCate />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesManage;
