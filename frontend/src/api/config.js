import axios from 'axios';
import authApi from './client/auth';
import userApi from './client/user';

const axiosRoute = axios.create({
	baseURL: 'http://localhost:3000/v1/api/',
});

axiosRoute.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers.token = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosRoute.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			const user = JSON.parse(localStorage.getItem('user'));
			const { data } = await userApi.getUser(user.id);
			const refreshToken = data[0].refreshToken;
			const idUser = data[0].idUser;
			if (refreshToken) {
				const dataRefreshToken = {
					refreshToken: refreshToken,
					idUser: idUser,
				};

				try {
					const refreshResponse = await authApi.refreshToken(dataRefreshToken);
					const newAccessToken = refreshResponse.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);

					originalRequest.headers.token = 'Bearer ' + newAccessToken;
					return axios(originalRequest);
				} catch (error) {
					console.error('Refresh token error:', error.response.data);
				}
			}
		}

		return Promise.reject(error);
	}
);

export default axiosRoute;
