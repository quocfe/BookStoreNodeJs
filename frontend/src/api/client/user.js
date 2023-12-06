import { axiosClient } from '../config';

const userApi = {
	getAllUser() {
		const url = 'user';
		return axiosClient.get(url);
	},
	getUser(id) {
		const url = `user/${id}`;
		return axiosClient.get(url);
	},
};

export default userApi;
