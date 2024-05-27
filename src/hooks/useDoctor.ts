import { useCallback, useEffect, useState } from 'react';
import useStore from '@/store';
import APIClient from '@/services/ApiClient';
import Doctor from '@/entities/Doctor';

const doctorsClient = new APIClient<Doctor>('/doctor');

export const useDoctor = (doctorId: string, fetchOnMount: boolean = true) => {
	const [doctor, setDoc] = useState<Doctor | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const setDoctor = useStore((state) => state.setDoctor);

	const getDoctorById = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedDoctor = await doctorsClient.get(doctorId);
			setDoc(fetchedDoctor);
			setDoctor(fetchedDoctor);
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
	}, [setDoctor, doctorId]);

	useEffect(() => {
		if (fetchOnMount) getDoctorById();
	}, [getDoctorById, fetchOnMount]);

	return {
		doctor,
		refetch: getDoctorById,
		loading,
		error,
	};
};
