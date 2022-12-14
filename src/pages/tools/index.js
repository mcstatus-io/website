import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import BoxLink from '../../components/BoxLink';
import Container from '../../components/Container';

export default function Tools({ user }) {
	return (
		<>
			<Head>
				<title>Tools - Minecraft Server Status</title>
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
			<Navbar user={user} active="tools" />
			<Container>
				<Header size={1} text="Tools" />
				<p className="text-2xl font-light mt-2">Quick tools to help Minecraft developers</p>
				<BoxLink href="/tools/coordinate" className="mt-5">
					<Header size={2} text="Coordinate Calculator" />
					<p className="text-lg">Calculate region, chunk and block coordinates</p>
				</BoxLink>
				<BoxLink href="/tools/vote" className="mt-3">
					<Header size={2} text="Votifier Tester" />
					<p className="text-lg">Send a Votifier test vote to a Minecraft server</p>
				</BoxLink>
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

Tools.propTypes = {
	user: PropTypes.object
};