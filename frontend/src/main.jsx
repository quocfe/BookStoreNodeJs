import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './main.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import { AppProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AppProvider>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/about" element={<About />} />
						<Route path="/book" element={<BookList />} />
						<Route path="/book/:id" element={<BookDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</AppProvider>
);
