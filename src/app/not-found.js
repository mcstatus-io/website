import Link from 'next/link';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import ChevronsLeft from '@/assets/icons/chevrons-left.svg';

export const metadata = {
	title: 'Page Not Found - Minecraft Server Status'
};

export default function NotFound() {
	return (
		<>
			<Navbar />
			<Container>
				<section>
					<h1 className="h1">Not Found</h1>
					<p className="text-xl mt-1">The page that you requested could not be found, please check the address and try again.</p>
					<Link href="/" className="inline-block button mt-5 px-4 py-3">
						<div className="flex items-center gap-2">
							<ChevronsLeft width="24" height="24" />
							<span>Return Home</span>
						</div>
					</Link>
				</section>
			</Container>
		</>
	);
}