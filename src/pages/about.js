import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
import Script from 'next/script';
import Ad from '../components/Ad';
import rightArrow from '../assets/icons/arrow-right.svg';
import mineserversIcon from '../assets/img/mineservers.svg';
import mineatarIcon from '../assets/img/mineatar.svg';

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
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/about" />
			</Head>
			<div className="content">
				<Ad className="mb-5" />
				<div className="heading-group">
					<h1 className="title is-size-4" id="about">
						<span className="is-align-middle">About</span>
						<Link href="#about"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
					</h1>
					<p className="subtitle is-size-5">A short overview of why this service exists</p>
				</div>
				<p>mcstatus.io was created as a utility for people to check the status of a Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <Link href="https://mcsrvstat.us">mcsrvstat.us</Link> but aimed at improving consistency and conformity to standards. The website is built using <Link href="https://nextjs.org">NextJS</Link> and the back-end was built with <Link href="https://golang.org">Go</Link>. This site uses clean advertising from <a href="https://www.carbonads.net/">Carbon Ads</a> to help cover the hosting and development costs.</p>
				<div className="heading-group">
					<h2 className="title is-size-4" id="faq">
						<span className="is-align-middle">FAQ</span>
						<Link href="#faq"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
					</h2>
					<p className="subtitle is-size-5">Short and to-the-point questions and answers</p>
				</div>
				<ol>
					<li>
						<p className="has-text-weight-bold mb-1">How do I check the status of a server?</p>
						<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code>.</p>
					</li>
					<li>
						<p className="has-text-weight-bold mb-1 mt-4">What is an SRV record?</p>
						<p>An SRV record is created by the server admin to tell Minecraft clients to connect to a specific server by default. This is typically done by network servers to initially connect players to the lobby, or to specify which server a player should connect to by default if the admin is also hosting other servers on the same network.</p>
					</li>
					<li>
						<p className="has-text-weight-bold mb-1 mt-4">How do I hide the status of my server?</p>
						<p>Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu. There is no &quot;workaround&quot; from preventing status libraries/services from retrieving it and still allowing in-game clients to view them.</p>
					</li>
					<li>
						<p className="has-text-weight-bold mb-1 mt-4">Does this service use query?</p>
						<p>Query is currently not supported in our API due to limitations with malformed addresses and hanging issues. This will eventually be resolved and query will be implemented sometime in the future.</p>
					</li>
					<li>
						<p className="has-text-weight-bold mb-1 mt-4">Is this service open-source?</p>
						<p>Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href="https://github.com/mcstatus-io">our GitHub organization</a>.</p>
					</li>
				</ol>
				<div className="heading-group">
					<h2 className="title is-size-4" id="sponsors">
						<span className="is-align-middle">Sponsors</span>
						<Link href="#sponsors"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
					</h2>
					<p className="subtitle is-size-5">All companies and services that we sponsor</p>
				</div>
				<div className="columns is-multiline">
					<div className="column is-4">
						<a className="box" href="https://mineservers.io">
							<p className="title is-size-4 has-text-white mb-2">
								<Image src={mineserversIcon} width="32" height="32" className="is-align-middle" alt="mineservers.io Logo" priority />
								<span className="ml-3">mineservers.io</span>
							</p>
							<p className="has-text-grey-lighter mb-0">A modern Minecraft server listing site with advanced but easy-to-use search, server filtering and achievement system.</p>
							<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" priority />
						</a>
					</div>
					<div className="column is-4">
						<a className="box" href="https://docs.mineatar.io">
							<p className="title is-size-4 has-text-white mb-2">
								<Image src={mineatarIcon} width="32" height="32" className="is-align-middle" alt="mineservers.io Logo" priority />
								<span className="ml-3">mineatar.io</span>
							</p>
							<p className="has-text-grey-lighter mb-0">An incredibly fast API for generating 2D and isometric 3D renders of Minecraft player skins, with username and UUID support.</p>
							<Image src={rightArrow} width="20" alt="Right arrow" className="box-link-arrow" priority />
						</a>
					</div>
				</div>
				<div className="heading-group">
					<h2 className="title is-size-4" id="contact">
						<span className="is-align-middle">Contact</span>
						<Link href="#contact"><a className="ml-3 is-size-4 is-align-middle">#</a></Link>
					</h2>
					<p className="subtitle is-size-5">Preferred methods of contacting us</p>
				</div>
				<p>If you wish to contact us, please do so using <a href="mailto:contact@mcstatus.io">contact@mcstatus.io</a>. We accept any sort of feedback on our service including bug reports, feature suggestions, questions about usage, etc.</p>
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
								"name": "How do I hide the status of my server?",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "<p>Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable them, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu. There is no &quot;workaround&quot; from preventing status libraries/services from retrieving it and still allowing in-game clients to view them.</p>"
								}
							},
							{
								"@type": "Question",
								"name": "Does this service use query?",
								"acceptedAnswer": {
									"@type": "Answer",
									"text": "Query is currently not supported in our API due to limitations with malformed addresses and hanging issues. This will eventually be resolved and query will be implemented sometime in the future."
								}
							}
						]
					}
				`}
			</Script>
		</>
	);
}