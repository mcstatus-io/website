import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import config from '../../../config';
import style from './[address].module.sass';
import humanizeDuration from 'humanize-duration';

export default function Status() {
	const input = useRef(null);
	const { push, query, pathname } = useRouter();
	const [error, setError] = useState(false);
	const [debug, setDebug] = useState(false);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => (async () => {
		if (!query.address) return;

		setLoading(true);

		try {
			const result = await fetch(`${config.apiHost}/status/java/${query.address}`);
			const body = await result.json();

			setResult(body);
		} catch (e) {
			setResult({ errors: [e?.message ?? e.toString()] });

			console.error(e);
		}

		setLoading(false);
	})(), [query]);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!input || !input.current || input.current.value.length < 1 || input.current.value.toLowerCase() === query.address.toLowerCase()) return;

		push(`/status/java/${input.current.value.toLowerCase()}`);
	};

	const onChange = () => {
		if (!input || !input.current) return;

		setError(input.current.value.length < 1);
	};

	return (
		<>
			<Head>
				<title>{query.address ?? 'Loading'} - mcstatus.io</title>
				<meta name="robots" content="noindex,follow" />
				<meta name="title" content={`${query.address ?? 'Loading'} - mcstatus.io`} />
				<meta name="description" content={`Easily and quickly retrieve the status of ${query.address ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content={`${query.address ?? 'Loading'} - mcstatus.io`} />
				<meta property="og:description" content={`Easily and quickly retrieve the status of ${query.address ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container">
				<form onSubmit={onSubmit} className="mb-5" spellCheck="false" autoComplete="false">
					<div className="columns">
						<div className="column is-flex-grow-1 pr-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${error ? 'is-danger' : ''}`} id="address" placeholder="play.hypixel.net" defaultValue={query.address} spellCheck="false" autoComplete="false" onChange={onChange} ref={input} />
								</div>
							</div>
						</div>
						<div className="column is-flex-grow-0 pl-1">
							<button type="submit" className={`button is-link ${loading ? 'is-loading' : ''}`} disabled={loading}>Submit</button>
						</div>
					</div>
				</form>
				<div className="box">
					{
						loading
							? <ContentLoader viewBox="0 0 1200 400" uniqueKey="result-loader">
								<rect x="0" y="0" width="1200" height="400" rx="3" ry="3" />
							</ContentLoader>
							: result.errors
								? <p className="has-text-danger">{result.errors.join('\n')}</p>
								: result.online
									? <>
										<table className="table is-fullwidth is-hoverable">
											<tbody>
												<tr>
													<th className={style.label}>Hostname</th>
													<td>{result.host}</td>
												</tr>
												<tr>
													<th className={style.label}>Port</th>
													<td>{result.port}</td>
												</tr>
												<tr>
													<th className={style.label}>MOTD</th>
													<td>
														<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.response.motd.html }} />
													</td>
												</tr>
												<tr>
													<th className={style.label}>Favicon</th>
													<td>
														{
															result.response.favicon
																? <img src={result.response.favicon} />
																: <p className="has-text-grey">N/A</p>
														}
													</td>
												</tr>
												<tr>
													<th className={style.label}>Version</th>
													<td>
														{
															result.response.version?.name
																? <span>{result.response.version.name}</span>
																: <span className="has-text-grey">N/A</span>
														}
													</td>
												</tr>
												<tr>
													<th className={style.label}>Players</th>
													<td>{result.response.players.online} / {result.response.players.max}</td>
												</tr>
												{
													debug
														? <tr>
															<th className={style.label}>SRV Lookup</th>
															<td>
																{
																	result.response.srv_record
																		? <span className="tag is-success">Yes</span>
																		: <span className="tag is-danger">No</span>
																}
															</td>
														</tr>
														: null
												}
												{
													debug
														? <tr>
															<th className={style.label}>Protocol Version</th>
															<td>
																{
																	result.response.version?.protocol
																		? <span>{result.response.version.protocol}</span>
																		: <span className="has-text-grey">N/A</span>
																}
															</td>
														</tr>
														: null
												}
												{
													debug
														? <tr>
															<th className={style.label}>Cached Result</th>
															<td>
																{
																	result.cache_record
																		? <p className="tag is-success" title={`Expires in ${humanizeDuration(result.cache_record.expires_at - Date.now(), { largest: 2, round: true })}`}>Yes</p>
																		: <p className="tag is-danger">No</p>
																}
															</td>
														</tr>
														: null
												}
											</tbody>
										</table>
										<button type="button" className="button is-link" onClick={() => setDebug(!debug)}>{debug ? 'Hide' : 'Show'} debug info</button>
									</>
									: <p className="has-text-danger">Failed to retrieve the status of the specified server.</p>
					}
				</div>
			</div>
		</>
	);
}