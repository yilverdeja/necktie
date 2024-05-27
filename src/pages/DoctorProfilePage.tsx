import DoctorBooking from '@/components/DoctorBooking';
import DoctorProfile from '@/components/DoctorProfile';
import { useBookings } from '@/hooks/useBookings';
import { useDoctor } from '@/hooks/useDoctor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	const { doctor, loading, error } = useDoctor(id!);
	const { refetch: fetchBookings } = useBookings(false);

	useEffect(() => {
		if (doctor) {
			fetchBookings();
		}
	}, [doctor, fetchBookings]);

	if (loading) return <p>Loading doctor...</p>;
	if (error) throw error;

	return (
		<>
			{doctor && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
						<DoctorProfile doctor={doctor} />
					</div>
					<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
						<DoctorBooking doctor={doctor} />
					</div>
				</div>
			)}
		</>
	);
};

export default DoctorProfilePage;
