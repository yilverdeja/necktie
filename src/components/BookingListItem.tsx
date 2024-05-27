import { Card } from '@/components/ui/card';
import Booking from '@/entities/Booking';
import { Button } from './ui/button';
import useStore from '@/store';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
	booking: Booking;
}

const formatDateTime = (dateString: string, floatTime: number) => {
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

const BookingListItem = ({ booking }: Props) => {
	const { cancelBooking, doctorsById } = useStore();
	const doctor = doctorsById[booking.doctorId];
	return (
		<Card className="flex flex-col justify-center p-4 sm:p-6 gap-4 sm:gap-6">
			<div className="flex-1 grid gap-1">
				<h3 className="font-semibold text-lg">
					{formatDateTime(booking.date!, booking.start!)}
				</h3>
				<p className="text-md text-gray-500 dark:text-gray-400">
					Dr. {doctor.name}
				</p>
				<p className="text-muted-foreground text-sm dark:text-gray-400">
					{doctor.address.line_1}
					{', '}
					{doctor.address.line_2}
					{', '}
					{doctor.address.district}
				</p>
			</div>
			<div>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						{booking.status === 'confirmed' ? (
							<Button
								variant="destructive"
								className="shrink-0"
								size="sm"
							>
								Cancel Booking
							</Button>
						) : (
							<Button
								variant="outline"
								className="shrink-0"
								size="sm"
								disabled
							>
								Cancelled
							</Button>
						)}
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will cancel
								your booking with Dr. {doctor.name} at{' '}
								{formatDateTime(booking.date!, booking.start!)}.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									console.log('cancel booking');
									cancelBooking(booking.id!)
										.then(() => console.log('ok'))
										.catch((err) => console.log(err));
								}}
							>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</Card>
	);
};

export default BookingListItem;
