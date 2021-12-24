import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Head>
				<title>mcstatus.io - A Minecraft server status utility</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="mcstatus.io - A Minecraft server status utility" />
				<meta name="description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io" />
				<meta property="og:title" content="mcstatus.io - A Minecraft server status utility" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container main-container">
				<div className="columns">
					<div className="column is-4">
						<Link href="/status/java">
							<a className="box">
								<h2 className="title">Java Server Status</h2>
								<p className="subtitle">Retrieve the status of a &gt;1.6 Minecraft server</p>
							</a>
						</Link>
					</div>
					<div className="column is-4">
						<Link href="/status/legacy">
							<a className="box">
								<h2 className="title">Legacy Server Status</h2>
								<p className="subtitle">Retrieve the status of a &lt;1.7 Minecraft server</p>
							</a>
						</Link>
					</div>
					<div className="column is-4">
						<Link href="/status/bedrock">
							<a className="box">
								<h2 className="title">Bedrock Server Status</h2>
								<p className="subtitle">Retrieve the status of a Bedrock Edition Minecraft server</p>
							</a>
						</Link>
					</div>
				</div>
				<div className="columns">
					<div className="column is-4">
						<Link href="/query/basic">
							<a className="box">
								<h2 className="title">Basic Query</h2>
								<p className="subtitle">Perform a basic query on a Java Edition Minecraft server</p>
							</a>
						</Link>
					</div>
					<div className="column is-4">
						<Link href="/query/full">
							<a className="box">
								<h2 className="title">Full Query</h2>
								<p className="subtitle">Perform a full query on a Java Edition Minecraft server</p>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}