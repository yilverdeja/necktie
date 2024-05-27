import { Button } from './ui/button';

interface Props {
	timeSlots: string[];
	selectedTimeSlot: string | null;
	onSelectTimeSlot: (selectedSlot: string) => void;
}

const BookingTimeSlots = ({
	timeSlots,
	onSelectTimeSlot,
	selectedTimeSlot,
}: Props) => {
	return (
		<div className="grid sm:grid-cols-2 gap-2">
			{timeSlots.length > 0 ? (
				timeSlots.map((slot, index) => (
					<Button
						key={index}
						size="sm"
						variant={
							selectedTimeSlot === slot ? 'default' : 'outline'
						}
						onClick={() => onSelectTimeSlot(slot)}
					>
						{slot}
					</Button>
				))
			) : (
				<p className="text-red-500">There are no timeslots available</p>
			)}
		</div>
	);
};

export default BookingTimeSlots;
