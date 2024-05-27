import { create } from 'zustand';

import Doctor from '@/entities/Doctor';
import Booking from '@/entities/Booking';

import APIClient from './services/ApiClient';
const doctorsClient = new APIClient<Doctor>('/doctor');
const bookingsClient = new APIClient<Booking>('/booking');

interface StoreState {
	doctors: Doctor[];
	bookings: Booking[];
	userBookings: Booking[];
	fetchDoctors: () => Promise<void>;
	fetchBookings: () => Promise<void>;
	addBooking: (booking: Booking) => void;
	cancelBooking: (bookingId: string) => void;
}

const useStore = create<StoreState>((set, get) => ({
	doctors: [],
	bookings: [],
	userBookings: [],
	fetchDoctors: async () => {
		const doctors = await doctorsClient.getAll({});
		set({ doctors });
	},
	fetchBookings: async () => {
		const bookings = await bookingsClient.getAll({});
		set({ bookings });
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
