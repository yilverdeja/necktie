import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import Doctor from '../entities/Doctor';
import doctors from '../data/doctors';

const DoctorSelection = () => {
	const listItem = (doctor: Doctor) => {
		return (
			<div
				className="p-grid p-nogutter p-align-center"
				style={{ padding: '2em', borderBottom: '1px solid #ccc' }}
			>
				<div className="p-col-8">
					<h2>{doctor.name}</h2>
					<p>
						{doctor.address.line_1}, {doctor.address.line_2},{' '}
						{doctor.address.district}
					</p>
					<div>
						{doctor.opening_hours
							.filter((day) => !day.isClosed)
							.map((hour, index) => (
								<Badge
									key={index}
									value={hour.day}
									className="p-mr-2"
									severity="success"
								/>
							))}
					</div>
				</div>
				<div className="p-col-4" style={{ textAlign: 'right' }}>
					<Button label="Book" icon="pi pi-check" />
				</div>
			</div>
		);
	};

	return (
		<>
			<DataView value={doctors} itemTemplate={listItem} layout="list" />
		</>
	);
};

export default DoctorSelection;
