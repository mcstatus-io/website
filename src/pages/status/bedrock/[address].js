import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import Search from '../../../components/Search';
import Ad from '../../../components/Ad';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';

export default function Status({ address, result, error }) {
	const [showAPIUsage, setShowAPIUsage] = useState(false);

	return (
		<>
			<Head>
				<title>{address} - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content={`${address} - Minecraft Server Status`} />
				<meta name="description" content={result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/status/bedrock/${address}`} />
				<meta property="og:title" content={`${address} - Minecraft Server Status`} />
				<meta property="og:description" content={result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href={`https://mcstatus.io/status/bedrock/${address}`} />
			</Head>
			<div className="container my-5 px-3">
				<h1 className="title">Minecraft Server Status</h1>
				<Search initialValues={{ host: address, bedrock: true }} />
				<Ad className="my-5" />
				{
					result
						? <>
							<div className="box">
								<table className="table is-fullwidth is-hoverable">
									<tbody>
										<tr>
											<th>Hostname</th>
											<td>{result.host}</td>
										</tr>
										<tr>
											<th>Port</th>
											<td>{result.port}</td>
										</tr>
										<tr>
											<th>MOTD</th>
											<td>
												<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.motd.html }} />
											</td>
										</tr>
										<tr>
											<th>Edition</th>
											<td>
												{
													result.edition !== null
														? <span>{result.edition}</span>
														: <span className="has-text-grey">N/A</span>
												}
											</td>
										</tr>
										<tr>
											<th>Version</th>
											<td>
												{
													result.version?.name
														? <span>{result.version.name}</span>
														: <span className="has-text-grey">N/A</span>
												}
											</td>
										</tr>
										<tr>
											<th>Players</th>
											<td>
												{
													result.players?.online
														? <span>{result.players.online}</span>
														: <span className="has-text-grey">N/A</span>
												}
												<span> / </span>
												{
													result.players?.max
														? <span>{result.players.max}</span>
														: <span className="has-text-grey">N/A</span>
												}
											</td>
										</tr>
										<tr>
											<th>Gamemode</th>
											<td>
												{
													result.gamemode
														? <span>{result.gamemode}</span>
														: <span className="has-text-grey">N/A</span>
												}
											</td>
										</tr>
										<tr>
											<th>EULA Blocked</th>
											<td>
												{
													result.eula_blocked
														? <span className="tag is-danger">Yes</span>
														: <span className="tag is-success">No</span>
												}
											</td>
										</tr>
										<tr>
											<th>Protocol Version</th>
											<td>
												{
													result.version?.protocol
														? <span>{result.version.protocol}</span>
														: <span className="has-text-grey">N/A</span>
												}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="card">
								<header className="card-header is-clickable" onClick={() => setShowAPIUsage(!showAPIUsage)}>
									<p className="card-header-title">
										API Usage
									</p>
									<button className="card-header-icon" aria-label="more options">
										<span className="icon">
											{
												showAPIUsage
													? <img src={chevronUp.src} className="is-vertically-aligned" alt="Chevron up" width="14" height="16" />
													: <img src={chevronDown.src} className="is-vertically-aligned" alt="Chevron down" width="14" height="16" />
											}
										</span>
									</button>
								</header>
								{
									showAPIUsage
										? <div className="card-content">
											<div className="content">
												<p>
													<span className="tag is-success mr-2">GET</span>
													<code>https://api.mcstatus.io/v1/status/bedrock/{address}</code>
												</p>
												<p className="has-text-weight-bold">Response Body</p>
												<Highlight className="language-json p-3">{JSON.stringify(result, null, 4)}</Highlight>
												<p>Refer to the <Link href="/docs">API documentation</Link> for more information about this response.</p>
											</div>
										</div>
										: null
								}
							</div>
						</>
						: <article className="message is-danger">
							<div className="message-body">
								{error ?? 'Failed to retrieve the status of the specified server.'}
							</div>
						</article>
				}
			</div>
		</>
	);
}

Status.propTypes = {
	address: PropTypes.string.isRequired,
	result: PropTypes.object,
	error: PropTypes.string
};

export async function getServerSideProps({ query: { address } }) {
	try {
		const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/bedrock/${address}`);
		const body = await result.json();

		if (body.errors) {
			return { props: { address, error: body.errors[0] } };
		}

		if (!body.online) {
			return { props: { address, error: 'Failed to retrieve the status of the specified server.' } };
		}

		return { props: { address, result: body } };
	} catch (e) {
		return { props: { address, error: e.message } };
	}
}