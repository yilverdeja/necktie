import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/pages/Layout';
import HomePage from '@/pages/HomePage';
import ErrorPage from '@/pages/ErrorPage';
import DoctorProfilePage from '@/pages/DoctorProfilePage';
import ManageBookingsPage from '@/pages/ManageBookingsPage';
import ErrorDoctorProfilePage from '@/pages/ErrorDoctorProfilePage';
import {
	BOOKING_ROUTE_PATH,
	DOCTOR_ROUTE_PATH,
	HOME_ROUTE_PATH,
} from '@/utils/const';

const router = createBrowserRouter([
	{
		path: HOME_ROUTE_PATH,
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: DOCTOR_ROUTE_PATH(':id'),
				errorElement: <ErrorDoctorProfilePage />,
				element: <DoctorProfilePage />,
			},
			{
				path: BOOKING_ROUTE_PATH,
				element: <ManageBookingsPage />,
			},
		],
	},
]);

export default router;
