import { axiosClient } from '../config';

const categoryApi = {
	insert(data) {
		const url = 'category/add';
		return axiosClient.post(url, data);
	},
	getAll() {
		const url = `category`;
		return axiosClient.get(url);
	},
	getOne(id) {
		const url = `category/${id}`;
		return axiosClient.get(url);
	},
	search(query) {
		const url = `category/search?q=${query}`;
		return axiosClient.get(url);
	},
	update(id, data) {
		const url = `category/update/${id}`;
		return axiosClient.put(url, data);
	},
	delete(id) {
		const url = `category/${id}`;
		return axiosClient.delete(url);
	},
};

export default categoryApi;
