import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:3000/v1/api/',
});

const axiosAdmin = axios.create({
	baseURL: 'http://localhost:3000/v1/api/admin',
});

export { axiosClient, axiosAdmin };
