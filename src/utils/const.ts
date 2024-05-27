export const DAY_ORDER_0 = {
	MON: 1,
	TUE: 2,
	WED: 3,
	THU: 4,
	FRI: 5,
	SAT: 6,
	SUN: 0,
};

export const DAY_ORDER_1: { [key: string]: number } = {
	MON: 1,
	TUE: 2,
	WED: 3,
	THU: 4,
	FRI: 5,
	SAT: 6,
	SUN: 7,
};

export const HOME_ROUTE_PATH = '/';
export const BOOKING_ROUTE_PATH = '/bookings';
export const DOCTOR_ROUTE_PATH = (doctorId: string) => `/doctors/${doctorId}`;
