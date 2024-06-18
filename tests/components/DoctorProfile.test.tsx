import DoctorProfile from '@/components/DoctorProfile';
import Doctor, { DoctorAddress, OpeningHours } from '@/entities/Doctor';
import { render, screen } from '@testing-library/react';

describe('DoctorProfile', () => {
	it('should', () => {
		const opening_hours: OpeningHours[] = [
			{ start: '', end: '', isClosed: true, day: 'MON' },
			{ start: '9.00', end: '19.00', isClosed: false, day: 'TUE' },
			{ start: '9.00', end: '19.00', isClosed: false, day: 'WED' },
			{ start: '9.00', end: '19.00', isClosed: false, day: 'THU' },
			{ start: '11.00', end: '16.00', isClosed: false, day: 'FRI' },
			{ start: '9.00', end: '19.00', isClosed: true, day: 'SAT' },
			{ start: '9.00', end: '19.00', isClosed: true, day: 'SUN' },
		];
		const address: DoctorAddress = {
			line_1: '1',
			line_2: '2',
			district: '3',
		};
		const doctor: Doctor = {
			id: '1',
			name: 'Elon Musk',
			description: 'Description',
			address,
			opening_hours,
		};

		render(<DoctorProfile doctor={doctor} />);

		expect(screen.getByText('EM')).toBeInTheDocument();
		expect(screen.getByText(/dr. elon musk/i)).toBeInTheDocument();

		screen.debug();
	});
});
