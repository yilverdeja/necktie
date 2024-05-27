import { DoctorAddress, OpeningHours } from '@/entities/Doctor';

export interface HourGroup {
	days: string[];
	timeStr: string;
	isCosed: boolean;
}

export interface TimeSlot {
	slot: string;
	isAvailable: boolean;
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

export const formatDateTime = (dateString: string, floatTime: number) => {
	// Parse the date string
	const [year, month, day] = dateString.split('-').map(Number);

	// Calculate hours and minutes from the float time
	const hours = Math.floor(floatTime);
	const minutes = Math.round((floatTime - hours) * 60);

	// Create a Date object (needed for formatting month name)
	const date = new Date(year, month - 1, day);

	// Format the time string
	const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;

	// Format the month name and ordinal day
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const monthName = monthNames[date.getMonth()];
	const dayOrdinal = `${day}${
		['th', 'st', 'nd', 'rd'][((day % 10) - 1) % 10] || 'th'
	}`;

	// Format the full date string
	const dateStringFormatted = `${monthName} ${dayOrdinal} ${year}`;

	// Return the formatted string
	return `${timeString}, ${dateStringFormatted}`;
};

export const convertDateToString = (date: Date) => {
	const year = date.getFullYear().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return year + '-' + month + '-' + day;
};

export const convertFloatToTimeString = (floatTime: number): string => {
	const hours = Math.floor(floatTime);
	const minutes = Math.round((floatTime - hours) * 60);
	return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const convertTimeStringToFloat = (timeString: string): number => {
	const [hours, minutes] = timeString
		.split(':')
		.map((value) => parseInt(value));
	const fractionalHours = minutes / 60;
	return hours + fractionalHours;
};

export const getTimestamp = (date: string) => new Date(date).getTime();
