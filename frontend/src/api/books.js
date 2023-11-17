import axiosClient from './config';

const booksApi = {
	insert(data) {
		const url = 'book/add';
		return axiosClient.post(url, data);
	},
	getAll() {
		const url = `book`;
		return axiosClient.get(url);
	},
	getOne(id) {
		const url = `book/${id}`;
		return axiosClient.get(url);
	},
	search(query) {
		const url = `book/search?q=${query}`;
		return axiosClient.get(url);
	},
	update(id, data) {
		const url = `update/${id}`;
		return axiosClient.put(url, data);
	},
};

export default booksApi;
