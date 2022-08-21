import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import Script from 'next/script';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { exampleServers } from '../assets/servers';
import StatusLayout from '../layouts/StatusLayout';
import Ad from '../components/Ad';
import rightArrow from '../assets/icons/arrow-right.svg';

export default function Servers() {
	const { pathname } = useRouter();

	const javaServers = exampleServers.filter((server) => server.type === 'java').sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);

	return (
		<>
			<Head>
				<title>Sample Servers - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Sample Servers - mcstatus.io" />
				<meta name="description" content="A list of all sample servers to test our service, including many Java or Bedrock Edition Minecraft servers." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content="Sample Servers - mcstatus.io" />
				<meta property="og:description" content="A list of all sample servers to test our service, including many Java or Bedrock Edition Minecraft servers." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io" />
			</Head>
			<StatusLayout>
				<div className="content">
					<h1 className="title">Sample Servers</h1>
					<Ad className="mb-4" />
					<h2 className="title is-size-4" id="java-servers">
						<span className="is-align-middle">Java Edition Servers</span>
						<Link href="#java-servers"><a className="ml-2 is-size-4 is-align-middle">#</a></Link>
					</h2>
					<div className="columns is-multiline">
						{
							javaServers.map((server, index) => (
								<div className="column py-3 is-6" key={index}>
									<Link href={`/status/${server.type}/${server.address}`}>
										<a className="box">
											<p className="has-text-white has-text-weight-bold mb-1">{server.name}</p>
											<code>{server.address}</code>
											<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" />
										</a>
									</Link>
								</div>
							))
						}
					</div>
					<h2 className="title is-size-4" id="bedrock-servers">
						<span className="is-align-middle">Bedrock Edition Servers</span>
						<Link href="#bedrock-servers"><a className="ml-2 is-size-4 is-align-middle">#</a></Link>
					</h2>
					<div className="columns is-multiline">
						{
							bedrockServers.map((server, index) => (
								<div className="column py-3 is-6" key={index}>
									<Link href={`/status/${server.type}/${server.address}`}>
										<a className="box">
											<p className="has-text-white has-text-weight-bold mb-1">{server.name}</p>
											<code>{server.address}</code>
											<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" />
										</a>
									</Link>
								</div>
							))
						}
					</div>
				</div>
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
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "Sample Servers",
								"item": "https://mcstatus.io/servers"
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

Servers.propTypes = {
	servers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};