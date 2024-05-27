import { Button } from './ui/button';

interface Props {
	timeSlots: string[];
}

const BookingTimeSlots = ({ timeSlots }: Props) => {
	return (
		<div className="grid sm:grid-cols-2 gap-2">
			{timeSlots.map((slot, index) => (
				<Button key={index} size="sm" variant="outline">
					{slot}
				</Button>
			))}
		</div>
	);
};

export default BookingTimeSlots;
