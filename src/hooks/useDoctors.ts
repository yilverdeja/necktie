import { useCallback, useEffect, useState } from 'react';
import useStore from '@/store';
import APIClient from '@/services/ApiClient';
import Doctor from '@/entities/Doctor';

const doctorsClient = new APIClient<Doctor>('/doctor');

const useDoctors = (fetchOnMount: boolean = true) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const doctors = useStore((state) => state.doctors);
	const doctorsLoaded = useStore((state) => state.doctorsLoaded);
	const setDoctors = useStore((state) => state.setDoctors);

	const getDoctors = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedDoctors = await doctorsClient.getAll();
			setDoctors(fetchedDoctors);
			setLoading(false);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error(String(err)));
			}
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, [setDoctors]);

	useEffect(() => {
		if (fetchOnMount && !doctorsLoaded) {
			getDoctors();
		}
	}, [getDoctors, fetchOnMount, doctorsLoaded]);

	return {
		doctors,
		loading,
		error,
		refetch: getDoctors,
	};
};

export default useDoctors;
