import { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Button from 'react-bootstrap/esm/Button';

const AddForm = ({ handleAddButtonClick }) => {
	const [formData, setFormData] = useState({
		nameProduct: '',
		authorProduct: '',
		sortDescription: '',
		description: '',
		priceProduct: '',
		images: '',
		year: '',
		isbn: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleImage = async (event) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			images: event.target.files[0],
		}));
	};

	return (
		<form encType="multipart/form-data">
			<div className="form-group">
				<label htmlFor="nameProduct">Name book</label>
				<input
					type="text"
					name="nameProduct"
					className="form-control"
					value={formData.nameProduct}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="authorProduct">Author</label>
				<input
					type="text"
					name="authorProduct"
					className="form-control"
					value={formData.authorProduct}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="isbn">ISBN</label>
				<input
					type="text"
					name="isbn"
					className="form-control"
					value={formData.isbn}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="year">Year</label>
				<input
					type="text"
					name="year"
					className="form-control"
					value={formData.year}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="images">Image</label>
				<input
					type="file"
					name="images"
					className="form-control"
					onChange={handleImage}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="priceProduct">Price</label>
				<input
					type="text"
					name="priceProduct"
					className="form-control"
					value={formData.priceProduct}
					onChange={handleChange}
				/>
				<span className="message text-danger"></span>
			</div>
			<div className="form-group">
				<label htmlFor="description">Sort description</label>
				<CKEditor
					editor={ClassicEditor}
					data={formData.sortDescription}
					onReady={(editor) => {}}
					onChange={(event, editor) => {
						const data = editor.getData();
						setFormData((prevFormData) => ({
							...prevFormData,
							sortDescription: data,
						}));
					}}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="description">Description</label>
				<CKEditor
					editor={ClassicEditor}
					data={formData.description}
					onReady={(editor) => {}}
					onChange={(event, editor) => {
						const data = editor.getData();
						setFormData((prevFormData) => ({
							...prevFormData,
							description: data,
						}));
					}}
				/>
			</div>
			<select
				className="form-select"
				aria-label="category"
				name="idCategory"
				value={formData.idCategory}
				onChange={handleChange}
			>
				<option defaultValue>Category</option>
				<option value="1">Trẻ em</option>
				<option value="2">Tâm lý</option>
			</select>

			<Button
				className="mt-3"
				variant="primary"
				onClick={() => handleAddButtonClick(formData)}
			>
				Add
			</Button>
		</form>
	);
};

export default AddForm;
