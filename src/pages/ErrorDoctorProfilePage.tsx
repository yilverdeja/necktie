import { Link } from 'react-router-dom';

const ErrorDoctorProfilePage = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-[80vh] gap-6">
				<div className="space-y-2 text-center">
					<h1 className="text-4xl font-bold">
						Oops! Doctor wasn't found!
					</h1>
					<p className="text-gray-500 dark:text-gray-400 max-w-md">
						The doctor you're looking for doesn't exist.
					</p>
				</div>
				<div className="flex gap-4">
					<Link
						className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
						to="/"
					>
						Find Doctors
					</Link>
					<Link
						className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
						to="/bookings"
					>
						View Bookings
					</Link>
				</div>
			</div>
		</>
	);
};

export default ErrorDoctorProfilePage;
