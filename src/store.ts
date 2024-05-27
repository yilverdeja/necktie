import { create } from 'zustand';

import Doctor from '@/entities/Doctor';
import Booking from '@/entities/Booking';

import APIClient from './services/ApiClient';
const doctorsClient = new APIClient<Doctor>('/doctor');
const bookingsClient = new APIClient<Booking>('/booking');

interface StoreState {
	user: string;
	doctorsById: object;
	doctors: Doctor[];
	bookings: Booking[];
	userBookings: Booking[];
	fetchDoctors: () => Promise<void>;
	fetchDoctorById: (doctorId: string) => Promise<Doctor | undefined>;
	fetchBookings: () => Promise<void>;
	addBooking: (booking: Booking) => Promise<string | undefined>;
	cancelBooking: (bookingId: string) => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
	user: 'Yil',
	doctorsById: {},
	doctors: [],
	bookings: [],
	userBookings: [],
	fetchDoctors: async () => {
		const doctors = await doctorsClient.getAll({});
		if (!doctors) return;
		const doctorsById = doctors.reduce((acc, doctor) => {
			acc[doctor.id] = doctor;
			return acc;
		}, {});
		set({ doctors, doctorsById });
	},
	fetchDoctorById: async (doctorId) => {
		const existingDoctor = get().doctors.find((doc) => doc.id === doctorId);
		if (existingDoctor) {
			return existingDoctor;
		}

		try {
			const doctor = await doctorsClient.get(doctorId);
			set({
				doctors: [...get().doctors, doctor],
				doctorsById: {
					...get().doctorsById,
					[doctorId]: doctor,
				},
			});
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
		if (!newBooking) return;
		set({ bookings: [...get().bookings, newBooking] });
		return newBooking.id;
	},
	cancelBooking: async (bookingId) => {
		const updatedBooking = await bookingsClient.patch(bookingId, {
			status: 'cancelled',
		});
		if (!updatedBooking) return;

		const { bookings } = get();
		const updatedBookings = bookings.map((booking) =>
			booking.id === bookingId
				? { ...booking, status: 'cancelled' }
				: booking
		);
		set({ bookings: updatedBookings });
	},
}));

export default useStore;
