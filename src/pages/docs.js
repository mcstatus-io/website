import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/future/image';
import Navbar from '../components/Navbar';
import Highlight from '../components/Highlight';
import Ad from '../components/Ad';
import javaExample from '../assets/response/java.jsonc';
import bedrockExample from '../assets/response/bedrock.jsonc';
import iconExample from '../assets/response/icon.png';

export default function Documentation() {
	return (
		<>
			<Head>
				<title>API Documentation - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="API Documentation - Minecraft Server Status" />
				<meta name="description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io/docs" />
				<meta property="og:title" content="API Documentation - Minecraft Server Status" />
				<meta property="og:description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/docs" />
			</Head>
			<Navbar active="api" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<div className="flex flex-col-reverse lg:flex-row">
					<div className="lg:basis-[75%]">
						<h1 className="text-4xl lg:text-5xl font-black">API Documentation</h1>
						<p className="text-2xl font-light mt-2">Documentation on how to use our API in your service</p>
						<Ad className="mt-4" />
						<h2 className="text-3xl lg:text-4xl font-black mt-12" id="overview">Overview</h2>
						<p className="mt-3">The goal of this API documentation is to accurately and precisely describe the functionality of this service in simple English. This page will go over everything you need to know before implementing our API into your service. If you believe there is anything missing, any typos, or incorrect information on this page, please reach out to us via email at <a href="mailto:contact@mcstatus.io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">contact@mcstatus.io</a>.</p>
						<h3 className="text-xl lg:text-2xl font-black mt-12" id="standards">Standards</h3>
						<p className="mt-3">The entirety of this API uses the standardized REST API, which in simple terms means you will be making HTTP requests to our service. We currently only support endpoints using the <code>GET</code> method. You will never have to use <code>POST</code> or any other method with requires you to send body data or headers with your request. All status endpoints return a response body in <a href="https://www.json.org/json-en.html" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">JSON format</a>. No other data formatting standard is available at this time, and there is currently no future plan to support anything other than JSON. All JSON returned from this service will have whitespace and any unnecessary characters removed to reduce network bandwidth and wasted information. You may learn more about the properties you receive from these routes by reading the documented response body from the route on this page.</p>
						<h3 className="text-xl lg:text-2xl font-black mt-12" id="cache">Cache</h3>
						<p className="mt-3">To reduce the amount of spam and deliberate denial-of-service attacks of our service, we implement a caching system for all of the data we fetch, including but not limited to status responses and server icons. Each route has its own cache duration specified in the documentation of said route. All routes with data retrieved from the cache will contain a header in the response with the key <code>X-Cache-Time-Remaining</code> with contains an integer as the amount of seconds remaining until the cache value expires. Any request made after this cache expiration time will result in fresh data being retrieved on our end. If you wish for an exception to this cache, you may reach out to our team by shooting an email to <a href="mailto:api@mcstatus.io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">api@mcstatus.io</a> with detailed information about your use case.</p>
						<h3 className="text-xl lg:text-2xl font-black mt-12" id="supported">Supported Versions</h3>
						<p className="mt-3">All Minecraft servers, including pre-netty rewrite Java Edition and Bedrock Edition servers, are supported.Make sure you are using the correct endpoint when retrieving a server status, as attempting to use the Java Edition status route with a Bedrock Edition host (or vise-versa) will result in a response saying the server is offline unless the server explicitly has cross-play supported. If the server you specify does not use the standard port value (<code>25565</code> for Java Edition, <code>19132</code> for Bedrock Edition), then you will need to specify the port by using the following format: <code>host:port</code>.</p>
						<h2 className="text-3xl lg:text-4xl font-black mt-12" id="routes">Routes</h2>
						<h3 className="text-xl lg:text-2xl font-black mt-6" id="java-status">Java Status</h3>
						<p className="mt-3">
							<span className="bg-green-500 rounded px-2 py-1 text-xs">GET</span>
							<code className="ml-2 break-words">https://api.mcstatus.io/v2/status/java/&lt;address&gt;</code>
						</p>
						<Highlight source={javaExample} className="mt-3 border border-neutral-700 rounded" />
						<h3 className="text-xl lg:text-2xl font-black mt-12" id="bedrock-status">Bedrock Status</h3>
						<p className="mt-3">
							<span className="bg-green-500 rounded px-2 py-1 text-xs">GET</span>
							<code className="ml-2 break-words">https://api.mcstatus.io/v2/status/bedrock/&lt;address&gt;</code>
						</p>
						<Highlight source={bedrockExample} className="mt-3 border border-neutral-700 rounded" />
						<h3 className="text-xl lg:text-2xl font-black mt-12" id="icon">Icon</h3>
						<p className="mt-3">
							<span className="bg-green-500 rounded px-2 py-1 text-xs">GET</span>
							<code className="ml-2 break-words">https://api.mcstatus.io/v2/icon/&lt;address&gt;</code>
						</p>
						<Image src={iconExample} width="128" height="128" alt="Sample server icon" className="mt-3" />
						<h2 className="text-4xl font-black mt-12" id="support">Support</h2>
						<p className="mt-3">If you require any additional assistance or found a bug you would like to report, please send an email to <a href="mailto:api@mcstatus.io" className="text-blue-500 hover:text-blue-400 transition-colors duration-150">api@mcstatus.io</a>.</p>
					</div>
					<div className="lg:border-l-2 border-l-neutral-700 lg:ml-24 lg:pl-12 py-2 mb-8 lg:mb-0">
						<ul>
							<li>
								<Link href="#overview">
									<a className="font-bold text-neutral-300 hover:text-white transition-colors duration-150">Overview</a>
								</Link>
								<ul className="pl-6">
									<li className="mt-1">
										<Link href="#standards">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Standards</a>
										</Link>
									</li>
									<li className="mt-1">
										<Link href="#cache">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Cache</a>
										</Link>
									</li>
									<li className="mt-1">
										<Link href="#supported">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Supported Versions</a>
										</Link>
									</li>
								</ul>
							</li>
							<li className="mt-1">
								<Link href="#routes">
									<a className="font-bold text-neutral-300 hover:text-white transition-colors duration-150">Routes</a>
								</Link>
								<ul className="pl-6">
									<li className="mt-1">
										<Link href="#java-status">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Java Status</a>
										</Link>
									</li>
									<li className="mt-1">
										<Link href="#bedrock-status">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Bedrock Status</a>
										</Link>
									</li>
									<li className="mt-1">
										<Link href="#icon">
											<a className="text-neutral-300 hover:text-white transition-colors duration-150">Icon</a>
										</Link>
									</li>
								</ul>
							</li>
							<li className="mt-1">
								<Link href="#support">
									<a className="font-bold text-neutral-300 hover:text-white transition-colors duration-150">Support</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<script type="application/ld+json">
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
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "API Documentation",
				"item": "https://mcstatus.io/docs"
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
			</script>
		</>
	);
}