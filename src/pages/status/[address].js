import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentLoader from 'react-content-loader';
import config from '../../config';
import style from './[address].module.sass';

export default function Status() {
	const { push, query } = useRouter();
	const [debug, setDebug] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => (async () => {
		if (!query.address) return;

		try {
			const result = await fetch(`${config.apiHost}/status/${query.address}`).then((result) => result.json());
			setData(result);
		} catch (e) {
			setError(true);

			console.error(e);
		}
	})(), [query]);

	const onSubmit = (event) => {
		event.preventDefault();

		push(`/status/${event.target[0].value}`);
	};

	return (
		<>
			<Head>
				<title>Status - {query.address}</title>
			</Head>
			<div className="container">
				<form onSubmit={onSubmit} autoComplete="off">
					<div className="field">
						<div className="control is-fullwidth">
							<input type="text" className="input" id="address" placeholder="Example: play.hypixel.net" defaultValue={query.address} spellCheck="false" />
						</div>
					</div>
				</form>
				{
					data
						? <>
							<table className="table is-fullwidth mt-6">
								<tbody>
									<tr>
										<th className={style.label}>Hostname</th>
										<td>{data.host}</td>
									</tr>
									<tr>
										<th className={style.label}>Port</th>
										<td>{data.port}</td>
									</tr>
									<tr>
										<th className={style.label}>MOTD</th>
										<td>
											<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: data.description.html }} />
										</td>
									</tr>
									<tr>
										<th className={style.label}>Favicon</th>
										<td>
											{
												data.favicon
													? <img src={data.favicon} />
													: <p className="has-text-grey">N/A</p>
											}
										</td>
									</tr>
									<tr>
										<th className={style.label}>Version</th>
										<td>{data.version.name}</td>
									</tr>
									<tr>
										<th className={style.label}>Players</th>
										<td>{data.players.online} / {data.players.max}</td>
									</tr>
									{
										debug
											? <tr>
												<th className={style.label}>SRV Lookup</th>
												<td>
													{
														data.srv_record
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
												<td>{data.version.protocol}</td>
											</tr>
											: null
									}
								</tbody>
							</table>
							<button type="button" className="button is-link" onClick={() => setDebug(!debug)}>{debug ? 'Hide' : 'Show'} debug info</button>
						</>
						: error
							? <p className="has-text-danger mt-6">There was an error while fetching the status of this server. Please try again later.</p>
							: <ContentLoader viewBox="0 0 1200 600" uniqueKey="result-loader" className="mt-6">
								<rect x="0" y="0" width="1200" height="600" rx="3" ry="3" />
							</ContentLoader>
				}
			</div>
		</>
	);
}