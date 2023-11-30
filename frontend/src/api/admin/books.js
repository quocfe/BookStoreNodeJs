import { axiosAdmin } from '../config';

const booksAdminApi = {
	insert(data) {
		const url = '/book/add';
		return axiosAdmin.post(url, data);
	},
	getAll() {
		const url = `book/?page=1&limit=100`;
		return axiosAdmin.get(url);
	},
	getOne(id) {
		const url = `/book/${id}`;
		return axiosAdmin.get(url);
	},
	search(query) {
		const url = `/book/search?q=${query}`;
		return axiosAdmin.get(url);
	},
	update(id, data) {
		const url = `/book/update/${id}`;
		return axiosAdmin.put(url, data);
	},
	delete(id) {
		const url = `/book/${id}`;
		return axiosAdmin.delete(url);
	},
	isbnExists(isbn) {
		console.log('isbn', isbn);
		const url = '/book/isbnExists';
		return axiosAdmin.get(url, isbn);
	},
};

export default booksAdminApi;
