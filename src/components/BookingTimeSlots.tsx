import { Button } from '@/components/ui/Button';
import { TimeSlot } from '@/utils/helper';

interface Props {
	timeSlots: TimeSlot[];
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
				timeSlots.map((slot) => (
					<Button
						key={slot.slot}
						size="sm"
						variant={
							selectedTimeSlot === slot.slot
								? 'default'
								: 'outline'
						}
						onClick={() => {
							onSelectTimeSlot(slot.slot);
						}}
						disabled={!slot.isAvailable}
					>
						{slot.slot}
					</Button>
				))
			) : (
				<p className="text-red-500">There are no timeslots available</p>
			)}
		</div>
	);
};

export default BookingTimeSlots;
