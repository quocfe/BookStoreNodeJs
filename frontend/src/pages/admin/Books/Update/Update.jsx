import React from 'react';
import Modal from 'react-bootstrap/Modal';
import booksApi from '../../../../api/books';
import { Toastify } from '../../../../components/Toast/Toast';
import { handleUploadFile } from '../../../../helper/upload';
import UpdateForm from './Form';
import { useParams } from 'react-router-dom';
import './Update.css';

const Update = ({ show, book, onHide }) => {
	const handleUpdateButtonClick = async (formData) => {
		const { id } = useParams();
		try {
			console.log(formData);
			console.log(id);
			// const urlImg = await handleUploadFile(formData.images);
			// if (urlImg) {
			// 	let updatedPerson = Object.assign({}, formData, {
			// 		images: urlImg,
			// 	});
			// 	await booksApi.insert(updatedPerson);
			// }
			Toastify('success', 'Update success');
		} catch (error) {
			Toastify('error', 'Update error');
			console.log(error);
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Update book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<UpdateForm
					book={book}
					handleUpdateButtonClick={handleUpdateButtonClick}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default Update;
