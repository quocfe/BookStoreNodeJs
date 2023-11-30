import React, { useEffect, useState } from 'react';
import reviewApi from '../../../api/client/review';
import Navbar from './../../../components/Navbar/Navbar';
import Pagination from './../../../components/Paginate/Paginate';
import './Review.css';
import ReviewItem from './components/Reviewitem';
import _, { orderBy } from 'lodash';

const Review = () => {
	const [reviews, setReviews] = useState([]);
	const [reviewsSort, setReviewsSort] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await reviewApi.getAll();
			const reviewData = await Promise.all(
				response.data.map(async ({ idProduct }) => {
					const { data } = await reviewApi.selectByProduct(idProduct);
					return data[0];
				})
			);
			const reviewCopy = [...reviewData];
			const reviewSort = orderBy(reviewCopy, ['view'], ['desc']);
			const reviewTop5 = _.take(reviewSort, 5);
			setReviews(reviewData);
			setReviewsSort(reviewTop5);
		};

		fetchData();
	}, []);

	const handlePageClick = () => {
		console.log('click');
	};

	return (
		<>
			<Navbar />
			<div className="container mt-5" id="review">
				<div className="row gap-5">
					<div className="col-lg-8">
						<div className="row head">
							<div className="col-sm-3">Review</div>
							<div className="col-sm-9">
								<Pagination pageCount={3} handlePageClick={handlePageClick} />
							</div>
						</div>
						<div className="row mt-5 gap-4">
							{reviews?.map((review) => (
								<ReviewItem type="large" key={review.idReview} {...review} />
							))}
						</div>
					</div>
					<div className="col-lg-3">
						<div className="row head">
							<p>Top 5 xem nhiều</p>
						</div>
						<div className="row gap-4 mt-5">
							{reviewsSort?.map((review) => (
								<ReviewItem type="small" key={review.idReview} {...review} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Review;
