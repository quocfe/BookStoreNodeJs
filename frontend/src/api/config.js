import axios from 'axios';
import authApi from './client/auth';

const axiosClient = axios.create({
	baseURL: 'http://localhost:3000/v1/api/',
});

const axiosAdmin = axios.create({
	baseURL: 'http://localhost:3000/v1/api/admin',
});

axiosClient.interceptors.request.use(
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

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				console.log('refresh token', refreshToken);
				const dataRefreshToken = {
					refreshToken: refreshToken,
				};
				try {
					const refreshResponse = await authApi.refreshToken(dataRefreshToken);

					const newAccessToken = refreshResponse.data.accessToken;
					const refreshToken = refreshResponse.data.refreshToken;
					localStorage.setItem('accessToken', newAccessToken);
					localStorage.setItem('refreshToken', refreshToken);

					originalRequest.headers.token = 'Bearer ' + newAccessToken;
					return axios(originalRequest);
				} catch (refreshError) {
					console.error(
						'Refresh token error:',
						refreshError.response.data.error
					);
				}
			}
		}

		return Promise.reject(error);
	}
);

export { axiosClient, axiosAdmin };
