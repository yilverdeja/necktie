import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import Doctor, { OpeningHours } from '@/entities/Doctor';

interface HourGroup {
	days: string[];
	timeStr: string;
	isCosed: boolean;
}

interface Props {
	doctor: Doctor;
}

const convertFloatTimeToTimeString = (stringTime: string): string => {
	const floatTime = parseFloat(stringTime);
	const hours = Math.floor(floatTime);
	const minutes = Math.round((floatTime - hours) * 60);
	return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

const groupOpeningHours = (hours: OpeningHours[]): HourGroup[] => {
	const groups: HourGroup[] = [];
	let currentGroup: HourGroup | null = null;

	hours.forEach((hour) => {
		const { start, end, isClosed } = hour;
		const timeStr = isClosed
			? 'Closed'
			: `${convertFloatTimeToTimeString(
					start
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )} - ${convertFloatTimeToTimeString(end)}`;

		if (currentGroup && currentGroup.timeStr === timeStr) {
			currentGroup.days.push(hour.day);
		} else {
			if (currentGroup) {
				groups.push(currentGroup);
			}
			currentGroup = {
				days: [hour.day],
				timeStr,
				isCosed: isClosed,
			};
		}
	});

	if (currentGroup) {
		groups.push(currentGroup);
	}

	return groups;
};

const formatDayRange = (days: string[]): string => {
	if (days.length === 1) return days[0];
	const last = days.length - 1;
	return `${days[0]}-${days[last]}`;
};

const displayGroups = (
	groups: HourGroup[]
): { days: string; timeStr: string }[] =>
	groups.map((group) => ({
		days: formatDayRange(group.days),
		timeStr: group.timeStr,
	}));

const DoctorProfile = ({ doctor }: Props) => {
	const dayOrder = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

	const sortedHours = doctor.opening_hours.sort(
		(a, b) => dayOrder[a.day] - dayOrder[b.day]
	);

	const groupedHours = groupOpeningHours(sortedHours);
	const displayData = displayGroups(groupedHours);

	return (
		<>
			<div className="flex items-center space-x-4">
				<Avatar className="w-16 h-16">
					<AvatarImage
						alt={`Dr. ${doctor.name}`}
						src="/placeholder-avatar.jpg"
					/>
					<AvatarFallback>
						{doctor.name
							?.split(' ')
							.map((char) => char.substring(0, 1))
							.join('')}
					</AvatarFallback>
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
						{displayData.map((item, index) => (
							<React.Fragment key={index}>
								<div>{item.days}</div>
								<div>{item.timeStr}</div>
							</React.Fragment>
						))}
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold">Address</h3>
					<p className="text-gray-500 dark:text-gray-400">
						{doctor.address.line_1}
						{', '}
						{doctor.address.line_2}
						{', '}
						{doctor.address.district}
					</p>
				</div>
			</div>
		</>
	);
};

export default DoctorProfile;
