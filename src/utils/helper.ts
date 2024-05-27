import { DoctorAddress, OpeningHours } from '@/entities/Doctor';

export interface HourGroup {
	days: string[];
	timeStr: string;
	isCosed: boolean;
}

export const convertFloatTimeToTimeString = (stringTime: string): string => {
	const floatTime = parseFloat(stringTime);
	const hours = Math.floor(floatTime);
	const minutes = Math.round((floatTime - hours) * 60);
	return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const groupOpeningHours = (hours: OpeningHours[]): HourGroup[] => {
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

export const formatDayRange = (days: string[]): string => {
	if (days.length === 1) return days[0];
	const last = days.length - 1;
	return `${days[0]}-${days[last]}`;
};

export const formatAddress = ({ line_1, line_2, district }: DoctorAddress) => {
	return `${line_1}, ${line_2}, ${district}`;
};
