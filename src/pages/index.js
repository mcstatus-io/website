import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Image from 'next/image';
import { exampleServers } from '../assets/servers';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Container from '../components/Container';
import Ad from '../components/Ad';
import wave from '../assets/img/wave.svg';
import Header from '../components/Header';
import BoxLink from '../components/BoxLink';

export default function Home({ javaServers, bedrockServers }) {
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
			<div className="bg-[#232323]">
				<Container className="pt-24 pb-12">
					<Header size={1} text="Minecraft Server Status" />
					<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					<Search className="mt-4" />
				</Container>
			</div>
			<Image src={wave} alt="Wave" className="w-full h-32" priority />
			<Container className="mb-12 lg:mb-24">
				<Header size={2} text="Sample Servers" className="mt-12" />
				<p className="text-lg font-light">A few sample servers to test out our service</p>
				<div className="md:columns-2 gap-3 mt-4">
					<div>
						{
							javaServers.map((server, index) => (
								<BoxLink href={`/status/java/${server.address}`} className="mb-3" key={index}>
									<span className="px-2 py-1 rounded mr-3 bg-green-700 text-xs">Java</span>
									<code>{server.address}</code>
								</BoxLink>
							))
						}
					</div>
					<div>
						{
							bedrockServers.map((server, index) => (
								<BoxLink href={`/status/bedrock/${server.address}`} className="mb-3" key={index}>
									<span className="px-2 py-1 rounded mr-3 bg-blue-600 text-xs">Bedrock</span>
									<code>{server.address}</code>
								</BoxLink>
							))
						}
					</div>
				</div>
				<Header size={2} text="About Us" className="mt-12" />
				<p className="text-xl font-light">A quick understanding of what we do</p>
				<p className="mb-3 mt-4">This service was created after realizing the missing features of many other Minecraft server status websites, including services like <a href="https://mcsrvstat.us" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">mcsrvstat.us</a>. Their API and website was complex to navigate, and I found it easier to create my own service to fulfill this. This service is heavily focused on improving performance and optimizing latency when connecting to the server, that is why the API was built from the ground-up using the high performant Go language.</p>
				<p className="mb-3">Our service offers many features that others do not, such as raw/clean/HTML formats of many values like the MOTD, version name, and sample player names. We also reduced the cache duration of every status down to only 1 minute. We intentionally chose not to use the query protocol, as it only slows down the time it takes to retrieve a Minecraft server status, and it does not provide any more relevant data than the more reliable status protocol does.</p>
				<p>We also offer an endpoint for quickly viewing the icon of any Java Edition Minecraft server. This makes it easy for server owners to display the continuously changing server icon on their own website without the hassle of updating their own code. Our service is entirely open source, and you can view it any time on our <a href="https://github.com/mcstatus-io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">GitHub organization</a>. If you would like to use our API in your service, head over to the <Link href="/docs/v2" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">API documentation</Link> and easily implement our standardized API in any code environment.</p>
				<Ad className="mt-6" />
			</Container>
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
	javaServers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	bedrockServers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export function getServerSideProps() {
	const javaServers = exampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	return { props: { javaServers, bedrockServers } };
}