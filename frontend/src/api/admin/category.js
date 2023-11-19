import { axiosAdmin } from '../config';

const categoryAdminApi = {
	insert(data) {
		const url = 'category/add';
		return axiosAdmin.post(url, data);
	},
	getAll() {
		const url = `category`;
		return axiosAdmin.get(url);
	},
	getOne(id) {
		const url = `category/${id}`;
		return axiosAdmin.get(url);
	},
	search(query) {
		const url = `category/search?q=${query}`;
		return axiosAdmin.get(url);
	},
	update(id, data) {
		const url = `category/update/${id}`;
		return axiosAdmin.put(url, data);
	},
	delete(id) {
		const url = `category/${id}`;
		return axiosAdmin.delete(url);
	},
};

export default categoryAdminApi;
