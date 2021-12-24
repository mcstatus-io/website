import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import { parse, toHTML } from 'minecraft-motd-util';
import config from '../../../config';
import style from './[address].module.sass';

const knownPropertyNames = {
	game_id: 'Game Name',
	gametype: 'Game Type',
	hostip: 'Host IP',
	motd: 'MOTD',
	hostport: 'Host Port',
	map: 'Map Name',
	maxplayers: 'Max Players',
	numplayers: 'Online Players',
	plugins: 'Plugins',
	version: 'Version'
};

export default function Status() {
	const input = useRef(null);
	const { push, query, pathname } = useRouter();
	const [error, setError] = useState(false);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => (async () => {
		if (!query.address) return;

		setLoading(true);

		try {
			const result = await fetch(`${config.apiHost}/query/full/${query.address}`);
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

		push(`/query/full/${input.current.value.toLowerCase()}`);
	};

	const onChange = () => {
		if (!input || !input.current) return;

		setError(input.current.value.length < 1);
	};

	const entries = [];

	if (result && result.online) {
		entries.push(
			<tr key="players">
				<th className={style.label}>Players</th>
				<td>
					{
						result.response.players.length > 0
							? result.response.players.join(', ')
							: <span className="has-text-grey">No players online</span>
					}
				</td>
			</tr>
		);

		for (const prop in result.response.data) {
			switch (prop) {
				case 'hostname': {
					entries.push(
						<tr key={prop}>
							<th className={style.label}>MOTD</th>
							<td><pre className="has-background-black" dangerouslySetInnerHTML={{ __html: toHTML(parse(result.response.data.hostname)) }} /></td>
						</tr>
					);

					break;
				}
				default: {
					entries.push(
						<tr key={prop}>
							<th className={style.label}>
								{
									prop in knownPropertyNames
										? <span>{knownPropertyNames[prop]}</span>
										: <code>{prop}</code>
								}
							</th>
							<td>{result.response.data[prop]}</td>
						</tr>
					);
				}
			}
		}
	} else {
		entries.push(
			<tr key="no-properties">
				<td>There does not appear to be any properties from this full query result.</td>
			</tr>
		);
	}

	return (
		<>
			<Head>
				<title>{query.address ?? 'Loading'} - mcstatus.io</title>
				<meta name="robots" content="noindex,follow" />
				<meta name="title" content={`${query.address ?? 'Loading'} - mcstatus.io`} />
				<meta name="description" content={`Easily and quickly retrieve the query details of ${query.address ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content={`${query.address ?? 'Loading'} - mcstatus.io`} />
				<meta property="og:description" content={`Easily and quickly retrieve the query details of ${query.address ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
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
									? <table className="table is-fullwidth is-hoverable">
										<tbody>{entries}</tbody>
									</table>
									: <p className="has-text-danger">Failed to retrieve the status of the specified server.</p>
					}
				</div>
			</div>
		</>
	);
}