import { create } from 'zustand';

import Doctor from '@/entities/Doctor';
import Booking from '@/entities/Booking';
import doctors from './data/doctors';

interface StoreState {
	doctors: Doctor[];
	bookings: Booking[];
	userBookings: Booking[];
	fetchDoctors: () => void;
	fetchBookings: () => void;
	addBooking: (booking: Booking) => void;
	cancelBooking: (bookingId: string) => void;
}

const useStore = create<StoreState>((set, get) => ({
	doctors: [],
	bookings: [],
	userBookings: [],
	fetchDoctors: async () => {
		setTimeout(() => {
			set({ doctors: doctors });
		}, 2000);
	},
	fetchBookings: async () => {
		setTimeout(() => {
			set({ bookings: [] });
		}, 2000);
	},
	addBooking: (booking) => {
		const { bookings } = get();
		console.log(booking);
		set({ bookings: [...bookings, booking] });
	},
	cancelBooking: (bookingId) => {
		const { bookings } = get();
		const updatedBookings = bookings.map((booking) =>
			booking.id === bookingId
				? { ...booking, status: 'cancel' }
				: booking
		);
		set({ bookings: updatedBookings });
	},
}));

export default useStore;
