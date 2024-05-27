import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';

const Layout = () => {
	return (
		<>
			<Navbar />
			<main className="max-w-6xl mx-auto p-4 lg:p-8">
				<Outlet />
			</main>
			<Toaster />
		</>
	);
};

export default Layout;
