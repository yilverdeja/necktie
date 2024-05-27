import { CircleUser, Menu, SparkleIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import useStore from '@/store';
import { BOOKING_ROUTE_PATH, HOME_ROUTE_PATH } from '@/utils/const';

const Navbar = () => {
	const { user, setUser } = useStore();
	const { pathname } = useLocation();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					to={HOME_ROUTE_PATH}
					className="flex items-center gap-2 text-lg font-semibold md:text-base"
				>
					<SparkleIcon className="h-6 w-6" />
					<span className="sr-only">Necktie</span>
				</Link>
				<Link
					to={HOME_ROUTE_PATH}
					className={
						pathname === HOME_ROUTE_PATH
							? 'text-foreground transition-colors hover:text-foreground'
							: 'text-muted-foreground transition-colors hover:text-foreground'
					}
				>
					Doctors
				</Link>
				<Link
					to={BOOKING_ROUTE_PATH}
					className={
						pathname === BOOKING_ROUTE_PATH
							? 'text-foreground transition-colors hover:text-foreground'
							: 'text-muted-foreground transition-colors hover:text-foreground'
					}
				>
					Bookings
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 sm:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							to={HOME_ROUTE_PATH}
							className="flex items-center gap-2 text-lg font-semibold md:text-base"
						>
							<SparkleIcon className="h-6 w-6" />
							<span className="sr-only">Necktie</span>
						</Link>
						<Link
							to={HOME_ROUTE_PATH}
							className={
								pathname === HOME_ROUTE_PATH
									? 'text-foreground transition-colors hover:text-foreground'
									: 'text-muted-foreground transition-colors hover:text-foreground'
							}
						>
							Doctors
						</Link>
						<Link
							to={BOOKING_ROUTE_PATH}
							className={
								pathname === BOOKING_ROUTE_PATH
									? 'text-foreground transition-colors hover:text-foreground'
									: 'text-muted-foreground transition-colors hover:text-foreground'
							}
						>
							Bookings
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<div className="ml-auto flex-initial">
					<p>{user}</p>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full"
						>
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Switch Users</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							disabled={user === 'Yil'}
							onClick={() => setUser('Yil')}
						>
							Yil
						</DropdownMenuItem>
						<DropdownMenuItem
							disabled={user === 'Bobby'}
							onClick={() => setUser('Bobby')}
						>
							Bobby
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Navbar;
