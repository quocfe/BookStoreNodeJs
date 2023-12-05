import React, { useEffect, useState } from 'react';
import './Comments.css';
import commentsApi from '../../../../../api/client/comments';
import CommentItem from './../CommentItem/CommentItem';
import userApi from './../../../../../api/client/user';

const Comments = ({ totalComments }) => {
	const [comments, setComments] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await commentsApi.getAll();

			setComments(response.data);
			totalComments(response.data.length);
		};

		fetchData();
	}, []);

	return (
		<div className="container" id="comments">
			{comments?.map((comment) => {
				return <CommentItem key={comment.idcomments} comment={comment} />;
			})}
		</div>
	);
};

export default Comments;
