import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { exampleServers } from '../assets/servers';

export default function Home({ servers }) {
	const { push, pathname } = useRouter();

	const form = useFormik({
		initialValues: {
			host: '',
			bedrock: false
		},
		validationSchema: Yup
			.object()
			.shape({
				host: Yup.string().min(1).matches(/^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*(:\d{1,5})?$/).required(),
				bedrock: Yup.boolean().required()
			})
			.required(),
		onSubmit: ({ host, bedrock }) => push(`/status/${bedrock ? 'bedrock' : 'java'}/${host.toLowerCase()}`)
	});

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
			<div className="container">
				<h1 className="title">Minecraft Server Status</h1>
				<form onSubmit={form.handleSubmit} className="mb-5">
					<div className="columns">
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${form.errors.host ? 'is-danger' : ''}`} id="host" placeholder="play.hypixel.net OR play.hypixel.net:25565" value={form.values.host} spellCheck="false" autoComplete="false" onChange={form.handleChange} onBlur={form.handleBlur} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" id="bedrock" checked={form.values.bedrock} onChange={form.handleChange} />
								<span>Bedrock server</span>
							</label>
						</div>
						<div className="column is-flex-grow-0">
							<button type="submit" className="button is-fullwidth is-link" disabled={!form.isValid}>Submit</button>
						</div>
					</div>
				</form>
				<h2 className="title is-4 mb-3 mt-6">About</h2>
				<div className="content">
					<p>mcstatus.io is a tool for quickly retrieving the status of any Java or Bedrock Edition Minecraft server. This tool will show all the information returned from the server in an easily understandable format. Simply type the address of the server into the input box above and hit submit to retrieve the status in a fraction of a second. This service is entirely free-to-use and has no advertising whatsoever. There is additionally a developer API for people to use within their own service.</p>
					<p>All versions of a Minecraft server are supported. Some details such as the version and the favicon may be unavailable for a specific range of versions since they did not exist that early in the game. To use a non-standard port, use a colon followed by the port number in the address bar. For example, <code>myserver.com:29845</code>. SRV records are also supported and will be correctly resolved.</p>
					<p>Caching of the server response is used to prevent abuse of the service and potential spam. Responses are cached for 10 minutes, meaning a fresh status will be retrieved after 10 minutes from the previous. This site is built with <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a> and <a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a>, and the back-end API server is running on <a href="https://go.dev/" target="_blank" rel="noreferrer">Golang</a> with speed and efficiency in mind.</p>
				</div>
				<h2 className="title is-4 mb-3 mt-6">Example Servers</h2>
				<div className="columns is-multiline">
					{
						servers.map((server, index) => (
							<div className="column is-6" key={index}>
								<Link href={`/status/${server.type}/${server.address}`}>
									<a className="box">
										<span className={`tag is-${server.type === 'java' ? 'success' : 'info'} is-pulled-right`}>{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
										<p>
											<span>{server.name}</span>
											<span className="has-text-grey"> ({server.address})</span>
										</p>
									</a>
								</Link>
							</div>
						))
					}
				</div>
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
	const servers = [];

	while (!servers.some((server) => server.type === 'bedrock')) {
		servers.length = 0;

		while (servers.length < 8) {
			const server = exampleServers[Math.floor(Math.random() * exampleServers.length)];
			if (servers.some((s) => s.address === server.address)) continue;

			servers.push(server);
		}
	}

	return { props: { servers } };
}