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
	refreshToken(refreshToken) {
		const url = `auth/refreshToken`;
		return axiosClient.post(url, refreshToken);
	},
	logout() {
		const url = `auth/logout`;
		return axiosClient.delete(url);
	},
};

export default authApi;
