import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { exampleServers } from '../assets/servers';
import StatusLayout from '../layouts/StatusLayout';
import Ad from '../components/Ad';
import rightArrow from '../assets/icons/arrow-right.svg';
import formatDuration from '../util/formatDuration';

export default function Home({ servers }) {
	const { pathname } = useRouter();

	return (
		<>
			<Head>
				<title>Minecraft Server Status - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Minecraft Server Status" />
				<meta name="description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content="Minecraft Server Status" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io" />
			</Head>
			<StatusLayout>
				<div className="heading-group">
					<h2 className="title is-size-4 has-text-weight-semibold">Sample Servers</h2>
				</div>
				<div className="columns is-multiline">
					{
						servers.map((server, index) => (
							<div className="column py-2 is-6" key={index}>
								<Link href={`/status/${server.type}/${server.address}`}>
									<a className="box">
										<p className="has-text-white">
											<span className="tag is-link mr-2">{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
											<code>{server.address}</code>
										</p>
										<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" priority />
									</a>
								</Link>
							</div>
						))
					}
				</div>
				<div className="heading-group">
					<h2 className="title is-size-4 has-text-weight-semibold">Why use mcstatus.io?</h2>
				</div>
				<p className="mb-3">This service was created after realizing the missing features of many other Minecraft server status websites, including services like <a href="https://mcsrvstat.us">mcsrvstat.us</a>. Their API and website was complex to navigate, and I found it easier to create my own service to fulfill this. This service is heavily focused on improving performance and optimizing latency when connecting to the server, that is why the API was built from the ground-up using the high performant Go language.</p>
				<p className="mb-3">Our service offers many features that others do not, such as raw/clean/HTML formats of many values like the MOTD, version name, and sample player names. We also reduced the cache duration of every status down to only {formatDuration(parseInt(process.env.NEXT_PUBLIC_CACHE_TIME) * 1000)}. We intentionally chose not to use the query protocol, as it only slows down the time it takes to retrieve a Minecraft server status, and it does not provide any more relevant data than the more reliable status protocol does.</p>
				<p>We also offer an endpoint for quickly viewing the icon of any Java Edition Minecraft server. This makes it easy for server owners to display the continuously changing server icon on their own website without the hassle of updating their own code. Our service is entirely open source, and you can view it any time on our <a href="https://github.com/mcstatus-io">GitHub organization</a>. If you would like to use our API in your service, head over to the <Link href="/docs/v2"><a>API documentation</a></Link> and easily implement our standardized API in any code environment.</p>
				<Ad className="mt-4" />
			</StatusLayout>
			<Script id="structured-data-1" type="application/ld+json">
				{`
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
					}
				`}
			</Script>
			<Script id="structured-data-2" type="application/ld+json">
				{`
					{
						"@context": "https://schema.org",
						"@type": "WebSite",
						"url": "https://mcstatus.io/",
						"potentialAction": {
							"@type": "SearchAction",
							"target": {
								"@type": "EntryPoint",
								"urlTemplate": "https://mcstatus.io/status/{search_term_string}"
							},
							"query-input": "required name=search_term_string"
						}
					}
				`}
			</Script>
		</>
	);
}

Home.propTypes = {
	servers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export function getServerSideProps() {
	const javaServers = exampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	const servers = [];

	for (let i = 0; i < 4; i++) {
		servers.push(javaServers[i], bedrockServers[i]);
	}

	return { props: { servers } };
}