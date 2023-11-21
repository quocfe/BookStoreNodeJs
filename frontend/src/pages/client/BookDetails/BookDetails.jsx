import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import reviewApi from '../../../api/client/review';
import { setReviews as setReviewsRedux } from '../../../redux/reviewSlice';
import FormReview from './../../../components/FormReview/FormReview';
import Header from './../../../components/Header/Header';
import SeeMore from './../../../components/SeeMore/SeeMore';
import './BookDetails.css';
import Star from './component/Star/Star';

const BookDetails = () => {
	const { id } = useParams();
	const [show, setShow] = useState(false);
	const [reviews, setReviews] = useState([]);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books.data);
	const reviewState = useSelector((state) => state.review.data);
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await reviewApi.selectByProduct(id);
				setReviews(response.data);
				dispatch(setReviewsRedux(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		const arrFilter = reviewState.filter((item) => item.idProduct == id);
		setReviews(arrFilter);
	}, [reviewState]);

	const createMarkup = () => {
		return { __html: sortDescription };
	};

	const generationDate = (datetimeString) => {
		let time;
		let dateTime = new Date(datetimeString);
		time = `${dateTime.getDate()}-${
			dateTime.getMonth() + 1
		}-${dateTime.getFullYear()}`;
		return time;
	};

	return (
		<>
			<Header />
			<section className="book-details">
				<div className="container ">
					<button
						type="button"
						className="flex flex-c back-btn"
						onClick={() => navigate('/home')}
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

					<div className="row rating-review">
						<div className="title mb-0">
							<span className="fw-6 fs-24">Đánh giá</span>
						</div>

						<div className="row">
							<div className="col-lg-12 d-flex flex-column align-items-center">
								<div className="rounded-circle">
									<svg
										viewBox="0 0 150 148"
										data-testid="placeholder"
										role="img"
										aria-label="Profile Image for undefined."
										width={80}
										height={80}
										fill="#fff"
									>
										<path d="M72.1090777,98.5834547 L72.33,99 L72.33,135.33 C63.123,121.832538 36.682493,123.584992 32.5469267,123.94781 L32,124 L26.33,84 C60.339272,80.657364 70.5568596,95.8470233 72.1090777,98.5834547 L72.1090777,98.5834547 Z M124.67,84 L119,124 L118.443602,123.94698 C114.277312,123.582336 87.87,121.8428 78.67,135.33 L78.67,99 L78.7678523,98.8072222 C79.812448,96.840024 89.5704,80.5502 124.67,84 Z M78,99.33 L78,135.33 L73,135.33 L73,99.33 L78,99.33 Z M90.54,16.62 C95.9310499,21.4073864 96.3803576,28.3598605 96.2905081,29.8922458 C97.3275946,32.4456044 97.9829705,35.2277293 98.1784348,38.1513546 C100.506601,39.038606 102.2,41.4710601 102.2,44.33 C102.2,47.94 99.53,51.89 96.2,51.89 C96.0905861,51.8873141 95.981608,51.880929 95.8732354,51.870913 C95.3354903,53.2179373 94.7147161,54.5299141 94.0189577,55.788033 L94.0182343,56.0150119 C94.0500877,57.5818012 94.8507993,60.2182897 98.54,63.79 L97.8233755,63.7170516 C96.4202183,63.5628965 93.3220045,63.16442 91.8812227,62.5216222 L91.71,62.44 C89.95,61.54 91.71,66.44 91.71,66.44 L91.4988978,66.4844732 C90.9505742,66.5817377 89.3932961,66.7455471 87.5286065,65.9520279 C87.2978602,67.776839 87.1727133,70.3147204 87.7530818,72.5924789 L90.37,72.5499932 L104.69,72.5499932 C106.778543,72.549134 108.846025,72.9673909 110.77,73.78 C112.591193,74.5410091 114.250641,75.6411706 115.660246,77.0214579 L115.32,77.02 C85.84473,77.02 76.8819484,91.8714308 75.6368778,94.2377263 L75.486,94.536 L75.3227204,94.2039418 C74.1038492,91.8762461 65.4781316,77.6156646 37.4927068,77.0098851 L36.479,76.994 L36.6755151,76.8051662 C38.0360079,75.5268273 39.6156254,74.5018298 41.34,73.78 C43.2636524,72.9663464 45.331348,72.5480461 47.42,72.5499932 L61.74,72.5499932 L63.8530905,72.5869122 C64.638167,69.3807075 64.070364,65.6841815 63.772029,64.1707804 L63.58,64 C59.9858926,60.9225108 57.0583269,56.635372 55.1658548,51.8894012 L55.14,51.89 C53.9789366,51.8608204 52.867453,51.4133862 52.01,50.63 C50.2338648,49.0132914 49.2089037,46.7315761 49.18,44.33 C49.18,42.1289328 50.1725753,40.1806563 51.7021357,38.9951595 C48.4918124,36.8692908 45.87,32.62 45.87,32.62 L46.75,32.13432 C48.87,30.9388 53.87,27.95 50.87,27.95 C47.12,27.95 45.12,22.95 45.12,22.95 C47.9134053,23.4607521 50.7949737,22.830409 53.12,21.2 C55.94,19.27 56.46,15.12 60.62,14.45 C64.79,13.79 63.58,16.02 67.87,15.32 C72.03,14.6412121 71.5918733,13.4264463 74.5796174,12.6878204 L74.87,12.62 C82.21,10.95 86.04,12.62 90.54,16.62 Z" />
									</svg>
								</div>
								<p className="thinking fs-1 mt-2 fw-semibold">
									What do you think?
								</p>
								<div className="book-formreview mt-3">
									<Button variant="primary" onClick={handleShow}>
										Viết Review
									</Button>
									<FormReview
										show={show}
										onHide={handleClose}
										title={nameProduct}
										idProduct={id}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="row community-reviews">
						<div className="title mb-4">
							<span className="fw-6 fs-24">Thảo luận</span>
						</div>
						<div className="row my-3">
							{reviews.length > 0 ? (
								reviews?.map(
									({ idReview, content, createAt, username, rating }) => {
										return (
											<div key={idReview} className="d-flex mb-3 box-review">
												<div className="col-lg-2 align-items-center d-flex flex-column info-reviewer">
													<img
														src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
														alt=""
														className="rounded-circle"
													/>
													<span className="">{username}</span>
												</div>
												<div className="col-lg-10 content-review">
													<div className="row">
														<div className="col-lg-6">
															<Star rating={rating} />
														</div>
														<div className="col-lg-6 ">
															<div className="posted-day text-end">
																{generationDate(createAt)}
															</div>
														</div>
														<div className="row mt-4">
															<SeeMore text={content} />
														</div>
													</div>
												</div>
											</div>
										);
									}
								)
							) : (
								<div className="title mb-4 text-center">
									<span className="fw-6 fs-24">Không có review</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default BookDetails;
