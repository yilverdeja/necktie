export default interface Booking {
	id: string;
	name: string;
	start: number;
	doctorId: string;
	date: string;
	status: 'cancelled' | 'confirmed';
}
