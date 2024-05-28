import { Card } from '@/components/ui/card';
import Doctor from '@/entities/Doctor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRoundX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DAY_ORDER_1, DOCTOR_ROUTE_PATH } from '@/utils/const';

interface Props {
	doctor: Doctor;
}

const DoctorListItem = ({ doctor }: Props) => {
	const navigate = useNavigate();

	const sortedOpeningHours = doctor.opening_hours.sort(
		(a, b) => DAY_ORDER_1[a.day] - DAY_ORDER_1[b.day]
	);

	const openDays = sortedOpeningHours.filter((hour) => !hour.isClosed);

	const goDoctorProfile = () => {
		navigate(DOCTOR_ROUTE_PATH(doctor.id));
	};

	return (
		<Card className="flex items-center p-4 sm:p-6 gap-4 sm:gap-6">
			<div className="flex-1 grid gap-1">
				<h3 className="font-semibold text-lg">Dr. {doctor.name}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{doctor.address.district}
				</p>
				<div className="flex items-center gap-2 flex-wrap my-2">
					{openDays.length > 0 ? (
						openDays.map((hour) => (
							<Badge
								key={hour.day + hour.end}
								className="px-2 py-1 text-xs"
								variant="outline"
							>
								{hour.day}
							</Badge>
						))
					) : (
						<div className="flex gap-2 items-center text-red-600">
							<UserRoundX />
							<p className="text-sm ">Doctor is not available</p>
						</div>
					)}
				</div>
			</div>
			<Button className="shrink-0" size="sm" onClick={goDoctorProfile}>
				Book Appointment
			</Button>
		</Card>
	);
};

export default DoctorListItem;
