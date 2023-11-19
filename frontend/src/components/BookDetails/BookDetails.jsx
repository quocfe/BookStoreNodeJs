import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import FormReview from './../FormReview/FormReview';
import './BookDetails.css';
import SeeMore from './../SeeMore/SeeMore';

const BookDetails = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();
	const { id } = useParams();
	const books = useSelector((state) => state.books.data);
	const book = books.filter((item) => item.idProduct == id);
	const [
		{
			images,
			authorProduct,
			isbn,
			nameProduct,
			year,
			sortDescription,
			description,
		},
	] = book;

	const createMarkup = () => {
		return { __html: sortDescription };
	};

	return (
		<>
			<Header />
			<section className="book-details">
				<div className="container ">
					<button
						type="button"
						className="flex flex-c back-btn"
						onClick={() => navigate('/')}
					>
						<FaArrowLeft size={22} />
						<span className="fs-18 fw-6">Go Back</span>
					</button>

					<div className="book-details-content grid ">
						<div className="book-details-img">
							<img src={images} alt="cover img" />
						</div>
						<div className="book-details-info">
							<div className="book-details-item title">
								<span className="fw-6 fs-24">{nameProduct}</span>
							</div>
							<div className="book-details-item description">
								<div dangerouslySetInnerHTML={createMarkup()} />
							</div>
							<div className="book-details-item">
								<span className="fw-6">Author: </span>
								<span className="text-italic">{authorProduct}</span>
							</div>
							<div className="book-details-item">
								<span className="fw-6">Publish year: </span>
								<span className="text-italic">{year}</span>
							</div>
							<div className="book-details-item">
								<span className="fw-6">Isbn: </span>
								<span>{isbn}</span>
							</div>
							<div className="book-formreview">
								<Button variant="primary" onClick={handleShow}>
									Viết Review
								</Button>
								<FormReview
									show={show}
									onHide={handleClose}
									title={nameProduct}
								/>
							</div>
						</div>
					</div>

					<div className="row  book-description ">
						<div className="title mb-0">
							<span className="fw-6 fs-24">Mô tả</span>
						</div>
						<div className="col-lg-12 description-text">
							<SeeMore text={description} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BookDetails;
