import React, { useEffect, useState } from 'react';
import Star from '../../../BookDetails/component/Star/Star';
import './RatingAverage.css';
import commentsApi from '../../../../../api/client/comments';

const RatingAverage = ({ idReview }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await commentsApi.getAll();
				setComments(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const filterComment = comments.filter(
		(comment) => comment.idReview == idReview
	);

	let totalRating = filterComment.length;

	let average = () => {
		const initialValue = 0;
		const sum = filterComment.reduce(
			(accumulator, currentValue) => accumulator + currentValue.rating,
			initialValue
		);

		const averageRating = sum / +totalRating;

		return averageRating.toFixed(0);
	};

	return (
		<div className="containerCustom shadow py-5 rounded-3">
			<div className="row">
				<div className="col-lg-12">
					<div className="row">
						<div className="col-sm-6 text-center d-flex flex-column justify-content-center align-center ">
							<p className="fs-1 mb-0">{average() ? average() : 0}/5</p>
							<Star rating={average()} />
							<p>({totalRating ? totalRating : 0} đánh giá)</p>
						</div>

						<div className="col-sm-6">
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="d-flex align-center gap-2">
									<Star rating={rating} />
									<p className="mb-0">
										(
										{
											filterComment.filter(
												(comment) => comment.rating === rating
											).length
										}
										)
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RatingAverage;
