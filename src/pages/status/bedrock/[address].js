import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import humanizeDuration from 'humanize-duration';
import Highlight from 'react-highlight';
import Formatted from '../../../components/Formatted';
import Search from '../../../components/Search';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';

export default function Status({ address, result, error, cache }) {
	const [showDebug, setShowDebug] = useState(false);
	const [showAPIUsage, setShowAPIUsage] = useState(false);

	return (
		<>
			<Head>
				<title>{address} - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content={`${address} - Minecraft Server Status`} />
				<meta name="description" content={result?.response?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/status/bedrock/${address}`} />
				<meta property="og:title" content={`${address} - Minecraft Server Status`} />
				<meta property="og:description" content={result?.response?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href={`https://mcstatus.io/status/bedrock/${address}`} />
			</Head>
			<h1 className="title">Minecraft Server Status</h1>
			<Search initialValues={{ host: address, bedrock: true }} />
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
											<Formatted content={result.response.motd.raw} />
										</td>
									</tr>
									<tr>
										<th>Edition</th>
										<td>
											{
												result.response.edition !== null
													? <span>{result.response.edition}</span>
													: <span className="has-text-grey">N/A</span>
											}
										</td>
									</tr>
									<tr>
										<th>Version</th>
										<td>
											{
												result.response.version !== null
													? <span>{result.response.version}</span>
													: <span className="has-text-grey">N/A</span>
											}
										</td>
									</tr>
									<tr>
										<th>Players</th>
										<td>
											{
												result.response.online_players !== null
													? <span>{result.response.online_players}</span>
													: <span className="has-text-grey">N/A</span>
											}
											<span> / </span>
											{
												result.response.max_players !== null
													? <span>{result.response.max_players}</span>
													: <span className="has-text-grey">N/A</span>
											}
										</td>
									</tr>
									<tr>
										<th>Gamemode</th>
										<td>
											{result.response.gamemode ?? <span className="has-text-grey">{result.response.gamemode}</span>}
											<span className="has-text-grey"> (
												{
													result.response.gamemode_id !== null
														? <span>{result.response.gamemode_id}</span>
														: <span className="has-text-grey">N/A</span>
												}
												)</span>
										</td>
									</tr>
									{
										showDebug
											? <>
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
													<th>SRV Record</th>
													<td>
														{
															result.response.srv_record
																? <span className="tag is-success">Yes</span>
																: <span className="tag is-danger">No</span>
														}
													</td>
												</tr>
												<tr>
													<th>Server Port</th>
													<td>
														<span>IPv4: </span>
														{
															result.response.port_ipv4 !== null
																? <span>{result.response.port_ipv4}</span>
																: <span className="has-text-grey">N/A</span>
														}
														<span> / IPv6: </span>
														{
															result.response.port_ipv6 !== null
																? <span>{result.response.port_ipv6}</span>
																: <span className="has-text-grey">N/A</span>
														}
													</td>
												</tr>
												<tr>
													<th>Protocol Version</th>
													<td>{result.response.protocol_version}</td>
												</tr>
												<tr>
													<th>Cached Response</th>
													<td>
														{
															cache
																? <span className="tag is-success" title={`${humanizeDuration(parseInt(cache) * 1000, { round: true })} remaining`}>Yes</span>
																: <span className="tag is-danger">No</span>
														}
													</td>
												</tr>
											</>
											: null
									}
								</tbody>
							</table>
							<button type="button" className="button is-link" onClick={() => setShowDebug(!showDebug)}>{showDebug ? 'Hide' : 'Show'} debug info</button>
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
		</>
	);
}

Status.propTypes = {
	address: PropTypes.string.isRequired,
	result: PropTypes.object,
	error: PropTypes.string,
	cache: PropTypes.string
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

		return { props: { address, result: body, cache: result.headers.get('x-cache-time-remaining') } };
	} catch (e) {
		return { props: { address, error: e.message } };
	}
}