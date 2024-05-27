import { Card } from '@/components/ui/Card';
import Booking from '@/entities/Booking';
import { Button } from '@/components/ui/Button';
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
} from '@/components/ui/AlertDialog';
import { useBookings } from '@/hooks/useBookings';
import { formatAddress, formatDateTime } from '@/utils/helper';

interface Props {
	booking: Booking;
}

const BookingListItem = ({ booking }: Props) => {
	const { doctorsById } = useStore();
	const { cancelBooking } = useBookings(false);
	const doctor = doctorsById[booking.doctorId];

	if (!doctor) return <p>Doctor information is not available</p>;

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
					{formatAddress(doctor.address)}
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
