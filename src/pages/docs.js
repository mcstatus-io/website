import React, { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Highlight from 'react-highlight';
import javaExample from '../assets/response/java.jsonc';
import bedrockExample from '../assets/response/bedrock.jsonc';
import sampleIcon from '../assets/response/icon.png';

const revisions = [
	{
		id: 'v1',
		name: 'v1 — Latest',
		content: (
			<>
				<h2 className="title is-header">Overview</h2>
				<p>mcstatus.io believes that anybody should be able to retrieve the status of any Minecraft server using a simple and efficient manner. This is why we prioritize a detailed and continuously updated documentation on how to interact with our service from yours. Please make sure to read this documentation thoroughly to prevent any errors that may be a mistake on your part.</p>
				<p>All methods documented are using the REST API, which is supported in all major programming languages and browsers. Body data sent and received from/to the server are using JSON formatting for standardization reasons. You should familiarize yourself with this data encoding before attempting to use our service. If you have any questions, concerns or encounter any problems after attempting a solution, please feel free to contact us by sending an email to <a href="mailto:api@mcstatus.io">api@mcstatus.io</a>.</p>
				<p>All server statuses are cached for up to 10 minutes from the previous network fetch. You can determine if a status was fetched from cache by using the <code>X-Cache-Hit</code> header returned from the server after the request. If the cache was used, there will also be a <code>X-Cache-Time-Remaining</code> header that will contain the amount of seconds remaining until the cache expires.</p>
				<h2 className="title is-header mt-6 mb-3">Java Status</h2>
				<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v1/status/java/&lt;address&gt;</code></p>
				<Highlight className="language-json p-3">{javaExample}</Highlight>
				<h2 className="title is-header mt-6 mb-3">Bedrock Status</h2>
				<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v1/status/bedrock/&lt;address&gt;</code></p>
				<Highlight className="language-json p-3">{bedrockExample}</Highlight>
				<h2 className="title is-header mt-6 mb-3">Favicon</h2>
				<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v1/favicon/&lt;address&gt;</code></p>
				<img src={sampleIcon.src} alt="Sample icon of Hypixel" width="128" height="128" />
			</>
		)
	}
];

export default function API() {
	const [selectedRevision, setSelectedRevision] = useState(revisions[revisions.length - 1]);

	const handleChange = (event) => {
		setSelectedRevision(revisions.find((value) => value.id === event.target.options[event.target.selectedIndex].value));
	};

	return (
		<>
			<Head>
				<title>API Documentation - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="API Documentation - mcstatus.io" />
				<meta name="description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io/docs" />
				<meta property="og:title" content="API Documentation - mcstatus.io" />
				<meta property="og:description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/docs" />
			</Head>
			<div className="content">
				<h1 className="title">API Documentation</h1>
				<label className="label" htmlFor="revision">API Revision</label>
				<div className="select">
					<select onChange={handleChange} id="revision">
						{
							revisions.map((revision, index) => (
								<option value={revision.id} key={index}>{revision.name}</option>
							))
						}
					</select>
				</div>
				{selectedRevision.content}
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
							}
						]
					}
				`}
			</Script>
		</>
	);
}