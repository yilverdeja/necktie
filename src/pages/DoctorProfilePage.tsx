import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
	const { id } = useParams();
	return <div>DoctorProfilePage {id}</div>;
};

export default DoctorProfilePage;
