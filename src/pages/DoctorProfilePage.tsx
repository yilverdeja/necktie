import DoctorBooking from '@/components/DoctorBooking';
import DoctorProfile from '@/components/DoctorProfile';
import doctors from '@/data/doctors';
import Doctor from '@/entities/Doctor';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	const [doctor, setDoctor] = useState<Doctor | null>(null);

	useEffect(() => {
		const doc = (doctors as Doctor[]).find((doctor) => doctor.id === id);
		if (doc) setDoctor(doc);
	}, []);

	if (!doctor) return <p>Doctor not available</p>;

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 lg:p-8">
				<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
					<DoctorProfile doctor={doctor} />
				</div>
				<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
					<DoctorBooking doctor={doctor} />
				</div>
			</div>
		</>
	);
};

export default DoctorProfilePage;
