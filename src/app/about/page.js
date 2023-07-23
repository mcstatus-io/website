import Link from 'next/link';
import HelpCircleIcon from '@/assets/icons/help-circle.svg';
import MailIcon from '@/assets/icons/mail.svg';
import Ad from '@/components/Ad';
import Collapsible from '@/components/Collapsible';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';

const frequentlyAskedQuestions = [
	{
		title: 'How do I check the status of a server?',
		content: <p className="leading-7">Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code> for Java Edition servers and <code>19132</code> for Bedrock Edition servers.</p>,
		textContent: '<p>Simply paste the address of the server into the address box on the home page. The address is in the form of <code>host:port</code> but the port is optional and defaults to <code>25565</code> for Java Edition servers and <code>19132</code> for Bedrock Edition servers.</p>'
	},
	{
		title: 'How do I hide the status of my server?',
		content: <p className="leading-7">Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu.</p>,
		textContent: '<p>Status is enabled by default in the <code>server.properties</code> file of your server. In order to disable this, set the <code>enable-status</code> property to <code>false</code>. Please note that this will also prevent actual Minecraft clients from seeing your MOTD in the in-game multiplayer menu.</p>'
	},
	{
		title: 'Does this service use query?',
		content: <p className="leading-7">Yes, the Java Edition status route checks the query information of the server at the same time it is checking the status information. If the information is available, it is added to the response.</p>,
		textContent: '<p>Yes, the Java Edition status route checks the query information of the server at the same time it is checking the status information. If the information is available, it is added to the response.</p>'
	},
	{
		title: 'How do I see all players on the server?',
		content: <p className="leading-7">Minecraft limits the amount of player names sent by the server to 12 players, picked at random. Most public servers have this feature disabled entirely, or they modify the player names to customized information about the server. Just look at the player list of <Link href="/status/java/play.purpleprison.net" className="link link-contrast">play.purpleprison.net</Link> for example.</p>,
		textContent: '<p>Minecraft limits the amount of player names sent by the server to 12 players, picked at random. Most public servers have this feature disabled entirely, or they modify the player names to customized information about the server. Just look at the player list of <a href="https://mcstatus.io/status/java/play.purpleprison.net">play.purpleprison.net</a> for example.</p>'
	},
	{
		title: 'Why don\'t you show the ping to the server?',
		content: <p className="leading-7">The latency to the server is only measured from the location of our service hosting provider, which is irrelevant to show because your connection to the server is going to be a lot different. It would not make sense to show this data in the response.</p>,
		textContent: '<p>The latency to the server is only measured from the location of our service hosting provider, which is irrelevant to show because your connection to the server is going to be a lot different. It would not make sense to show this data in the response.</p>'
	},
	{
		title: 'Why is there not a new-line character in some MOTDs?',
		content: <p className="leading-7">Some servers will use character overflows to write text onto the second line of the MOTD. Since Minecraft uses a non-monospaced font, it is almost impossible to figure out where the MOTD splits into a new line outside of the game itself. An example of this is <Link href="/status/java/play.purpleprison.net" className="link link-contrast">play.purpleprison.net</Link>, notice how the entire MOTD is one line.</p>,
		textContent: '<p>Some servers will use character overflows to write text onto the second line of the MOTD. Since Minecraft uses a non-monospaced font, it is almost impossible to figure out where the MOTD splits into a new line outside of the game itself. An example of this is <a href="https://mcstatus.io/status/java/play.purpleprison.net">play.purpleprison.net</a>, notice how the entire MOTD is one line.</p>'
	},
	{
		title: 'I made a library, how do I add it to the API docs?',
		content: <p className="leading-7">You can <a href="https://github.com/mcstatus-io/website/issues/new" className="link link-contrast">open a GitHub issue</a> with details about your library and I will get it added to the website for you.</p>,
		textContent: '<p>You can <a href="https://github.com/mcstatus-io/website/issues/new">open a GitHub issue</a> with details about your library and I will get it added to the website for you.</p>'
	},
	{
		title: 'My IP address was banned from the API, how do I appeal?',
		content: <p className="leading-7">Most IP bans are because of mass spam requests to the API. Mass requests may cause a disruption in service for other developers who are looking to use the API. You may request to be unbanned by providing an explanation when you email <a href="mailto:api@mcstatus.io" className="link link-contrast">api@mcstatus.io</a>.</p>,
		textContent: '<p>Most IP bans are because of mass spam requests to the API. Mass requests may cause a disruption in service for other developers who are looking to use the API. You may request to be unbanned by providing an explanation when you email <a href="mailto:api@mcstatus.io">api@mcstatus.io</a>.</p>'
	},
	{
		title: 'Is this service open-source?',
		content: <p className="leading-7">Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href="https://github.com/mcstatus-io" className="link link-contrast">our GitHub organization</a>.</p>,
		textContent: '<p>Yes, this service is entirely open source and available for anybody to review or host your own. The source code is available on <a href="https://github.com/mcstatus-io">our GitHub organization</a>.</p>'
	},
	{
		title: 'What is demo.mcstatus.io?',
		content: <p className="leading-7"><Link href="/status/java/demo.mcstatus.io" className="link">demo.mcstatus.io</Link> is a fake Minecraft server hosted on our network with the intention of showing off all features our service supports. You are not able to connect to this server because it was built from scratch with only the status and query protocol supported. If you do try to connect, your player name is put into the sample players response and you can view it on our website. Go ahead and give it a try if you really want to. If you would like to learn more about how this demo server works, it is <a href="https://github.com/mcstatus-io/demo-server" className="link">open-sourced on our GitHub organization</a>.</p>,
		textContent: '<p><a href="https://mcstatus.io/status/java/demo.mcstatus.io">demo.mcstatus.io</a> is a fake Minecraft server hosted on our network with the intention of showing off all features our service supports. You are not able to connect to this server because it was built from scratch with only the status and query protocol supported. If you do try to connect, your player name is put into the sample players response and you can view it on our website. Go ahead and give it a try if you really want to. If you would like to learn more about how this demo server works, it is <a href="https://github.com/mcstatus-io/demo-server">open-sourced on our GitHub organization</a>.</p>'
	}
];

