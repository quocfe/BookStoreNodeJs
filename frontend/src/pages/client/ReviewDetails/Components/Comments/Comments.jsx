import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import commentsApi from '../../../../../api/client/comments';
import reviewApi from '../../../../../api/client/review';
import CommentItem from './../CommentItem/CommentItem';
import './Comments.css';

function getCurrentDay() {
	const currentDate = new Date();

	// Get day component
	const day = String(currentDate.getDate()).padStart(2, '0');

	// Get month component
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: January is 0!

	// Get year component
	const year = currentDate.getFullYear();

	// Create the formatted date string
	const formattedDate = `${year}-${month}-${day}T${currentDate
		.toISOString()
		.slice(11, 19)}.000Z`;

	return formattedDate;
}

const Comments = ({ totalComments, idReview }) => {
	const [comments, setComments] = useState();
	const commentsRedux = useSelector((state) => state.comment);
	const { username } = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await reviewApi.getOne(idReview);
			const responseComment = await commentsApi.getAllByIdProduct(
				data[0].idProduct
			);
			setComments(responseComment.data);
			totalComments(responseComment.data.length);
		};

		fetchData();
	}, [idReview]);

	useEffect(() => {
		const cloneArr = [...commentsRedux.data];
		const newArr = [];
		for (const object of cloneArr) {
			const newObj = {
				...object,
				username: username,
				createAt: getCurrentDay(),
			};
			newArr.push(newObj);
		}

		setComments((prev) => {
			if (prev === undefined) {
				return [...newArr];
			}
			return [...prev, ...newArr];
		});
	}, [commentsRedux]);

	return (
		<div className="container" id="comments">
			{_.orderBy(comments, ['createAt'], ['desc'])?.map((comment) => {
				return <CommentItem comment={comment} />;
			})}
		</div>
	);
};

export default Comments;
