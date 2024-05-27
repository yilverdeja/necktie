import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	return (
		<>
			<div>DoctorProfilePage {id}</div>
			{/* DoctorInformation */}
			{/* BookingStepper */}

			<div className="">
				<div>
					<p>Doctor Info</p>
				</div>
			</div>
		</>
	);
};

export default DoctorProfilePage;
