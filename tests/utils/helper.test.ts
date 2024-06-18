import { DoctorAddress } from '@/entities/Doctor';
import {
	convertFloatTimeToTimeString,
	formatAddress,
	formatDayRange,
} from '@/utils/helper';

describe('helper functions', () => {
	describe('convertFloatTimeToTimeString', () => {
		it.each([
			{ floatStr: '19', timeStr: '19:00' },
			{ floatStr: '18.5', timeStr: '18:30' },
			{ floatStr: '1.25', timeStr: '1:15' },
			{ floatStr: '12.75', timeStr: '12:45' },
		])(
			'should convert the float $floatStr to a time format of $timeStr',
			({ floatStr, timeStr }) => {
				const result = convertFloatTimeToTimeString(floatStr);
				expect(result).toEqual(timeStr);
			}
		);
	});

	describe.todo('groupOpeningHours', () => {});

	describe('formatDayRange', () => {
		it.each([
			{ input: [], output: '' },
			{ input: ['mon'], output: 'mon' },
			{ input: ['mon', 'tue'], output: 'mon-tue' },
			{ input: ['mon', 'tue', 'wed'], output: 'mon-wed' },
		])('should format $input to $output', ({ input, output }) => {
			expect(formatDayRange(input)).toEqual(output);
		});
	});

	describe('formatAddress', () => {
		it('should format a Doctor Address correctly', () => {
			const doctorAddress: DoctorAddress = {
				line_1: 'line_1',
				line_2: 'line_2',
				district: 'district',
			};
			expect(formatAddress(doctorAddress)).toEqual(
				'line_1, line_2, district'
			);
		});
	});

	describe.todo('formatDateTime', () => {});

	describe.todo('convertDateToString', () => {});

	describe.todo('convertFloatToTimeString', () => {});

	describe.todo('convertTimeStringToFloat', () => {});

	describe.todo('getTimestamp', () => {});
});
