import APIClient from '@/services/ApiClient';
import Rating from '@/entities/Rating';
import { useState } from 'react';

const ratingsClient = new APIClient<Rating>('/rating');

export const useRatings = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const addRating = async (doctorId: string, rating: number) => {
		setLoading(true);
		setError(null);
		try {
			const response = await ratingsClient.create({
				doctorId,
				rating,
			});
			// console.log('set rating', rating);
			if (!response) throw new Error('somethings wrong');
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
	};

	return {
		addRating,
		loading,
		error,
	};
};
