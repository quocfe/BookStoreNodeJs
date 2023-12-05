import { axiosAdmin } from '../config';

const reviewAdminApi = {
	insert(data) {
		const url = 'review/add';
		return axiosAdmin.post(url, data);
	},
	getAll(page, limit) {
		const url = `review?page=${page}&limit=${limit}`;
		return axiosAdmin.get(url);
	},
	getOne(id) {
		const url = `review/${id}`;
		return axiosAdmin.get(url);
	},
	update(id, data) {
		const url = `review/update/${id}`;
		return axiosAdmin.put(url, data);
	},
	delete(id) {
		const url = `review/${id}`;
		return axiosAdmin.delete(url);
	},
	selectByProduct(id) {
		const url = `review/selectByProduct/${id}`;
		return axiosAdmin.get(url);
	},
};

export default reviewAdminApi;
