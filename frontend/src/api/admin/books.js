import { axiosAdmin } from '../config';

const booksAdminApi = {
	insert(data) {
		const url = 'book/add';
		return axiosAdmin.post(url, data);
	},
	getAll() {
		const url = `book`;
		return axiosAdmin.get(url);
	},
	getOne(id) {
		const url = `book/${id}`;
		return axiosAdmin.get(url);
	},
	search(query) {
		const url = `book/search?q=${query}`;
		return axiosAdmin.get(url);
	},
	update(id, data) {
		const url = `book/update/${id}`;
		return axiosAdmin.put(url, data);
	},
	delete(id) {
		const url = `book/${id}`;
		return axiosAdmin.delete(url);
	},
};

export default booksAdminApi;
