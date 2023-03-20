import Link from 'next/link';
import Ad from '../components/Ad';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Header from '../components/Header';
import Container from '../components/Container';
import SampleServers from '../components/SampleServers';
import GiftIcon from '../assets/icons/gift.svg';
import InfoIcon from '../assets/icons/info.svg';

export default function Page() {
	return (
		<>
			<Navbar active="home" />
			<Container>
				<section>
					<hgroup>
						<Header size={1}>Minecraft Server Status</Header>
						<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search className="mt-5" />
				</section>
				<section>
					<div className="flex items-center gap-6 md:ml-6 mt-24">
						<GiftIcon width="28" height="28" className="hidden md:block" />
						<hgroup>
							<Header size={2}>Sample Servers</Header>
							<p className="text-lg font-light">A few sample servers to test out our service</p>
						</hgroup>
					</div>
					<SampleServers />
				</section>
				<section>
					<div className="flex items-center gap-6 md:ml-6 mt-12">
						<InfoIcon width="28" height="28" className="hidden md:block" />
						<hgroup>
							<Header size={2}>About Us</Header>
							<p className="text-xl font-light">A quick understanding of what we do</p>
						</hgroup>
					</div>
					<p className="mb-3 mt-5">This service was created after realizing the missing features of many other Minecraft server status websites, including services like <a href="https://mcsrvstat.us" className="link">mcsrvstat.us</a>. Their API and website was complex to navigate, and I found it easier to create my own service to fulfill this. This service is heavily focused on improving performance and optimizing latency when connecting to the server, that is why the API was built from the ground-up using the high performant Go language.</p>
					<p className="mb-3">Our service offers many features that others do not, such as raw, clean, or HTML formats of many values like the MOTD, version name, and sample player names. We also reduced the cache duration of every status down to only 1 minute. We intentionally chose not to use the query protocol, as it only slows down the time it takes to retrieve a Minecraft server status, and it does not provide any more relevant data than the more reliable status protocol does.</p>
					<p>We also offer an endpoint for quickly viewing the icon of any Java Edition Minecraft server. This makes it easy for server owners to display the continuously changing server icon on their own website without the hassle of updating their own code. Our service is entirely open source, and you can view it any time on our <a href="https://github.com/mcstatus-io" className="link">GitHub organization</a>. If you would like to use our API in your service, head over to the <Link href="/docs/v2" className="link">API documentation</Link> and easily implement our standardized API in any code environment.</p>
				</section>
				<Ad className="mt-6" />
			</Container>
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: JSON.stringify([
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						'itemListElement': [
							{
								'@type': 'ListItem',
								'position': 1,
								'name': 'Home',
								'item': 'https://mcstatus.io'
							}
						]
					},
					{
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'url': 'https://mcstatus.io',
						'potentialAction': {
							'@type': 'SearchAction',
							'target': {
								'@type': 'EntryPoint',
								'urlTemplate': 'https://mcstatus.io/status/java/{host}'
							},
							'query-input': 'required name=host'
						}
					}
				])
			}} />
		</>
	);
}