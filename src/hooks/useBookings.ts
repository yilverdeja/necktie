import { useCallback, useEffect, useState } from 'react';
import useStore from '@/store';
import APIClient from '@/services/ApiClient';
import Booking from '@/entities/Booking';

const bookingsClient = new APIClient<Booking>('/booking');

export const useBookings = (fetchOnMount: boolean = true) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const bookings = useStore((state) => state.bookings);
	const setBookings = useStore((state) => state.setBookings);

	const getBookings = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedBookings = await bookingsClient.getAll();
			setBookings(fetchedBookings);
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
	}, [setBookings]);

	const addBooking = useCallback(
		async (booking: Partial<Booking>) => {
			setLoading(true);
			setError(null);
			try {
				const newBooking = await bookingsClient.create(booking);
				setBookings([...bookings, newBooking]);
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
		},
		[setBookings, bookings]
	);

	const cancelBooking = useCallback(
		async (bookingId: string) => {
			setLoading(true);
			setError(null);
			try {
				await bookingsClient.patch(bookingId, { status: 'cancelled' });
				setBookings(
					bookings.map((booking) =>
						booking.id === bookingId
							? { ...booking, status: 'cancelled' }
							: booking
					)
				);
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
		},
		[setBookings, bookings]
	);

	useEffect(() => {
		if (fetchOnMount) {
			getBookings();
		}
	}, [getBookings, fetchOnMount]);

	return {
		bookings,
		loading,
		error,
		addBooking,
		cancelBooking,
		refetch: getBookings,
	};
};
