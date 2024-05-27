import { create } from 'zustand';

import Doctor from '@/entities/Doctor';
import Booking from '@/entities/Booking';

import APIClient from './services/ApiClient';
const doctorsClient = new APIClient<Doctor>('/doctor');
const bookingsClient = new APIClient<Booking>('/booking');

interface StoreState {
	user: string;
	doctors: Doctor[];
	bookings: Booking[];
	userBookings: Booking[];
	fetchDoctors: () => Promise<void>;
	fetchDoctorById: (doctorId: string) => Promise<Doctor | undefined>;
	fetchBookings: () => Promise<void>;
	addBooking: (booking: Booking) => Promise<void>;
	cancelBooking: (bookingId: string) => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
	user: 'Yil',
	doctors: [],
	bookings: [],
	userBookings: [],
	fetchDoctors: async () => {
		const doctors = await doctorsClient.getAll({});
		set({ doctors });
	},
	fetchDoctorById: async (doctorId) => {
		const existingDoctor = get().doctors.find((doc) => doc.id === doctorId);
		if (existingDoctor) {
			return existingDoctor;
		}

		try {
			const doctor = await doctorsClient.get(doctorId);
			set({ doctors: [...get().doctors, doctor] });
			return doctor;
		} catch (error) {
			console.error('Failed to fetch doctor:', error);
			return undefined;
		}
	},
	fetchBookings: async () => {
		const bookings = await bookingsClient.getAll({});
		set({ bookings });
	},
	addBooking: async (booking) => {
		const newBooking = await bookingsClient.create(booking);
		console.log(newBooking);

		const { bookings } = get();
		console.log(booking);
		set({ bookings: [...bookings, booking] });
	},
	cancelBooking: async (bookingId) => {
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
