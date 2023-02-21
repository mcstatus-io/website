import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Container from '../components/Container';
import Ad from '../components/Ad';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { exampleServers } from '../assets/servers';
import GiftIcon from '!!@svgr/webpack!../assets/icons/gift.svg';
import InfoIcon from '!!@svgr/webpack!../assets/icons/info.svg';

export default function Home({ servers }) {
	return (
		<>
			<Head>
				<title>Minecraft Server Status - Quickly retrieve the status of any Minecraft server</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Minecraft Server Status - Quickly retrieve the status of any Minecraft server" />
				<meta name="description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io" />
				<meta property="og:title" content="Minecraft Server Status - Quickly retrieve the status of any Minecraft server" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io" />
			</Head>
			<Navbar active="home" />
			<Container className="py-12 lg:pt-24" noMargin>
				<section>
					<hgroup>
						<Header size={1}>Minecraft Server Status</Header>
						<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search className="mt-5" />
				</section>
			</Container>
			<Container className="mb-12 lg:mb-24 mt-0 lg:mt-0">
				<section>
					<div className="flex items-center gap-6 ml-6 mt-12">
						<GiftIcon width="28" height="28" />
						<hgroup>
							<Header size={2}>Sample Servers</Header>
							<p className="text-lg font-light">A few sample servers to test out our service</p>
						</hgroup>
					</div>
					<ul className="flex gap-3 flex-wrap mt-5">
						{
							servers.map((server, index) => (
								<li className="md:basis-[calc(50%-0.75rem)] basis-full" key={index}>
									<Link href={`/status/${server.type}/${server.address}`} className="button block p-5">
										<div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 justify-between">
											<span>
												<span className={`px-2 py-1 rounded mr-3 ${server.type === 'java' ? 'bg-green-700 contrast-more:bg-green-900' : 'bg-blue-600 contrast-more:bg-blue-900'} text-xs text-white`}>{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
												<span className="font-bold">{server.name}</span>
											</span>
											<code className="text-sm">{server.address}</code>
										</div>
									</Link>
								</li>
							))
						}
					</ul>
				</section>
				<section>
					<div className="flex items-center gap-6 ml-6 mt-12">
						<InfoIcon width="28" height="28" />
						<hgroup>
							<Header size={2}>About Us</Header>
							<p className="text-xl font-light">A quick understanding of what we do</p>
						</hgroup>
					</div>
					<p className="mb-3 mt-5">This service was created after realizing the missing features of many other Minecraft server status websites, including services like <a href="https://mcsrvstat.us" className="link">mcsrvstat.us</a>. Their API and website was complex to navigate, and I found it easier to create my own service to fulfill this. This service is heavily focused on improving performance and optimizing latency when connecting to the server, that is why the API was built from the ground-up using the high performant Go language.</p>
					<p className="mb-3">Our service offers many features that others do not, such as raw/clean/HTML formats of many values like the MOTD, version name, and sample player names. We also reduced the cache duration of every status down to only 1 minute. We intentionally chose not to use the query protocol, as it only slows down the time it takes to retrieve a Minecraft server status, and it does not provide any more relevant data than the more reliable status protocol does.</p>
					<p>We also offer an endpoint for quickly viewing the icon of any Java Edition Minecraft server. This makes it easy for server owners to display the continuously changing server icon on their own website without the hassle of updating their own code. Our service is entirely open source, and you can view it any time on our <a href="https://github.com/mcstatus-io" className="link">GitHub organization</a>. If you would like to use our API in your service, head over to the <Link href="/docs/v2" className="link">API documentation</Link> and easily implement our standardized API in any code environment.</p>
				</section>
				<Ad className="mt-6" />
			</Container>
			<Footer />
			<Script type="application/ld+json" strategy="afterInteractive" id="google-structured">
				{`
[
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://mcstatus.io"
			}
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"url": "https://mcstatus.io",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://mcstatus.io/status/java/{host}"
			},
			"query-input": "required name=host"
		}
	}
]
				`}
			</Script>
		</>
	);
}

Home.propTypes = {
	user: PropTypes.object,
	servers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export function getServerSideProps() {
	const servers = [];

	const javaServers = exampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	for (let i = 0; i < 8; i++) {
		if (i % 2 === 0) {
			servers.push(javaServers[i / 2]);
		} else {
			servers.push(bedrockServers[(i - 1) / 2]);
		}
	}

	return { props: { servers } };
}