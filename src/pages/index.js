import React from 'react';
import Link from 'next/link';
import { exampleServers } from '../assets/servers';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Search from '../components/Search';
import Ad from '../components/Ad';

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
			<Header active="home" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<h1 className="text-4xl lg:text-5xl font-black">Minecraft Server Status</h1>
				<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
				<Search />
				<h2 className="text-2xl lg:text-3xl font-black mt-12">Sample Servers</h2>
				<p className="text-xl font-light">A few sample servers to test out our service</p>
				<div className="md:columns-2 gap-4 mt-4">
					<div>
						{
							javaServers.map((server, index) => (
								<Link href={`/status/java/${server.address}`} key={index}>
									<a className="block p-5 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 rounded-md mb-4">
										<span className="px-2 py-1 rounded mr-3 bg-green-700 text-xs">Java</span>
										<code>{server.address}</code>
									</a>
								</Link>
							))
						}
					</div>
					<div>
						{
							bedrockServers.map((server, index) => (
								<Link href={`/status/bedrock/${server.address}`} key={index}>
									<a className="block p-5 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-150 rounded-md mb-4">
										<span className="px-2 py-1 rounded mr-3 bg-blue-600 text-xs">Bedrock</span>
										<code>{server.address}</code>
									</a>
								</Link>
							))
						}
					</div>
				</div>
				<h2 className="text-2xl lg:text-3xl font-black mt-12">About Us</h2>
				<p className="text-xl font-light">A quick understanding of what we do</p>
				<p className="mb-3 mt-4">This service was created after realizing the missing features of many other Minecraft server status websites, including services like <a href="https://mcsrvstat.us" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">mcsrvstat.us</a>. Their API and website was complex to navigate, and I found it easier to create my own service to fulfill this. This service is heavily focused on improving performance and optimizing latency when connecting to the server, that is why the API was built from the ground-up using the high performant Go language.</p>
				<p className="mb-3">Our service offers many features that others do not, such as raw/clean/HTML formats of many values like the MOTD, version name, and sample player names. We also reduced the cache duration of every status down to only 1 minute. We intentionally chose not to use the query protocol, as it only slows down the time it takes to retrieve a Minecraft server status, and it does not provide any more relevant data than the more reliable status protocol does.</p>
				<p>We also offer an endpoint for quickly viewing the icon of any Java Edition Minecraft server. This makes it easy for server owners to display the continuously changing server icon on their own website without the hassle of updating their own code. Our service is entirely open source, and you can view it any time on our <a href="https://github.com/mcstatus-io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">GitHub organization</a>. If you would like to use our API in your service, head over to the <Link href="/docs/v2"><a className="text-blue-500 hover:text-blue-400 transition-colors duration-150">API documentation</a></Link> and easily implement our standardized API in any code environment.</p>
				<Ad className="mt-6" />
			</div>
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