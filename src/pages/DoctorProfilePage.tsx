import DoctorBooking from '@/components/DoctorBooking';
import DoctorProfile from '@/components/DoctorProfile';
import Doctor from '@/entities/Doctor';
import useStore from '@/store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	const { fetchDoctorById, fetchBookings } = useStore((state) => ({
		fetchDoctorById: state.fetchDoctorById,
		fetchBookings: state.fetchBookings,
	}));
	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		fetchDoctorById(id)
			.then((fetchedDoctor) => {
				if (!fetchedDoctor) {
					setError('Doctor does not exist');
					setDoctor(null);
				} else {
					setDoctor(fetchedDoctor);
					setError('');
					fetchBookings();
				}
				setLoading(false);
			})
			.catch(() => {
				setError('Failed to fetch doctor details');
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id, fetchDoctorById, fetchBookings]);

	if (isLoading) return <p>Loading doctor...</p>;
	if (error) return <p>{error}</p>;

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
