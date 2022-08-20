import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';
import ContentLoader from 'react-content-loader';
import Ad from '../../../components/Ad';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';
import StatusLayout from '../../../layouts/StatusLayout';

export default function Status({ address }) {
	const [result, setResult] = useState(null);
	const [showAPIUsage, setShowAPIUsage] = useState(false);

	useEffect(() => {
		setResult(null);

		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/bedrock/${address}`);

				console.log(result);

				if (result.status === 200) {
					const body = await result.json();

					setResult(body);
				} else {
					const body = await result.text();

					console.error(body);

					setResult({ error: body });
				}
			} catch (e) {
				console.error(e);

				setResult({ error: e.message ?? e.toString() });
			}
		})();
	}, [address]);

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
			<StatusLayout host={address} bedrock>
				{
					result
						? result.error
							? <article className="message is-danger">
								<div className="message-body">
									{result.error ?? 'Failed to retrieve the status of the specified server.'}
								</div>
							</article>
							: <>
								<div className="box table-overflow-wrapper">
									<table className="table is-fullwidth is-hoverable">
										<tbody>
											<tr>
												<th>Status</th>
												<td>
													{
														result.online
															? <span className="tag is-success">Online</span>
															: <span className="tag is-danger">Offline</span>
													}
												</td>
											</tr>
											<tr>
												<th>Hostname</th>
												<td>{result.host}</td>
											</tr>
											<tr>
												<th>Port</th>
												<td>{result.port}</td>
											</tr>
											{
												result.online
													? <>
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
													</>
													: null
											}
										</tbody>
									</table>
								</div>
								<Ad className="my-5" />
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
														<code>https://api.mcstatus.io/v2/status/bedrock/{address}</code>
													</p>
													<p className="has-text-weight-bold">Response Body</p>
													<Highlight className="language-json p-3">{JSON.stringify(result, null, 4)}</Highlight>
													<p>Refer to the <Link href="/docs/v2">API documentation</Link> for more information about this response.</p>
												</div>
											</div>
											: null
									}
								</div>
							</>
						: <div className="box">
							<ContentLoader viewBox="0 0 1200 390" uniqueKey="result-loader" foregroundColor="rgba(0, 0, 0, 0.1)" backgroundColor="rgba(0, 0, 0, 0.2)">
								<rect x="0" y="0" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="0" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="50" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="50" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="100" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="100" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="150" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="150" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="200" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="200" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="250" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="250" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="300" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="300" width="940" height="40" rx="3" ry="3" />
								<rect x="0" y="350" width="240" height="40" rx="3" ry="3" />
								<rect x="260" y="350" width="940" height="40" rx="3" ry="3" />
							</ContentLoader>
						</div>
				}
			</StatusLayout>
		</>
	);
}

Status.propTypes = {
	address: PropTypes.string.isRequired
};

export async function getServerSideProps({ query: { address } }) {
	return { props: { address } };
}