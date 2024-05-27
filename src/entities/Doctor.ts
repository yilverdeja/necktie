interface DoctorAddress {
	line_1: string;
	line_2: string;
	district: string;
}

export interface OpeningHours {
	start: string;
	end: string;
	isClosed: boolean;
	day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
}

export default interface Doctor {
	id: string;
	name: string;
	description: string;
	address: DoctorAddress;
	opening_hours: OpeningHours[];
}
