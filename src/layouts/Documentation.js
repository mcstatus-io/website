import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Ad from '../components/Ad';

export default function DocumentationLayout({ version, children }) {
	const { push } = useRouter();

	const handleChange = (event) => {
		push(`/docs/${event.target.options[event.target.selectedIndex].value}`);
	};

	return (
		<>
			<Head>
				<title>API Documentation - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="API Documentation - mcstatus.io" />
				<meta name="description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/docs/${version}`} />
				<meta property="og:title" content="API Documentation - mcstatus.io" />
				<meta property="og:description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href={`https://mcstatus.io/docs/${version}`} />
			</Head>
			<div className="container content content-container">
				<Ad />
				<h1 className="title mt-0">API Documentation</h1>
				<label className="label" htmlFor="revision">API Revision</label>
				<div className="select">
					<select onChange={handleChange} id="revision">
						<option value="v1" selected={version === 'v1'}>v1</option>
						<option value="v2" selected={version === 'v2'}>v2</option>
					</select>
				</div>
				{children}
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
								"name": "API",
								"item": "https://mcstatus.io/docs"
							},
							{
								"@type": "ListItem",
								"position": 3,
								"name": "${version}",
								"item": "https://mcstatus.io/docs/${version}"
							}
						]
					}
				`}
			</Script>
		</>
	);
}

DocumentationLayout.propTypes = {
	version: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired
};