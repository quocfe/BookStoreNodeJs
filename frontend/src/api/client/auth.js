import { axiosClient } from '../config';

const authApi = {
	register(user) {
		const url = 'auth/register';
		return axiosClient.post(url, user);
	},
	login(user) {
		const url = 'auth/login';
		return axiosClient.post(url, user);
	},
	refreshToken() {
		const url = `auth/refreshToken`;
		return axiosClient.post(url, {
			withCredentials: true,
		});
	},
};

export default authApi;
