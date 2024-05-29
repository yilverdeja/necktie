import { create } from 'zustand';

import Doctor from '@/entities/Doctor';
import Booking from '@/entities/Booking';

interface StoreState {
	user: string;
	doctorsById: { [key: string]: Doctor };
	doctors: Doctor[];
	doctorsLoaded: boolean;
	bookings: Booking[];
	setUser: (newUser: string) => void;
	setDoctors: (doctors: Doctor[]) => void;
	setBookings: (bookings: Booking[]) => void;
	setDoctor: (doctor: Doctor) => void;
}

const useStore = create<StoreState>((set) => ({
	user: 'Yil',
	doctorsById: {},
	doctors: [],
	doctorsLoaded: false,
	bookings: [],
	setUser: (newUser) => {
		set({ user: newUser });
	},
	setDoctors: (doctors) => {
		const doctorsById = doctors.reduce(
			(acc, doctor) => ({
				...acc,
				[doctor.id]: doctor,
			}),
			{}
		);
		set({ doctors, doctorsById, doctorsLoaded: true });
	},

	setDoctor: (doctor) =>
		set((state) => ({
			doctorsById: { ...state.doctorsById, [doctor.id]: doctor },
			doctors: state.doctors.some((d) => d.id === doctor.id)
				? state.doctors.map((d) => (d.id === doctor.id ? doctor : d))
				: [...state.doctors, doctor],
		})),

	setBookings: (bookings) => set({ bookings }),
}));

export default useStore;
