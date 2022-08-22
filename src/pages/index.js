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
					<p className="subtitle is-size-5">A short list of sample Minecraft servers to test</p>
				</div>
				<div className="columns is-multiline">
					{
						servers.map((server, index) => (
							<div className="column py-2 is-6" key={index}>
								<Link href={`/status/${server.type}/${server.address}`}>
									<a className="box">
										<p className="has-text-white">
											<span className={`tag is-${server.type === 'java' ? 'success' : 'info'} mr-2`}>{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
											<code>{server.address}</code>
										</p>
										<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" />
									</a>
								</Link>
							</div>
						))
					}
				</div>
				<Link href="/servers">
					<a className="box">
						<span className="has-text-white">All sample servers</span>
						<span className="has-text-grey ml-2">({servers.length})</span>
						<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" />
					</a>
				</Link>
				<Ad />
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