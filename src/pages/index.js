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
						<Link href="/status">
							<a className="box">
								<h2 className="title">Java Server Status</h2>
								<p className="subtitle">Retrieve the status of a Java Edition Minecraft server</p>
							</a>
						</Link>
					</div>
					<div className="column is-4">
						<Link href="/bedrock">
							<a className="box">
								<h2 className="title">Bedrock Server Status</h2>
								<p className="subtitle">Retrieve the status of a Bedrock Edition Minecraft server</p>
							</a>
						</Link>
					</div>
					<div className="column is-4">
						<Link href="/query">
							<a className="box">
								<h2 className="title">Query</h2>
								<p className="subtitle">Perform a full query on a Java Edition Minecraft server</p>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}