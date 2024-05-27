import { Outlet } from 'react-router-dom';
const Layout = () => {
	return (
		<>
			<div className="max-w-6xl mx-auto p-4 lg:p-8">
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
