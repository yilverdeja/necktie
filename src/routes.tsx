import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import DoctorProfilePage from './pages/DoctorProfilePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/doctors/:id',
				element: <DoctorProfilePage />,
			},
		],
	},
]);

export default router;
