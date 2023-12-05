import { axiosClient } from '../config';

const commentsApi = {
	insert(data) {
		const url = 'comment/add';
		return axiosClient.post(url, data);
	},
	getAll() {
		const url = `comment`;
		return axiosClient.get(url);
	},
	getOne(id) {
		const url = `comment/${id}`;
		return axiosClient.get(url);
	},
	search(query) {
		const url = `comment/search?q=${query}`;
		return axiosClient.get(url);
	},
	update(id, data) {
		const url = `comment/update/${id}`;
		return axiosClient.put(url, data);
	},
	delete(id) {
		const url = `comment/${id}`;
		return axiosClient.delete(url);
	},
};

export default commentsApi;
