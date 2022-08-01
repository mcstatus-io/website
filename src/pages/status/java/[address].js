import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Highlight from 'react-highlight';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';
import Search from '../../../components/Search';
import Ad from '../../../components/Ad';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';

export default function Status({ address }) {
	const [result, setResult] = useState(null);
	const [showMods, setShowMods] = useState(false);
	const [showPlayers, setShowPlayers] = useState(false);
	const [showAPIUsage, setShowAPIUsage] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/java/${address}`);

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
				<meta property="og:url" content={`https://mcstatus.io/status/java/${address}`} />
				<meta property="og:title" content={`${address} - Minecraft Server Status`} />
				<meta property="og:description" content={result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content={result?.favicon ?? 'https://mcstatus.io/img/icon.png'} />
				<link rel="canonical" href={`https://mcstatus.io/status/java/${address}`} />
			</Head>
			<div className="container my-5 px-3">
				<Search initialValues={{ host: address, bedrock: false }} />
				<Ad className="my-5" />
				{
					result
						? result.error
							? <article className="message is-danger">
								<div className="message-body">
									{result.error ?? 'Failed to retrieve the status of the specified server.'}
								</div>
							</article>
							: <>
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
												<th>Icon</th>
												<td>
													{
														result.icon
															? <img src={result.icon} />
															: <p className="has-text-grey">N/A</p>
													}
												</td>
											</tr>
											<tr>
												<th>MOTD</th>
												<td>
													<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.motd.html }} />
												</td>
											</tr>
											<tr>
												<th>Version</th>
												<td>
													{
														result.version?.name_raw
															? result.version.name_raw === result.version.name_clean
																? <span>{result.version.name_clean}</span>
																: <pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.version.name_html }} />
															: <span className="has-text-grey">N/A (&lt; 1.3)</span>
													}
												</td>
											</tr>
											<tr>
												<th>Players</th>
												<td>
													<span>{result.players.online} / {result.players.max}</span>
													{
														result.players.list.length > 0
															? <button type="button" className="button is-link is-small is-vertically-aligned ml-3" onClick={() => setShowPlayers(!showPlayers)}>{showPlayers ? 'Hide' : 'Show'} player list</button>
															: null
													}
													{
														showPlayers
															? <pre className="has-background-black mt-3" dangerouslySetInnerHTML={{ __html: result.players.list.map((player) => player.name_html).join('<br />') }} />
															: null
													}
												</td>
											</tr>
											{
												result.mods.length > 0
													? <tr>
														<th>Mods Loaded</th>
														<td>
															<span>{result.mods.length} mod{result.mods.length === 1 ? '' : 's'} loaded</span>
															{
																result.mods.length > 0
																	? <button type="button" className="button is-link is-small is-vertically-aligned ml-3" onClick={() => setShowMods(!showMods)}>{showMods ? 'Hide' : 'Show'} mod info</button>
																	: null
															}
															{
																showMods
																	? <div className="tags mt-2">
																		{
																			result.mods.map((mod, index) => (
																				<span className="tag is-link" key={index}>{mod.name}: v{mod.version}</span>
																			))
																		}
																	</div>
																	: null
															}
														</td>
													</tr>
													: null
											}
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
														<code>https://api.mcstatus.io/v1/status/java/{address}</code>
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
						: <div className="box">
							<ContentLoader viewBox="0 0 1200 390" uniqueKey="result-loader">
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
			</div>
		</>
	);
}

Status.propTypes = {
	address: PropTypes.string.isRequired
};

export function getServerSideProps({ query: { address } }) {
	return { props: { address } };
}