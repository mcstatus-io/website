import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

export default function About() {
	return (
		<>
			<Head>
				<title>About - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="About - mcstatus.io" />
				<meta name="description" content="Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io/about" />
				<meta property="og:title" content="About - mcstatus.io" />
				<meta property="og:description" content="Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container content">
				<h2 className="title is-header">About</h2>
				<p>mcstatus.io was created as a utility for people to check the status of a Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <Link href="https://mcsrvstat.us">mcsrvstat.us</Link>. The website is built using <Link href="https://nextjs.org">NextJS</Link> and the back-end was built with <Link href="https://golang.org">Go</Link>. This site is ad-free to reduce the amount of visual clutter and intrusive tracking.</p>
				<h2 className="title is-header mt-6">FAQ</h2>
				<ol>
					<li>
						<h3 className="title is-5 mb-3">How do I check the status of a server?</h3>
						<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code>.</p>
					</li>
					<li>
						<h3 className="title is-5 mt-5 mb-3">What is an SRV record?</h3>
						<p>An SRV record is created by the server host to &quot;redirect&quot; users to another IP address, typically to allow users to connect to the memorable host name instead of a string of a bunch of numbers. This service automatically resolves all SRV records and obtains the status of the server behind them.</p>
					</li>
					<li>
						<h3 className="title is-5 mt-5 mb-3">How do I report a bug?</h3>
						<p>You may send any bug reports, feature suggestions, or question to the following email address: <a href="mailto:contact@mcstatus.io">contact@mcstatus.io</a>.</p>
					</li>
				</ol>
			</div>
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
								"name": "About",
								"item": "https://mcstatus.io/about"
							}
						]
					}
				`}
			</Script>
			<Script id="structured-data-2" type="application/ld+json">
				{`
					{
						"@context": "https://schema.org",
						"@type": "FAQPage",
						"mainEntity": [
							{
								"@type": "Question",
								"name": "How do I check the status of a server?",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code>.</p>"
								}
							},
							{
								"@type": "Question",
								"name": "What is an SRV record?",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "An SRV record is created by the server host to redirect users to another IP address, typically to allow users to connect to the memorable host name instead of a string of a bunch of numbers. This service automatically resolves all SRV records and obtains the status of the server behind them."
								}
							},
							{
								"@type": "Question",
								"name": "How do I report a bug?",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "You may send any bug reports, feature suggestions, or question to the following email address: contact@mcstatus.io"
								}
							}
						]
					}
				`}
			</Script>
		</>
	);
}