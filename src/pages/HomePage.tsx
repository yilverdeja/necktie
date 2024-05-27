/* eslint-disable no-mixed-spaces-and-tabs */
import useDoctors from '@/hooks/useDoctors';
import { Skeleton } from '@/components/ui/Skeleton';
import DoctorListItem from '@/components/DoctorListItem';

const HomePage = () => {
	const { doctors, loading, error } = useDoctors(true);
	const skeletons = [1, 2, 3, 4, 5];

	if (error)
		return (
			<section>
				<h1 className="text-3xl my-4">Error Finding Doctors</h1>
				<p className="text-lg py-2">Error Message: {error.message}</p>
			</section>
		);

	return (
		<section>
			<h1 className="text-3xl my-4">Find Doctors</h1>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				{loading
					? skeletons.map((skeleton) => (
							<div
								key={skeleton}
								className="flex items-center p-4 sm:p-6 gap-4 sm:gap-6"
							>
								<div className="flex-1 grid gap-1">
									<Skeleton className="h-8 max-w-60 min-w-40" />
									<Skeleton className="h-4 max-w-40 min-w-32" />
									<Skeleton className="h-12 max-w-52 min-w-40" />
								</div>
								<Skeleton className="w-40 h-10" />
							</div>
					  ))
					: doctors.map((doctor) => (
							<DoctorListItem key={doctor.id} doctor={doctor} />
					  ))}
			</div>
		</section>
	);
};

export default HomePage;
