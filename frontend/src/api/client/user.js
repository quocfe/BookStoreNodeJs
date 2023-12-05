import { axiosClient } from '../config';

const userApi = {
	getAllUser() {
		const url = 'user';
		return axiosClient.post(url);
	},
	getUser(id) {
		const url = `user/${id}`;
		return axiosClient.post(url);
	},
};

export default userApi;
