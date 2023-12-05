import React, { useEffect, useState } from 'react';
import reviewAdminApi from './../../../../api/admin/review';
import Button from 'react-bootstrap/Button';
import Layout from '../../Layout/Layout';
import { Link } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import './View.css';
import Add from '../Add/Add';

const ViewReview = () => {
	const [reviews, setReviews] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [selectedReview, setSelectedReview] = useState(null);

	const handleShowAddForm = (book) => setShowAddForm(true);
	const handleCloseAddForm = () => setShowAddForm(false);

	const handleShowEditForm = (book) => {
		setSelectedReview(book);
		setShowEditForm(true);
	};
	const handleCloseEditForm = () => setShowEditForm(false);

	const handleDelete = async () => {};

	useEffect(() => {
		const fetchData = async () => {
			const response = await reviewAdminApi.getAll(1, 100);
			if (response.status === 200) {
				const sortedReviews = orderBy(
					response.data.data,
					['createAt'],
					['desc']
				);
				setReviews(sortedReviews);
			}
		};

		fetchData();
	}, []);

	console.log(reviews);

	const generationDate = (datetimeString) => {
		let time;
		let dateTime = new Date(datetimeString);
		time = `${dateTime.getDate()}-${
			dateTime.getMonth() + 1
		}-${dateTime.getFullYear()}`;
		return time;
	};

	return (
		<Layout>
			<div className="container" id="viewReview">
				<div className="row mb-4">
					<Button variant="primary" onClick={handleShowAddForm}>
						Add review
					</Button>
					<Add show={showAddForm} onHide={handleCloseAddForm} />
				</div>
				<div className="row">
					<table className="table">
						<thead>
							<tr className="text-center align-middle">
								<th scope="col">Id sách</th>
								<th scope="col">Id tác giả</th>
								<th scope="col">Ngày đăng</th>
								<th>
									<i className="fa-regular fa-pen-to-square"></i>
								</th>
								<th>
									<i className="fa-solid fa-trash-can"></i>
								</th>
							</tr>
						</thead>
						<tbody>
							{reviews?.map(
								({ idReview, idProduct, idUser, content, createAt }) => {
									return (
										<tr key={idReview} className="text-center align-middle">
											<td>{idProduct || 'null'}</td>
											<td>{idUser || 'null'}</td>
											<td>{generationDate(createAt) || 'null'}</td>
											<td>
												<Button
													variant="primary"
													onClick={() => {
														handleShowEditForm();
													}}
												>
													Edit review
												</Button>
												{/* <Update
										show={showEditForm}
										book={selectedReview}
										onHide={handleCloseEditForm}
									/> */}
											</td>
											<td>
												<Link to={`/admin/book/`}>
													<button
														onClick={() => handleDelete()}
														className="btn btn-danger w-100 "
													>
														Xóa
													</button>
												</Link>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
};

export default ViewReview;
