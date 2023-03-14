import Image from 'next/image';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Highlight from '../../components/Highlight';
import Ad from '../../components/Ad';
import Header from '../../components/Header';
import Collapsible from '../../components/Collapsible';
import javaExample from '../../assets/response/java.jsonc';
import bedrockExample from '../../assets/response/bedrock.jsonc';
import iconExample from '../../assets/response/icon.png';

const formatDuration = (duration) => {
	if (duration < 1000) {
		return Math.trunc(duration) + 'ms';
	} else if (duration < 1000 * 60) {
		const value = Math.trunc(duration / 1000);

		return value + ' second' + (value !== 1 ? 's' : '');
	} else if (duration < 1000 * 60 * 60) {
		const value = Math.trunc(duration / (1000 * 60));

		return value + ' minute' + (value !== 1 ? 's' : '');
	} else if (duration < 1000 * 60 * 60 * 24) {
		const value = Math.trunc(duration / (1000 * 60 * 60));

		return value + ' hour' + (value !== 1 ? 's' : '');
	}

	const value = Math.trunc(duration / (1000 * 60 * 60 * 24));

	return value + ' day' + (value !== 1 ? 's' : '');
};

export const metadata = {
	title: 'API Documentation',
	description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
	openGraph: {
		title: 'API Documentation - Minecraft Server Status',
		description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
		url: 'https://mcstatus.io/docs',
		siteName: 'Minecraft Server Status',
		images: [
			{
				url: 'https://mcstatus.io/img/icon.png',
				width: 300,
				height: 300
			}
		],
		locale: 'en-US',
		type: 'website'
	},
	alternates: {
		canonical: 'https://mcstatus.io/docs'
	}
};

