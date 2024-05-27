import BookingListItem from '@/components/BookingListItem';
import useStore from '@/store';
import { useEffect, useState } from 'react';

const ManageBookingsPage = () => {
	const { user, bookings, fetchBookings, fetchDoctors } = useStore();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		setError('');

		fetchBookings()
			.then(() => fetchDoctors())
			.then(() => setLoading(false))
			.catch((error) => {
				console.error(error);
				setError('Failed to load data');
				setLoading(false);
			});
	}, [fetchBookings, fetchDoctors]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<h1 className="text-3xl my-4">Manage Bookings</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{bookings
					.filter((booking) => booking.name === user)
					.sort((a, b) => {
						// Extract timestamps for comparison
						const timeA = new Date(a.date!).getTime();
						const timeB = new Date(b.date!).getTime();

						// Check if either booking is cancelled
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
					.map((booking, index) => (
						<BookingListItem key={index} booking={booking} />
					))}
			</div>
		</>
	);
};

export default ManageBookingsPage;
