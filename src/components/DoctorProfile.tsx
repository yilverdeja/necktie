import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	groupOpeningHours,
	formatDayRange,
	formatAddress,
} from '@/utils/helper';

import Doctor from '@/entities/Doctor';
import { DAY_ORDER_1 } from '@/utils/const';
import { useRatings } from '@/hooks/useRatings';
import Stars from './Stars';

interface Props {
	doctor: Doctor;
}

const DoctorProfile = ({ doctor }: Props) => {
	const { addRating } = useRatings();
	const sortedHours = doctor.opening_hours.sort(
		(a, b) => DAY_ORDER_1[a.day] - DAY_ORDER_1[b.day]
	);

	const groupedHours = groupOpeningHours(sortedHours);
	const displayData = groupedHours.map((group) => ({
		days: formatDayRange(group.days),
		timeStr: group.timeStr,
	}));

	const doctorInitials = doctor.name
		.split(' ')
		.map((char) => char[0])
		.join('');

	const handleRating = (rating: number) => {
		addRating(doctor.id, rating);
	};

	return (
		<>
			<div className="flex items-center space-x-4">
				<Avatar className="w-16 h-16">
					<AvatarFallback>{doctorInitials}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className="text-2xl font-bold">Dr. {doctor?.name}</h2>
					<p className="text-gray-500 dark:text-gray-400">
						General Practitioner
					</p>
				</div>
			</div>
			<div className="mt-6 space-y-4">
				{doctor?.description.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold">About</h3>
						<p className="text-gray-500 dark:text-gray-400">
							{doctor?.description}
						</p>
					</div>
				)}
				<div>
					<h3 className="text-lg font-semibold">Open Hours</h3>
					<div className="grid grid-cols-2 gap-2">
						{displayData.map(({ days, timeStr }) => (
							<React.Fragment key={days + timeStr}>
								<div>{days}</div>
								<div>{timeStr}</div>
							</React.Fragment>
						))}
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Address</h3>
					<p className="text-gray-500 dark:text-gray-400">
						{formatAddress(doctor.address)}
					</p>
				</div>
				<div className="">
					<Stars
						onSetRating={(rating: number) => handleRating(rating)}
					/>
				</div>
			</div>
		</>
	);
};

export default DoctorProfile;
