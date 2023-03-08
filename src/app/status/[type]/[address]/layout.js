import Navbar from '../../../../components/Navbar';
import Container from '../../../../components/Container';
import Header from '../../../../components/Header';
import Search from '../../../../components/Search';
import Ad from '../../../../components/Ad';

export default function RootLayout({ children, params: { type, address } }) {
	return (
		<>
			<Navbar />
			<Container>
				<section>
					<hgroup>
						<Header size={1}>Minecraft Server Status</Header>
						<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search type={type} host={address} className="mt-5" />
				</section>
				{children}
				<Ad className="mt-4" />
			</Container>
		</>
	);
}
