import Doctor from '@/entities/Doctor';
import DoctorListItem from '../components/DoctorListItem';
import useStore from '@/store';
import { useEffect, useState } from 'react';

const HomePage = () => {
	const { doctors, fetchDoctors } = useStore();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		setError('');
		fetchDoctors()
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setError('Failed to load data');
				setLoading(false);
			});
	}, [fetchDoctors]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<h1 className="text-3xl my-4">Find Doctors</h1>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				{doctors.map((doctor, index) => (
					<DoctorListItem key={index} doctor={doctor as Doctor} />
				))}
			</div>
		</>
	);
};

export default HomePage;