export const metadata = {
	title: 'About',
	description: 'Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers.',
	openGraph: {
		title: 'About - Minecraft Server Status',
		description: 'Learn about our Minecraft server status retrieval tool and what you can do with it, or read into our frequently asked questions and answers.',
		url: '/about',
		siteName: 'Minecraft Server Status',
		images: [
			{
				url: '/img/icon.png',
				width: 300,
				height: 300
			}
		],
		locale: 'en-US',
		type: 'website'
	},
	alternates: {
		canonical: '/about'
	}
};

export default function Page() {
	return (
		<>
			<Navbar active="about" />
			<Container>
				<section>
					<hgroup>
						<h1 className="title">About</h1>
						<p className="subtitle">A quick understanding of what we do</p>
					</hgroup>
					<p className="mt-5 leading-7">mcstatus.io was created as a utility for people to check the status of a Minecraft server for any purpose. This service also doubles as an API for developers to programmatically check the status of servers. The design of the website was heavily inspired by the simplicity of <a href="https://mcsrvstat.us" className="link">mcsrvstat.us</a> but aimed at improving consistency and conformity to standards. The website is built using <a href="https://nextjs.org" className="link">NextJS</a> and the back-end was built with <a href="https://golang.org" className="link">Go</a>. This site uses clean advertising from <a href="https://www.carbonads.net/" className="link">Carbon Ads</a> to help cover the hosting and development costs.</p>
				</section>
				<Ad className="mt-5" />
				<section>
					<div className="flex items-center gap-6 md:ml-6 mt-12">
						<HelpCircleIcon width="28" height="28" className="hidden md:block" />
						<hgroup>
							<h2 className="title">Frequently Asked Questions</h2>
							<p className="subtitle">Answers to commonly asked questions</p>
						</hgroup>
					</div>
					<ul className="list-none flex flex-col gap-3 mt-5">
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
							<h2 className="title">Contact</h2>
							<p className="subtitle">How to contact me if needed</p>
						</hgroup>
					</div>
					<p className="mt-5 leading-7">If you wish to contact me, please do so using <a href="mailto:contact@mcstatus.io" className="link">contact@mcstatus.io</a>. I accept any sort of feedback on our service including bug reports, feature suggestions, questions about usage, etc.</p>
				</section>
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
								'name': 'About',
								'item': 'https://mcstatus.io/about'
							}
						]
					},
					{
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						'mainEntity': frequentlyAskedQuestions.map((item) => ({
							'@type': 'Question',
							'name': item.title,
							'acceptedAnswer': {
								'@type': 'Answer',
								'text': item.textContent
							}
						}))
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