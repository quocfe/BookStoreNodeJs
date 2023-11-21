import { axiosClient } from '../config';

const reviewApi = {
	insert(data) {
		const url = 'review/add';
		return axiosClient.post(url, data);
	},
	getAll() {
		const url = `review`;
		return axiosClient.get(url);
	},
	getOne(id) {
		const url = `review/${id}`;
		return axiosClient.get(url);
	},
	update(id, data) {
		const url = `review/update/${id}`;
		return axiosClient.put(url, data);
	},
	delete(id) {
		const url = `review/${id}`;
		return axiosClient.delete(url);
	},
	selectByProduct(id) {
		const url = `review/selectByProduct/${id}`;
		return axiosClient.get(url);
	},
};

export default reviewApi;
