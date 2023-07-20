import { notFound } from 'next/navigation';
import Ad from '@/components/Ad';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';

export default function RootLayout({ children, params: { type, address } }) {
	if (type !== 'java' && type !== 'bedrock') return notFound();

	return (
		<>
			<Navbar />
			<Container>
				<section>
					<hgroup>
						<h1 className="h1">Minecraft Server Status</h1>
						<p className="text-2xl font-light mt-2 text-neutral-300">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search type={type} host={decodeURIComponent(address)} className="mt-5" />
				</section>
				{children}
				<Ad className="mt-4" />
			</Container>
		</>
	);
}
