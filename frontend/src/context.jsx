const URL = 'http://localhost:3000/v1/api/book/search?q=';
import React, { useCallback, useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [resultTitle, setResultTitle] = useState('');

	const featchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const responsive = await fetch(`${URL}${searchTerm}`);
			const data = await responsive.json();

			if (data) {
				setBooks(data);

				if (data.length >= 1) {
					setResultTitle('Your Search Result');
				} else {
					setResultTitle('No Search Result Found!');
				}
			} else {
				setBooks([]);
				setResultTitle('No Search Result Found!');
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		featchBooks();
	}, [searchTerm, featchBooks]);

	return (
		<AppContext.Provider
			value={{
				loading,
				books,
				setSearchTerm,
				resultTitle,
				setResultTitle,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
