import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import doctors from '@/data/doctors';
import Doctor, { OpeningHours } from '@/entities/Doctor';
import { CalendarDaysIcon, ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface HourGroup {
	days: string[];
	timeStr: string;
	isCosed: boolean;
}

interface TimeSlot {
	hour: number;
	isBooked: boolean;
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

const DoctorProfilePage = () => {
	const { id } = useParams();
	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const dayOrder = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

	useEffect(() => {
		const doc = (doctors as Doctor[]).find((doctor) => doctor.id === id);
		if (doc) setDoctor(doc);
	}, []);

	if (!doctor) return <p>Doctor not available</p>;

	const sortedHours = doctor.opening_hours.sort(
		(a, b) => dayOrder[a.day] - dayOrder[b.day]
	);

	const groupedHours = groupOpeningHours(sortedHours);
	const displayData = displayGroups(groupedHours);

	const generateTimeSlots = (
		hours: OpeningHours[],
		day: number
	): string[] => {
		const slots: string[] = [];
		hours.forEach((hour) => {
			if (!hour.isClosed && dayOrder[hour.day] === day) {
				for (
					let time = parseFloat(hour.start);
					time < parseFloat(hour.end);
					time++
				) {
					slots.push(`${time}:00`);
				}
			}
		});
		return slots;
	};

	const timeSlots = generateTimeSlots(
		doctor.opening_hours,
		selectedDate.getDay()
	);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 lg:p-8">
				<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
					<div className="flex items-center space-x-4">
						<Avatar className="w-16 h-16">
							<AvatarImage
								alt="Dr. John Doe"
								src="/placeholder-avatar.jpg"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<h2 className="text-2xl font-bold">
								Dr. {doctor?.name}
							</h2>
							<p className="text-gray-500 dark:text-gray-400">
								General Practitioner
							</p>
						</div>
					</div>
					<div className="mt-6 space-y-4">
						<div>
							<h3 className="text-lg font-semibold">About</h3>
							<p className="text-gray-500 dark:text-gray-400">
								{doctor?.description}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold">
								Open Hours
							</h3>
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
				</div>
				<div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<h2 className="text-2xl font-bold">
								Book an Appointment
							</h2>
							<p className="text-gray-500 dark:text-gray-400">
								Select a date and time to book your appointment
								with Dr. {doctor.name}.
							</p>
						</div>
						<div className="grid gap-4">
							<div className="font-medium">
								Select Booking Date
							</div>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										className="w-full flex items-center justify-between"
										variant="outline"
									>
										<div className="flex items-center gap-2">
											<CalendarDaysIcon className="w-5 h-5" />
											<span>
												{selectedDate.toLocaleDateString()}
											</span>
										</div>
										<ChevronDownIcon className="w-5 h-5" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="p-0 w-[300px]">
									<Calendar
										selected={selectedDate}
										onDayClick={(date) => {
											setSelectedDate(date);
										}}
										disabled={{ before: new Date() }}
										mode="single"
										required
									/>
								</PopoverContent>
							</Popover>
							<div className="grid gap-2">
								<div className="font-medium">
									Select Available Timeslots
								</div>
								<div className="grid sm:grid-cols-2 gap-2">
									{timeSlots.map((slot, index) => (
										<Button
											key={index}
											size="sm"
											variant="outline"
										>
											{slot}
										</Button>
									))}
								</div>
							</div>
							<Button className="w-full" size="lg">
								Book Appointment
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DoctorProfilePage;
