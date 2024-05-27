import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'x-api-key': import.meta.env.VITE_API_KEY,
		'Content-Type': 'application/json',
	},
});

class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (config: AxiosRequestConfig) => {
		return axiosInstance
			.get<T[]>(this.endpoint, config)
			.then((res) => res.data);
	};

	get = (id: number | string) => {
		return axiosInstance
			.get<T>(this.endpoint + '/' + id)
			.then((res) => res.data);
	};

	create = (data: T) => {
		return axiosInstance
			.post<T>(this.endpoint, data)
			.then((res) => res.data);
	};

	patch = (id: number | string, data: T) => {
		return axiosInstance
			.patch<T>(`${this.endpoint}/${id}`, data)
			.then((res) => res.data);
	};
}

export default APIClient;
