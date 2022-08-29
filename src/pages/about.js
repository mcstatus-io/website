import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Ad from '../components/Ad';

export default function About() {
	return (
		<>
			<Head>
				<title>About - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="About - Minecraft Server Status" />
				<meta name="description" content="Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io/about" />
				<meta property="og:title" content="About - Minecraft Server Status" />
				<meta property="og:description" content="Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/about" />
			</Head>
			<Header active="about" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<h1 className="text-4xl lg:text-5xl font-black">About</h1>
				<p className="text-2xl font-light mt-2">A quick understanding of what we do</p>
				<p className="mt-3">mcstatus.io was created as a utility for people to check the status of a Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <a href="https://mcsrvstat.us" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">mcsrvstat.us</a> but aimed at improving consistency and conformity to standards. The website is built using <a href="https://nextjs.org" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">NextJS</a> and the back-end was built with <a href="https://golang.org" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">Go</a>. This site uses clean advertising from <a href="https://www.carbonads.net/" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">Carbon Ads</a> to help cover the hosting and development costs.</p>
				<Ad className="mt-4" />
				<h2 className="text-3xl font-black mt-12">Frequently Asked Questions</h2>
				<h3 className="text-xl font-bold mt-6">How do I check the status of a server?</h3>
				<p className="mt-1">Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code> for Java Edition servers and <code>19132</code> for Bedrock Edition servers.</p>
				<h3 className="text-xl font-bold mt-6">What is an SRV record?</h3>
				<p className="mt-1">An SRV record is created by the server admin to tell Minecraft clients to connect to a specific server by default. This is typically done by network servers to initially connect players to the lobby, or to specify which server a player should connect to by default if the admin is also hosting other servers on the same network.</p>
				<h3 className="text-xl font-bold mt-6">How do I hide the status of my server?</h3>
				<p className="mt-1">Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu.</p>
				<h3 className="text-xl font-bold mt-6">Does this service use query?</h3>
				<p className="mt-1">We intentionally chose not to use query in this service because it slows down any status retrieval, and it also does not provide much more information than the data sent by the status protocol.</p>
				<h3 className="text-xl font-bold mt-6">Is this service open-source?</h3>
				<p className="mt-1">Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href="https://github.com/mcstatus-io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">our GitHub organization</a>.</p>
				<h2 className="text-3xl font-black mt-12">Contact</h2>
				<p className="mt-1">If you wish to contact us, please do so using <a href="mailto:contact@mcstatus.io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">contact@mcstatus.io</a>. We accept any sort of feedback on our service including bug reports, feature suggestions, questions about usage, etc.</p>
			</div>
		</>
	);
}