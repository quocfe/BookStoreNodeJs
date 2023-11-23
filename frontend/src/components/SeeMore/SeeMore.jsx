import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './SeeMore.css';

const SeeMore = ({ text }) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div>
			<div
				dangerouslySetInnerHTML={{
					__html: showMore ? text : `${text?.slice(0, 500)}...`,
				}}
			/>
			{text?.length > 200 && (
				<Button
					className="btn-seemore mt-2"
					variant="link"
					onClick={toggleShowMore}
				>
					{showMore ? 'Ẩn bớt' : 'Xem thêm'}
				</Button>
			)}
		</div>
	);
};

export default SeeMore;
