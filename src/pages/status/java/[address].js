import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parse, toHTML } from 'minecraft-motd-util';
import PropTypes from 'prop-types';

export default function Status({ address, result, error, cache }) {
	const inputElem = useRef(null);
	const bedrockElem = useRef(null);
	const { push, pathname } = useRouter();
	const [inputError, setInputError] = useState(false);
	const [showDebug, setShowDebug] = useState(false);
	const [showMods, setShowMods] = useState(false);
	const [showInformation, setShowInformation] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();

		if (
			!inputElem
			|| !inputElem.current
			|| inputElem.current.value.length < 1
			|| !bedrockElem
			|| !bedrockElem.current
			|| (
				inputElem.current.value === address
				&& !bedrockElem.current.checked
			)
		) return;

		setShowMods(false);
		setShowDebug(false);
		setShowInformation(false);

		push(`/${bedrockElem && bedrockElem.current && bedrockElem.current.checked ? 'bedrock' : 'java'}/${inputElem.current.value.toLowerCase()}`);
	};

	const onChange = () => {
		if (!inputElem || !inputElem.current) return;

		setInputError(inputElem.current.value.length < 1);
	};

	let content = (
		<article className="message is-danger">
			<div className="message-body">
				{error ?? 'Failed to retrieve the status of the specified server.'}
			</div>
		</article>
	);

	if (result) {
		let players = null;

		if (result.response.players.sample?.length > 0) {
			players = [];

			for (let i = 0; i < result.response.players.sample.length; i++) {
				const player = result.response.players.sample[i];

				const parsed = parse(player.name);

				players.push(
					<p dangerouslySetInnerHTML={{ __html: toHTML(parsed) }} key={i} />
				);
			}
		}

		content = (
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
							<td className="motd-container">
								<pre className="has-background-black" dangerouslySetInnerHTML={{ __html: result.response.motd.html }} />
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
							<td>
								<span>{result.response.players.online} / {result.response.players.max}</span>
								{
									players
										? <button type="button" className="button is-link is-small is-vertically-aligned ml-3" onClick={() => setShowInformation(!showInformation)}>{showInformation ? 'Hide' : 'Show'} player list</button>
										: null
								}
								{
									showInformation
										? <pre className="has-background-black has-text-white mt-3">{players}</pre>
										: null
								}
							</td>
						</tr>
						{
							result.response.mod_info
								? <tr>
									<th>Mod Info</th>
									<td>
										<span>{result.response.mod_info.type}</span>
										<span className="has-text-grey"> ({result.response.mod_info.mods.length} mod{result.response.mod_info.mods.length === 1 ? '' : 's'} loaded)</span>
										{
											result?.response?.mod_info && result.response.mod_info.mods.length > 0
												? <button type="button" className="button is-link is-small is-vertically-aligned ml-3" onClick={() => setShowMods(!showMods)}>{showMods ? 'Hide' : 'Show'} mod info</button>
												: null
										}
										{
											showMods
												? <div className="tags mt-2">
													{
														result.response.mod_info.mods.map((mod, index) => (
															<span className="tag is-link" key={index}>{mod.id}: v{mod.version}</span>
														))
													}
												</div>
												: null
										}
									</td>
								</tr>
								: null
						}
						{
							showDebug
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
							showDebug
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
							showDebug
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
				<button type="button" className="button is-link" onClick={() => setShowDebug(!showDebug)}>{showDebug ? 'Hide' : 'Show'} debug info</button>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{address} - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content={`${address} - Minecraft Server Status`} />
				<meta name="description" content={result?.response?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content={`${address} - Minecraft Server Status`} />
				<meta property="og:description" content={result?.response?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content={result?.response?.favicon ?? 'https://mcstatus.io/img/icon.png'} />
				<link rel="canonical" href={`https://mcstatus.io${pathname}`} />
			</Head>
			<div className="container">
				<h1 className="title">Minecraft Server Status</h1>
				<form onSubmit={onSubmit} className="mb-5" spellCheck="false" autoComplete="false">
					<div className="columns">
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${inputError ? 'is-danger' : ''}`} placeholder="play.hypixel.net OR play.hypixel.net:25565" defaultValue={address} spellCheck="false" autoComplete="false" onChange={onChange} ref={inputElem} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" defaultChecked={false} ref={bedrockElem} />
								<span>Bedrock server</span>
							</label>
						</div>
						<div className="column is-flex-grow-0">
							<button type="submit" className="button is-link">Submit</button>
						</div>
					</div>
				</form>
				{content}
			</div>
		</>
	);
}

Status.propTypes = {
	address: PropTypes.string.isRequired,
	result: PropTypes.object,
	cache: PropTypes.bool,
	error: PropTypes.string
};

export async function getServerSideProps({ query: { address } }) {
	try {
		const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/java/${address}`);
		const body = await result.json();

		if (body.errors) {
			return { props: { address, error: body.errors[0] } };
		}

		if (!body.online) {
			return { props: { address, error: 'Failed to retrieve the status of the specified server.' } };
		}

		return { props: { address, result: body, cache: result.headers.get('x-cache-hit') === 'TRUE' } };
	} catch (e) {
		return { props: { address, error: e.message } };
	}
}