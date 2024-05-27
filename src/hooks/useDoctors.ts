import { useEffect, useState } from 'react';
import useStore from '@/store';

const useDoctors = () => {
	const { doctors, fetchDoctors } = useStore();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		setError('');
		fetchDoctors()
			.then(() => setLoading(false))
			.catch((error) => {
				console.error(error);
				setError('Failed to load data');
				setLoading(false);
			});
	}, [fetchDoctors]);

	return { doctors, isLoading, error };
};

export default useDoctors;
