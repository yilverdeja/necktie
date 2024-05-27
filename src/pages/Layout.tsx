import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
const Layout = () => {
	return (
		<>
			<div className="max-w-6xl mx-auto p-4 lg:p-8">
				<Outlet />
			</div>
			<Toaster />
		</>
	);
};

export default Layout;
