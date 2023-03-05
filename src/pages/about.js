import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Ad from '../components/Ad';
import Header from '../components/Header';
import Container from '../components/Container';
import Collapsible from '../components/Collapsible';
import Footer from '../components/Footer';
import HelpCircleIcon from '!!@svgr/webpack!../assets/icons/help-circle.svg';
import MailIcon from '!!@svgr/webpack!../assets/icons/mail.svg';

const frequentlyAskedQuestions = [
	{
		title: 'How do I check the status of a server?',
		content: <p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code> for Java Edition servers and <code>19132</code> for Bedrock Edition servers.</p>
	},
	{
		title: 'How do I hide the status of my server?',
		content: <p>Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu.</p>
	},
	{
		title: 'Does this service use query?',
		content: <p>We intentionally chose not to use query in this service because it slows down any status retrieval, and it also does not provide much more information than the data sent by the status protocol.</p>
	},
	{
		title: 'How do I see all players on the server?',
		content: <p>Minecraft limits the amount of player names sent by the server to 12 players, picked at random. Most public servers have this feature disabled entirely, or they modify the player names to customized information about the server. Just look at the player list of <Link href="/status/java/play.purpleprison.net" className="link">play.purpleprison.net</Link> for example.</p>
	},
	{
		title: 'Why don\'t you show the ping to the server?',
		content: <p>The latency to the server is only measured from the location of our service hosting provider, which is irrelevant to show because your connection to the server is going to be a lot different. It would not make sense to show this data in the response.</p>
	},
	{
		title: 'Why is there not a new-line character in some MOTDs?',
		content: <p>Some servers will use character overflows to write text onto the second line of the MOTD. Since Minecraft uses a non-monospaced font, it is almost impossible to figure out where the MOTD splits into a new line outside of the game itself. An example of this is <Link href="/status/java/play.purpleprison.net" className="link">play.purpleprison.net</Link>, notice how the entire MOTD is one line.</p>
	},
	{
		title: 'Is this service open-source?',
		content: <p>Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href="https://github.com/mcstatus-io" className="link">our GitHub organization</a>.</p>
	}
];

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
			<Navbar active="about" />
			<Container>
				<section>
					<hgroup>
						<Header size={1}>About</Header>
						<p className="text-2xl font-light mt-2">A quick understanding of what we do</p>
					</hgroup>
					<p className="mt-5">mcstatus.io was created as a utility for people to check the status of a Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <a href="https://mcsrvstat.us" className="link">mcsrvstat.us</a> but aimed at improving consistency and conformity to standards. The website is built using <a href="https://nextjs.org" className="link">NextJS</a> and the back-end was built with <a href="https://golang.org" className="link">Go</a>. This site uses clean advertising from <a href="https://www.carbonads.net/" className="link">Carbon Ads</a> to help cover the hosting and development costs.</p>
				</section>
				<section>
					<div className="flex items-center gap-6 md:ml-6 mt-12">
						<HelpCircleIcon width="28" height="28" className="hidden md:block" />
						<hgroup>
							<Header size={2}>Frequently Asked Questions</Header>
							<p className="text-lg font-light">Answers to commonly asked questions</p>
						</hgroup>
					</div>
					<ul className="flex flex-col gap-3 mt-5">
						{
							frequentlyAskedQuestions.map((item, index) => (
								<li key={index}>
									<Collapsible title={item.title} id={`faq-${index}`}>
										{item.content}
									</Collapsible>
								</li>
							))
						}
					</ul>
				</section>
				<section>
					<div className="flex items-center gap-6 md:ml-6 mt-12">
						<MailIcon width="28" height="28" className="hidden md:block" />
						<hgroup>
							<Header size={2}>Contact</Header>
							<p className="text-lg font-light">How to contact me if needed</p>
						</hgroup>
					</div>
					<p className="mt-5">If you wish to contact me, please do so using <a href="mailto:contact@mcstatus.io" className="link">contact@mcstatus.io</a>. I accept any sort of feedback on our service including bug reports, feature suggestions, questions about usage, etc.</p>
				</section>
				<Ad className="mt-5" />
			</Container>
			<Footer />
			<Script type="application/ld+json" strategy="afterInteractive" id="google-structured">
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
				"name": "About",
				"item": "https://mcstatus.io/about"
			}
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "How do I check the status of a server?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code> for Java Edition servers and <code>19132</code> for Bedrock Edition servers.</p>"
				}
			},
			{
				"@type": "Question",
				"name": "What is an SRV record?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "An SRV record is created by the server admin to tell Minecraft clients to connect to a specific server by default. This is typically done by network servers to initially connect players to the lobby, or to specify which server a player should connect to by default if the admin is also hosting other servers on the same network."
				}
			},
			{
				"@type": "Question",
				"name": "How do I hide the status of my server?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "<p>Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu.</p>"
				}
			},
			{
				"@type": "Question",
				"name": "Does this service use query?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "We intentionally chose not to use query in this service because it slows down any status retrieval, and it also does not provide much more information than the data sent by the status protocol."
				}
			},
			{
				"@type": "Question",
				"name": "How do I see all players on the server?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "<p>Minecraft limits the amount of player names sent by the server to 12 players, picked at random. Most public servers have this feature disabled entirely, or they modify the player names to customized information about the server. Just look at the player list of <a href=https://mcstatus.io/status/java/play.purpleprison.net>play.purpleprison.net</a> for example.</p>"
				}
			},
			{
				"@type": "Question",
				"name": "Why don't you show the ping to the server?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "The latency to the server is only measured from the location of our service hosting provider, which is irrelevant to show because your connection to the server is going to be a lot different. It would not make sense to show this data in the response."
				}
			},
			{
				"@type": "Question",
				"name": "Is this service open-source?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "<p>Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href=https://github.com/mcstatus-io>our GitHub organization</a>.</p>"
				}
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
			</Script>
		</>
	);
}

About.propTypes = {
	user: PropTypes.object
};