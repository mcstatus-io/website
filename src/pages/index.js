import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import Timer from '../components/Timer';
import config from '../config';

const getShortHost = (server) => `${server.host}${server.port !== 25565 ? ':' + server.port : ''}`;

export default function Home() {
	const { push } = useRouter();
	const [recentServers, setRecentServers] = useState(null);
	const [topServers, setTopServers] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const servers = await fetch(`${config.apiHost}/recent`).then((result) => result.json());
				setRecentServers(servers);
			} catch (e) {
				console.error(e);
			}

			try {
				const servers = await fetch(`${config.apiHost}/top`).then((result) => result.json());
				setTopServers(servers);
			} catch (e) {
				console.error(e);
			}
		};

		setInterval(getData, 1000 * 15);

		getData();
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();

		push(`/status/${event.target[0].value}`);
	};

	return (
		<>
			<Head>
				<title>mcstatus.io - A Minecraft server status utility</title>
			</Head>
			<form onSubmit={onSubmit} autoComplete="off">
				<div className="field">
					<div className="control is-fullwidth">
						<input type="text" className="input" id="address" placeholder="Example: play.hypixel.net" spellCheck="false" />
					</div>
				</div>
			</form>
			<div className="columns mt-5">
				<div className="column is-4">
					<h2 className="title is-4 mb-3">Recently Searched</h2>
					{
						recentServers
							? <aside className="menu">
								<ul className="menu-list">
									{
										recentServers.map((server) => (
											<li key={server.timestamp}>
												<Link href={`/status/${getShortHost(server)}`}>
													<a>
														<span>{getShortHost(server)}</span>
														<span className="tag is-light ml-2"><Timer target={server.lastPingAt} /></span>
													</a>
												</Link>
											</li>
										))
									}
								</ul>
							</aside>
							: <ContentLoader viewBox="0 0 360 400" uniqueKey="recent-servers-loader">
								<rect x="0" y="0" width="360" height="400" rx="3" ry="3" />
							</ContentLoader>
					}
				</div>
				<div className="column is-4">
					<h2 className="title is-4 mb-3">Top Searched</h2>
					{
						topServers
							? <aside className="menu">
								<ul className="menu-list">
									{
										topServers.map((server) => (
											<li key={server.timestamp}>
												<Link href={`/status/${getShortHost(server)}`}>
													<a>
														<span>{getShortHost(server)}</span>
														<span className="tag is-light ml-2">{server.count}</span>
													</a>
												</Link>
											</li>
										))
									}
								</ul>
							</aside>
							: <ContentLoader viewBox="0 0 360 400" uniqueKey="top-servers-loader">
								<rect x="0" y="0" width="360" height="400" rx="3" ry="3" />
							</ContentLoader>
					}
				</div>
			</div>
		</>
	);
}