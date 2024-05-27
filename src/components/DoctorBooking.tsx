import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import Doctor, { OpeningHours } from '@/entities/Doctor';
import { CalendarDaysIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import BookingTimeSlots from './BookingTimeSlots';
import useStore from '@/store';

interface Props {
	doctor: Doctor;
}

const convertDateToString = (date: Date) => {
	const year = date.getFullYear().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return year + '-' + month + '-' + day;
};

const convertFloatTimeToTimeString = (stringTime: string): string => {
	const floatTime = parseFloat(stringTime);
	return convertFloatToTimeString(floatTime);
};

const convertFloatToTimeString = (floatTime: number): string => {
	const hours = Math.floor(floatTime);
	const minutes = Math.round((floatTime - hours) * 60);
	return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

const DoctorBooking = ({ doctor }: Props) => {
	const { addBooking } = useStore();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
		null
	);
	const dayOrder = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

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
					// slots.push(`${time}:00`);
					slots.push(convertFloatTimeToTimeString(time));
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
			<div className="flex flex-col gap-6">
				<div className="grid gap-2">
					<h2 className="text-2xl font-bold">Book an Appointment</h2>
					<p className="text-gray-500 dark:text-gray-400">
						Select a date and time to book your appointment with Dr.{' '}
						{doctor.name}.
					</p>
				</div>
				<div className="grid gap-4">
					<div className="font-medium">Select Booking Date</div>
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
									setSelectedTimeSlot(null);
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
						<BookingTimeSlots
							timeSlots={timeSlots}
							onSelectTimeSlot={setSelectedTimeSlot}
							selectedTimeSlot={selectedTimeSlot}
						/>
					</div>
					<Button
						className="w-full"
						size="lg"
						disabled={selectedTimeSlot === null}
						onClick={() => {
							addBooking({
								name: 'Yil',
								start: 17,
								doctorId: 'M2159',
								date: convertDateToString(selectedDate),
							});
						}}
					>
						Book Appointment
					</Button>
				</div>
			</div>
		</>
	);
};

export default DoctorBooking;
