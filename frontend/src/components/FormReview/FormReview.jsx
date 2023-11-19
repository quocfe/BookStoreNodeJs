import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import StarRating from './../StarRating/StarRating';

const FormReview = ({ show, onHide, title }) => {
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

	const handleSubmit = () => {
		console.log(formData);
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
