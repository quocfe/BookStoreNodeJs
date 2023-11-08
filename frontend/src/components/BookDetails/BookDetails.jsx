import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './BookDetails.css';
import { useGlobalContext } from '../../context';

const BookDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { books } = useGlobalContext();
	const book = books.filter((item) => item._id === id);
	console.log(book);
	const [{ image, title, author, year, isbn }] = book;

	return (
		<section className="book-details">
			<div className="container">
				<button
					type="button"
					className="flex flex-c back-btn"
					onClick={() => navigate('/book')}
				>
					<FaArrowLeft size={22} />
					<span className="fs-18 fw-6">Go Back</span>
				</button>

				<div className="book-details-content grid">
					<div className="book-details-img">
						<img src={image} alt="cover img" />
					</div>
					<div className="book-details-info">
						<div className="book-details-item title">
							<span className="fw-6 fs-24">{title}</span>
						</div>
						<div className="book-details-item description">
							<span>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
								excepturi consequatur iusto soluta sed necessitatibus magni vel
								natus, voluptas eligendi totam enim! Recusandae eius temporibus
								error culpa numquam fugiat dignissimos.
							</span>
						</div>
						<div className="book-details-item">
							<span className="fw-6">Author: </span>
							<span className="text-italic">{author}</span>
						</div>
						<div className="book-details-item">
							<span className="fw-6">Publish year: </span>
							<span className="text-italic">{year}</span>
						</div>
						<div className="book-details-item">
							<span className="fw-6">Isbn: </span>
							<span>{isbn}</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookDetails;
