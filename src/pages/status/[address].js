import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import { parse, toHTML } from 'minecraft-motd-util';

export default function Status() {
	const inputElem = useRef(null);
	const bedrockElem = useRef(null);
	const { push, query, pathname } = useRouter();
	const [error, setError] = useState(false);
	const [debug, setDebug] = useState(false);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cache, setCache] = useState(null);

	useEffect(() => (async () => {
		if (!query.address) return;

		setLoading(true);

		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/${query.bedrock ? 'bedrock' : 'java'}/${query.address}`);
			const body = await result.json();

			setResult(body);
			setCache(result.headers.get('x-cache-hit') === 'TRUE');
		} catch (e) {
			setResult({ errors: [e?.message ?? e.toString()] });

			console.error(e);
		}

		setLoading(false);
	})(), [query]);

	const onSubmit = (event) => {
		event.preventDefault();

		if (
			!inputElem
			|| !inputElem.current
			|| inputElem.current.value.length < 1
			|| !bedrockElem
			|| !bedrockElem.current
			|| (
				inputElem.current.value === query.address
				&& !bedrockElem.current.checked
			)
		) return;

		setLoading(true);
		setError(null);

		push(`/${bedrockElem && bedrockElem.current && bedrockElem.current.checked ? 'bedrock' : 'status'}/${inputElem.current.value.toLowerCase()}`);
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
		);
	} else if (result) {
		if (result.errors) {
			content = (
				<p className="has-text-danger">{result.errors.join('\n')}</p>
			);
		} else if (result.online) {
			let information = null;

			if (result.response.players.sample?.length > 0) {
				information = [];

				for (const player of result.response.players.sample) {
					const parsed = parse(player.name);

					information.push(
						<p dangerouslySetInnerHTML={{ __html: toHTML(parsed) }} key={player.id} />
					);
				}

				console.log(result.response.players);
			}

			content = (
				<>
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
								<td className="motd-container">
									<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.response.motd.html }} />
								</td>
							</tr>
							<tr>
								<th>Information</th>
								<td>
									{
										information
											? <pre className="has-background-black has-text-white">{information}</pre>
											: <p className="has-text-grey">N/A</p>
									}
								</td>
							</tr>
							<tr>
								<th>Favicon</th>
								<td>
									{
										result.response.favicon
											? <img src={result.response.favicon} />
											: <p className="has-text-grey">N/A</p>
									}
								</td>
							</tr>
							<tr>
								<th>Version</th>
								<td>
									{
										result.response.version?.name
											? <span>{result.response.version.name}</span>
											: <span className="has-text-grey">N/A (&lt; 1.3)</span>
									}
								</td>
							</tr>
							<tr>
								<th>Players</th>
								<td>{result.response.players.online} / {result.response.players.max}</td>
							</tr>
							{
								debug
									? <tr>
										<th>SRV Record</th>
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
										<th>Protocol Version</th>
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
										<th>Cached Response</th>
										<td>
											{
												cache
													? <span className="tag is-success">Yes</span>
													: <span className="tag is-danger">No</span>
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
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${error ? 'is-danger' : ''}`} placeholder="play.hypixel.net OR play.hypixel.net:25565" defaultValue={query.address} spellCheck="false" autoComplete="false" onChange={onChange} ref={inputElem} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" defaultChecked={false} ref={bedrockElem} />
								<span>Bedrock server</span>
							</label>
						</div>
						<div className="column is-flex-grow-0">
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