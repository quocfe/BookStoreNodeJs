import React from 'react';
import Star from '../../../BookDetails/component/Star/Star';

const CommentItem = ({ comment }) => {
	const generationDate = (datetimeString) => {
		let time;
		let dateTime = new Date(datetimeString);
		time = `${dateTime.getDate()}-${
			dateTime.getMonth() + 1
		}-${dateTime.getFullYear()}`;
		return time;
	};

	return (
		<div
			key={comment.idcomments}
			className="row px-5 py-3 mb-5 mt-5 bg-body rounded"
		>
			<div className="col-lg-1">
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
					className="rounded-circle shadow-1-strong me-3"
				/>
			</div>
			<div className="col-lg-11">
				<div className="row">
					<div className="col-sm-6">
						<p>{comment?.username}</p>
					</div>
					<div className="col-sm-6">
						<p className="text-end">{generationDate(comment?.createAt)}</p>
					</div>
				</div>
				<div className=" mb-3 h-100">
					<p className="bg-light p-4">{comment?.content}</p>
					<Star rating={comment?.rating} />
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