export default function Page() {
	return (
		<>
			<Navbar active="api" />
			<Container>
				<div className="flex flex-col-reverse lg:flex-row">
					<div className="lg:basis-[calc(100%-20rem)]">
						<hgroup>
							<Header size={1}>API Documentation</Header>
							<p className="text-2xl font-light mt-2">Documentation on how to use our API in your service</p>
						</hgroup>
						<Ad className="mt-5" />
						<section>
							<section id="overview-section">
								<Header size={2} id="overview" className="mt-12 offset-anchor">Overview</Header>
								<p className="mt-3">The goal of this API documentation is to accurately and precisely describe the functionality of this service in simple English. This page will go over everything you need to know before implementing our API into your service. If you believe there is anything missing, any typos, or incorrect information on this page, please reach out to us via email at <a href="mailto:contact@mcstatus.io" className="link">contact@mcstatus.io</a>.</p>
							</section>
							<section id="standards-section">
								<Header size={3} id="standards" className="mt-12 offset-anchor">Standards</Header>
								<p className="mt-3">The entirety of this API uses the standardized REST API, which in simple terms means you will be making HTTP requests to our service. We currently only support endpoints using the <code>GET</code> method. You will never have to use <code>POST</code> or any other method with requires you to send body data or headers with your request. All status endpoints return a response body in <a href="https://www.json.org/json-en.html" className="link">JSON format</a>. No other data formatting standard is available at this time, and there is currently no future plan to support anything other than JSON. All JSON returned from this service will have whitespace and any unnecessary characters removed to reduce network bandwidth and wasted information. You may learn more about the properties you receive from these routes by reading the documented response body from the route on this page.</p>
							</section>
							<section id="cache-section">
								<Header size={3} id="cache" className="mt-12 offset-anchor">Cache</Header>
								<p className="mt-3">To reduce the amount of spam and deliberate denial-of-service attacks of our service, we implement a caching system for all of the data we fetch, including but not limited to status responses and server icons. Each route has its own cache duration specified in the documentation of said route. All routes with data retrieved from the cache will contain a header in the response with the key <code>X-Cache-Time-Remaining</code> with contains an integer as the amount of seconds remaining until the cache value expires. Any request made after this cache expiration time will result in fresh data being retrieved on our end. If you wish for an exception to this cache, you may reach out to our team by shooting an email to <a href="mailto:api@mcstatus.io" className="link">api@mcstatus.io</a> with detailed information about your use case.</p>
							</section>
							<section id="supported-section">
								<Header size={3} id="supported" className="mt-12 offset-anchor">Supported Versions</Header>
								<p className="mt-3">All Minecraft servers, including pre-netty rewrite Java Edition and Bedrock Edition servers, are supported. Make sure you are using the correct endpoint when retrieving a server status, as attempting to use the Java Edition status route with a Bedrock Edition host (or vise-versa) will result in a response saying the server is offline unless the server explicitly has cross-play supported. If the server you specify does not use the standard port value (<code>25565</code> for Java Edition, <code>19132</code> for Bedrock Edition), then you will need to specify the port by using the following format: <code>host:port</code>.</p>
							</section>
						</section>
						<section>
							<Header size={2} id="routes" className="mt-12 offset-anchor">Routes</Header>
							<section id="java-section">
								<Collapsible title="Java Status" id="java-status" className="mt-3" autoExpanded>
									<p>Retrieves the status of any Java Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>play.hypixel.net</code> is a valid connection address as well as <code>play.hypixel.net:25565</code>.</p>
									<hr className="border-neutral-300 dark:border-neutral-700 my-3" />
									<p className="flex items-center gap-2 mt-3">
										<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
										<code className="break-words">https://api.mcstatus.io/v2/status/java/&lt;address&gt;</code>
									</p>
									<p className="flex items-center gap-2 mt-3">
										<span>Cache duration:</span>
										<span className="bg-blue-600 rounded px-2 py-1 text-xs text-white">{formatDuration(parseInt(process.env.JAVA_CACHE_TIME ?? '60000'))}</span>
									</p>
									<Highlight source={javaExample} className="mt-3 bg-neutral-800 dark:border dark:border-neutral-700 rounded" />
								</Collapsible>
							</section>
							<section id="bedrock-section">
								<Collapsible title="Bedrock Status" id="bedrock-status" className="mt-3" autoExpanded>
									<p>Retrieves the status of any Bedrock Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>pe.mineplex.com</code> is a valid connection address as well as <code>pe.mineplex.com:19132</code>.</p>
									<hr className="border-neutral-300 dark:border-neutral-700 my-3" />
									<p className="flex items-center gap-2 mt-3">
										<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
										<code className="break-words">https://api.mcstatus.io/v2/status/bedrock/&lt;address&gt;</code>
									</p>
									<p className="flex items-center gap-2 mt-3">
										<span>Cache duration:</span>
										<span className="bg-blue-600 rounded px-2 py-1 text-xs text-white">{formatDuration(parseInt(process.env.BEDROCK_CACHE_TIME ?? '60000'))}</span>
									</p>
									<Highlight source={bedrockExample} className="mt-3 bg-neutral-800 dark:border dark:border-neutral-700 rounded" />
								</Collapsible>
							</section>
							<section id="icon-section">
								<Collapsible title="Icon" id="icon" className="mt-3" autoExpanded>
									<p>Returns just the icon/favicon of any Java Edition Minecraft server. If connection to the server fails or if the server is offline then the default icon is returned. The address value is optional, and if not provided then the default icon is returned.</p>
									<hr className="border-neutral-300 dark:border-neutral-700 my-3" />
									<p className="mt-3">
										<span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
										<code className="ml-2 break-words">https://api.mcstatus.io/v2/icon/&lt;address&gt;</code>
									</p>
									<p className="flex items-center gap-2 mt-3">
										<span>Cache duration:</span>
										<span className="bg-blue-600 rounded px-2 py-1 text-xs text-white">{formatDuration(parseInt(process.env.ICON_CACHE_TIME ?? '900000'))}</span>
									</p>
									<Image src={iconExample} width="128" height="128" alt="Sample server icon" className="mt-3" />
								</Collapsible>
							</section>
						</section>
						<section id="support-section">
							<Header size={2} id="support" className="mt-12 offset-anchor">Support</Header>
							<p className="mt-3">If you require any additional assistance or found a bug you would like to report, please send an email to <a href="mailto:api@mcstatus.io" className="link">api@mcstatus.io</a>.</p>
						</section>
					</div>
					<nav className="lg:border-l-2 border-l-neutral-200 dark:border-l-neutral-700 lg:ml-24 lg:pl-12 py-2 mb-8 lg:mb-0">
						<ol className="sticky top-24">
							<li>
								<a href="#overview" className="font-bold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
									Overview
								</a>
								<ol className="pl-6">
									<li className="mt-1">
										<a href="#standards" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Standards
										</a>
									</li>
									<li className="mt-1">
										<a href="#cache" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Cache
										</a>
									</li>
									<li className="mt-1">
										<a href="#supported" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Supported Versions
										</a>
									</li>
								</ol>
							</li>
							<li className="mt-1">
								<a href="#routes" className="font-bold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
									Routes
								</a>
								<ol className="pl-6">
									<li className="mt-1">
										<a href="#java-status" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Java Status
										</a>
									</li>
									<li className="mt-1">
										<a href="#bedrock-status" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Bedrock Status
										</a>
									</li>
									<li className="mt-1">
										<a href="#icon" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
											Icon
										</a>
									</li>
								</ol>
							</li>
							<li className="mt-1">
								<a href="#support" className="font-bold text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white motion-safe:transition-colors">
									Support
								</a>
							</li>
						</ol>
					</nav>
				</div>
			</Container>
			<script type="application/ld+json" dangerouslySetInnerHTML={{
				__html: JSON.stringify([
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						'itemListElement': [
							{
								'@type': 'ListItem',
								'position': 1,
								'name': 'Home',
								'item': 'https://mcstatus.io'
							},
							{
								'@type': 'ListItem',
								'position': 2,
								'name': 'API Documentation',
								'item': 'https://mcstatus.io/docs'
							}
						]
					},
					{
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'url': 'https://mcstatus.io',
						'potentialAction': {
							'@type': 'SearchAction',
							'target': {
								'@type': 'EntryPoint',
								'urlTemplate': 'https://mcstatus.io/status/java/{host}'
							},
							'query-input': 'required name=host'
						}
					}
				])
			}} />
		</>
	);
}