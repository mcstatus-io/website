import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
			<div className="container">
				<h2 className="title mb-2">About</h2>
				<p>mcstatus.io was created as a utility for people to check the status of Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <Link href="https://mcsrvstat.us">mcsrvstat.us</Link>. The website is built using <Link href="https://nextjs.org">NextJS</Link> and the back-end was built with <Link href="https://golang.org">Go</Link>. This site is ad-free to reduce the amount of visual clutter and intrusive tracking.</p>
				<h2 className="title mt-5">FAQ</h2>
				<h3 className="title is-5 mb-2">How do I check the status of a server?</h3>
				<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code>.</p>
				<h3 className="title is-5 mb-2 mt-5">What is an SRV record?</h3>
				<p>An SRV record is created by the server host to &quot;redirect&quot; users to another IP address, typically to allow users to connect to the memorable host name instead of a string of a bunch of numbers. This service automatically resolves all SRV records and obtains the status of the server behind them.</p>
				<h3 className="title is-5 mb-2 mt-5">How do I report a bug?</h3>
				<p>You can join the Discord support server for this site by using the following invite link: <Link href="https://discord.gg/e7jgDYY" target="_blank" rel="noreferrer">https://discord.gg/e7jgDYY</Link>.</p>
			</div>
		</>
	);
}