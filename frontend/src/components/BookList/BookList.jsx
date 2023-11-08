import React from 'react';
import { useGlobalContext } from '../../context';
import Book from './Book';
import Loading from '../Loader/Loader';
import './BookList.css';

const BookList = () => {
	const { books, loading, resultTitle } = useGlobalContext();

	return !loading ? (
		<section className="booklist">
			<div className="container">
				<div className="section-title">
					<h2>{resultTitle}</h2>
				</div>
				<div className="booklist-content grid">
					{books.map((item, index) => {
						return <Book key={index} {...item} />;
					})}
				</div>
			</div>
		</section>
	) : (
		<Loading />
	);
};

export default BookList;
