import React from 'react';
import { useSelector } from 'react-redux';
import Book from './Book';
import './BookList.css';

const BookList = () => {
	const books = useSelector((state) => state.books.data);

	return (
		<section className="booklist">
			<div className="container">
				<div className="section-title">
					<h2>Books</h2>
				</div>
				<div className="booklist-content grid">
					{books.map((item, index) => {
						return <Book key={index} {...item} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default BookList;
