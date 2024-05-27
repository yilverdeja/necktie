import BookingListItem from '@/components/BookingListItem';
import { useBookings } from '@/hooks/useBookings';
import useDoctors from '@/hooks/useDoctors';
import useStore from '@/store';
import { getTimestamp } from '@/utils/helper';
import { useEffect } from 'react';

const ManageBookingsPage = () => {
	const { user, bookings } = useStore();
	const {
		refetch: fetchBookings,
		loading: loadingBookings,
		error: errorBookings,
	} = useBookings(false);
	const {
		refetch: fetchDoctors,
		loading: loadingDoctors,
		error: errorDoctors,
	} = useDoctors(false);

	useEffect(() => {
		fetchBookings();
		fetchDoctors();
	}, [fetchBookings, fetchDoctors]);

	// TODO: Improve loading and error
	// Combine loading and error states
	const isLoading = loadingBookings || loadingDoctors;
	const error = errorBookings || errorDoctors;

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<h1 className="text-3xl my-4">Manage Bookings</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{bookings
					.filter((booking) => booking.name === user)
					.sort((a, b) => {
						const timeA = getTimestamp(a.date) + a.start;
						const timeB = getTimestamp(b.date) + b.start;
						const isACancelled = a.status === 'cancelled';
						const isBCancelled = b.status === 'cancelled';

						// If both are cancelled or neither are cancelled, sort by date
						if (
							(isACancelled && isBCancelled) ||
							(!isACancelled && !isBCancelled)
						) {
							return timeA - timeB;
						}

						// Sort primarily by cancellation status
						if (isACancelled && !isBCancelled) {
							return 1; // Move a to the bottom
						} else if (!isACancelled && isBCancelled) {
							return -1; // Keep a above b
						}
						return 0;
					})
					.map((booking) => (
						<BookingListItem key={booking.id} booking={booking} />
					))}
			</div>
		</>
	);
};

export default ManageBookingsPage;
