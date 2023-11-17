import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:3000/v1/api/',
});

export default axiosClient;
