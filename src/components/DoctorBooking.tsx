import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/Popover';
import Doctor, { OpeningHours } from '@/entities/Doctor';
import { CalendarDaysIcon, ChevronDownIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import BookingTimeSlots from '@/components/BookingTimeSlots';
import useStore from '@/store';
import { useToast } from '@/components/ui/useToast';
import { ToastAction } from '@/components/ui/Toast';
import { useBookings } from '@/hooks/useBookings';
import { DAY_ORDER_0 } from '@/utils/const';
import {
	TimeSlot,
	convertDateToString,
	convertFloatToTimeString,
	convertTimeStringToFloat,
} from '@/utils/helper';

interface Props {
	doctor: Doctor;
}

const DoctorBooking = ({ doctor }: Props) => {
	const { user, bookings } = useStore();
	const { addBooking, cancelBooking, loading } = useBookings(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
		null
	);
	const [error, setError] = useState('');
	const { toast } = useToast();

	const doctorBookings = bookings.filter(
		(booking) =>
			booking.doctorId === doctor.id && booking.status === 'confirmed'
	);

	const generateTimeSlots = useCallback(
		(hours: OpeningHours[], day: number): TimeSlot[] => {
			const slots: TimeSlot[] = [];
			hours.forEach((hour) => {
				if (!hour.isClosed && DAY_ORDER_0[hour.day] === day) {
					for (
						let time = parseFloat(hour.start);
						time < parseFloat(hour.end);
						time++
					) {
						const isBooked =
							doctorBookings.filter(
								(booking) =>
									booking.date ===
										convertDateToString(selectedDate) &&
									booking.start === time
							).length > 0;

						const now = new Date();
						const isBeforeNow =
							selectedDate &&
							selectedDate.getFullYear() === now.getFullYear() &&
							selectedDate.getMonth() === now.getMonth() &&
							selectedDate.getDate() === now.getDate() &&
							now.getHours() + now.getMinutes() / 60 > time;

						slots.push({
							slot: convertFloatToTimeString(time),
							isAvailable: !isBooked && !isBeforeNow,
						});
					}
				}
			});
			return slots;
		},
		[selectedDate, doctorBookings]
	);
	// gets current time

	const timeSlots = generateTimeSlots(
		doctor.opening_hours,
		selectedDate.getDay()
	);

	// Check if selectedDate is today's date
	const isToday = useCallback(() => {
		const today = new Date();
		return (
			selectedDate.getMonth() === today.getMonth() &&
			selectedDate.getFullYear() === today.getFullYear() &&
			selectedDate.getDate() === today.getDate()
		);
	}, [selectedDate]);

	// Handlers for previous and next date buttons
	const handlePrev = useCallback(() => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
		setSelectedDate(newDate);
	}, [selectedDate]);

	const handleNext = useCallback(() => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		setSelectedDate(newDate);
	}, [selectedDate]);

	// TODO: manage loading and error states better
	if (error) return <p>{error}</p>;

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

					<div className="flex flex-row justify-end items-center gap-1">
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
										setError('');
									}}
									disabled={{ before: new Date() }}
									mode="single"
									required
								/>
							</PopoverContent>
						</Popover>
						<Button
							size="sm"
							disabled={isToday()}
							onClick={handlePrev}
						>
							Prev
						</Button>
						<Button size="sm" onClick={handleNext}>
							Next
						</Button>
					</div>
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
							setError('');
							addBooking({
								name: user,
								start: convertTimeStringToFloat(
									selectedTimeSlot!
								),
								doctorId: doctor.id,
								date: convertDateToString(selectedDate),
							})
								.then((bookingId) => {
									setSelectedTimeSlot(null);
									toast({
										title: 'Appointment Booked!',
										description: `${selectedDate.toLocaleString()} with Dr. ${
											doctor.name
										}`,
										action: (
											<ToastAction
												altText="Cancel booking"
												onClick={() => {
													console.log(
														'cancel booking'
													);
													cancelBooking(bookingId!);
												}}
											>
												Cancel
											</ToastAction>
										),
									});
								})
								.catch((err) => {
									const errMessage = err.response.data;
									toast({
										variant: 'destructive',
										title: 'Error making booking!',
										description:
											errMessage === 'invalid booking'
												? 'Unable to make a booking at this slot'
												: errMessage,
									});
									setError(errMessage);
								});
						}}
					>
						{loading ? 'Loading...' : 'Book Appointment'}
					</Button>
				</div>
			</div>
		</>
	);
};

export default DoctorBooking;
