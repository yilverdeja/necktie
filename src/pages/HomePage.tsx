import Doctor from '@/entities/Doctor';
import DoctorListItem from '../components/DoctorListItem';
import useStore from '@/store';
import { useEffect } from 'react';

const HomePage = () => {
	const { doctors, fetchDoctors } = useStore();

	useEffect(() => {
		fetchDoctors();
	}, [fetchDoctors]);

	return (
		<>
			<h1 className="text-3xl my-4">Find Doctors</h1>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				{doctors.map((doctor) => (
					<DoctorListItem key={doctor.id} doctor={doctor as Doctor} />
				))}
			</div>
		</>
	);
};

export default HomePage;
