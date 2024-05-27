import DoctorBooking from '@/components/DoctorBooking';
import DoctorProfile from '@/components/DoctorProfile';
import { Button } from '@/components/ui/button';
import doctors from '@/data/doctors';
import Doctor from '@/entities/Doctor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [doctor, setDoctor] = useState<Doctor | null>(null);

	useEffect(() => {
		const doc = (doctors as Doctor[]).find((doctor) => doctor.id === id);
		if (doc) setDoctor(doc);
	}, []);

	if (!doctor) return <p>Doctor not available</p>;

	const goHome = () => {
		navigate('/');
	};

	return (
		<>
			<Button size="sm" onClick={goHome}>
				Back to All Doctors
			</Button>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
