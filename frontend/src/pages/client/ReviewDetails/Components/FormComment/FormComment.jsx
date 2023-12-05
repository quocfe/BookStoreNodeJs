import React, { useEffect, useState } from 'react';
import StarRating from '../../../../../components/StarRating/StarRating';
import './FormComment.css';
import { useParams } from 'react-router-dom';
import reviewApi from './../../../../../api/client/review';
import commentsApi from './../../../../../api/client/comments';
import { useDispatch } from 'react-redux';
import { setComments } from '../../../../../redux/commentSlice';

const FormComment = () => {
	const [comment, setComment] = useState({
		content: '',
		rating: 0,
		idUser: 0,
		idReview: 0,
		idProduct: 0,
	});
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await reviewApi.getOne(id);
				setComment((prev) => ({
					...prev,
					idUser: data[0].idUser,
					idReview: data[0].idReview,
					idProduct: data[0].idProduct,
				}));
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const onRatingChange = (data) => {
		setComment((prev) => ({
			...prev,
			rating: data,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await commentsApi.insert(comment);
			dispatch(setComments(comment));
			setComment({
				content: '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container" id="form-comment">
			<div className="row px-5 py-3 mb-5 mt-5">
				<div className="col-lg-12">
					<form className="">
						<div className="form-group">
							<textarea
								className="border w-100 "
								type="text"
								placeholder="comment..."
								value={comment.content}
								onChange={(e) =>
									setComment((prev) => ({ ...prev, content: e.target.value }))
								}
							></textarea>
							<StarRating onRatingChange={onRatingChange} />
						</div>
					</form>
					<button
						className="btn btn-primary w-25"
						type="submit"
						onClick={(e) => handleSubmit(e)}
					>
						Comment
					</button>
				</div>
			</div>
		</div>
	);
};

export default FormComment;
