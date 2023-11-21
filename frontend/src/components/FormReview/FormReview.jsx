import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { setReviews } from '../../redux/reviewSlice';
import reviewApi from './../../api/client/review';
import StarRating from './../StarRating/StarRating';

const FormReview = ({ show, onHide, title, idProduct }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		content: '',
		rating: 0,
	});

	const handleRatingChange = (value) => {
		setFormData((prev) => ({
			...prev,
			rating: value,
		}));
	};

	const handleSubmit = async () => {
		const newData = { ...formData, idUser: 1, idProduct: +idProduct };
		try {
			await reviewApi.insert(newData);
			const response = await reviewApi.getAll();
			dispatch(setReviews(response.data));
			alert('Đăng review thành công');
			onHide();
			setFormData({
				content: '',
				rating: 0,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Review sách {title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CKEditor
						editor={ClassicEditor}
						data={formData.content}
						onReady={(editor) => {}}
						onChange={(event, editor) => {
							const data = editor.getData();
							setFormData((prev) => ({
								...prev,
								content: data,
							}));
						}}
					/>
					<StarRating onRatingChange={handleRatingChange} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Đóng
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Đăng
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default FormReview;
