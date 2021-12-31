import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import style from './[address].module.sass';

export default function Status() {
	const inputElem = useRef(null);
	const bedrockElem = useRef(null);
	const { push, query, pathname } = useRouter();
	const [error, setError] = useState(false);
	const [debug, setDebug] = useState(false);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => (async () => {
		if (!query.address) return;

		setLoading(true);

		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/${query.bedrock ? 'bedrock' : 'java'}/${query.address}`);
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

		if (!inputElem || !inputElem.current || inputElem.current.value.length < 1) return;

		setLoading(true);
		setError(null);

		push(`/status/${inputElem.current.value.toLowerCase()}${bedrockElem && bedrockElem.current && bedrockElem.current.checked ? '?bedrock=true' : ''}`);
	};

	const onChange = () => {
		if (!inputElem || !inputElem.current) return;

		setError(inputElem.current.value.length < 1);
	};

	let content = (
		<p className="has-text-danger">Failed to retrieve the status of the specified server.</p>
	);

	if (loading) {
		content = (
			<ContentLoader viewBox="0 0 1200 400" uniqueKey="result-loader">
				<rect x="0" y="0" width="1200" height="400" rx="3" ry="3" />
			</ContentLoader>
		);
	} else if (result) {
		if (result.errors) {
			content = (
				<p className="has-text-danger">{result.errors.join('\n')}</p>
			);
		} else if (result.online) {
			if (query.bedrock) {
				content = (
					<>
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
									<th className={style.label}>Edition</th>
									<td>{result.response.edition}</td>
								</tr>
								<tr>
									<th className={style.label}>Version</th>
									<td>{result.response.version}</td>
								</tr>
								<tr>
									<th className={style.label}>Players</th>
									<td>{result.response.online_players} / {result.response.max_players}</td>
								</tr>
								<tr>
									<th className={style.label}>Gamemode</th>
									<td>
										<span>{result.response.gamemode}</span>
										<span className="has-text-grey"> ({result.response.gamemode_id})</span>
									</td>
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
											<th className={style.label}>Server Port</th>
											<td>IPv4: {result.response.port_ipv4} / IPv6: {result.response.port_ipv6}</td>
										</tr>
										: null
								}
								{
									debug
										? <tr>
											<th className={style.label}>Protocol Version</th>
											<td>{result.response.protocol_version}</td>
										</tr>
										: null
								}
							</tbody>
						</table>
						<button type="button" className="button is-link" onClick={() => setDebug(!debug)}>{debug ? 'Hide' : 'Show'} debug info</button>
					</>
				);
			} else {
				content = (
					<>
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
							</tbody>
						</table>
						<button type="button" className="button is-link" onClick={() => setDebug(!debug)}>{debug ? 'Hide' : 'Show'} debug info</button>
					</>
				);
			}
		}
	}

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
									<input type="text" className={`input ${error ? 'is-danger' : ''}`} id="address" placeholder="play.hypixel.net" defaultValue={query.address} spellCheck="false" autoComplete="false" onChange={onChange} ref={inputElem} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" defaultChecked={query.bedrock} ref={bedrockElem} />
								<span>Bedrock server</span>
							</label>
						</div>
						<div className="column is-flex-grow-0 pl-1">
							<button type="submit" className={`button is-link ${loading ? 'is-loading' : ''}`} disabled={loading}>Submit</button>
						</div>
					</div>
				</form>
				<div className="box">
					{content}
				</div>
			</div>
		</>
	);
}