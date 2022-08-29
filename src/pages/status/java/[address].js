import React, { useEffect, useReducer } from 'react';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import Search from '../../../components/Search';
import Highlight from '../../../components/Highlight';
import MinecraftFormatted from '../../../components/MinecraftFormatted';
import Ad from '../../../components/Ad';
import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';

export default function JavaStatus({ address }) {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'SET_RESULT':
				return { isLoaded: true, result: action.result, cached: action.cached, error: null, showMods: false, showPlayers: false, showAPIUsage: false };
			case 'SET_ERROR':
				return { isLoaded: true, result: null, cached: false, error: action.error, showMods: false, showPlayers: false, showAPIUsage: false };
			case 'RESET_ALL':
				return { isLoaded: false, result: null, cached: false, error: null, showMods: false, showPlayers: false, showAPIUsage: false };
			case 'TOGGLE_SHOW_MODS':
				return { ...state, showMods: !state.showMods };
			case 'TOGGLE_SHOW_PLAYERS':
				return { ...state, showPlayers: !state.showPlayers };
			case 'TOGGLE_SHOW_API_USAGE':
				return { ...state, showAPIUsage: !state.showAPIUsage };
			default:
				return state;
		}
	};

	const [data, dispatch] = useReducer(reducer, { isLoaded: false, result: null, cached: false, showMods: false, showPlayers: false, showAPIUsage: false });

	useEffect(() => {
		dispatch({ type: 'RESET_ALL' });

		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/status/java/${address}`);

				if (result.status === 200) {
					const body = await result.json();

					dispatch({ type: 'SET_RESULT', result: body, cached: result.headers.has('X-Cache-Time-Remaining') });
				} else {
					const body = await result.text();

					console.error(body);

					dispatch({ type: 'SET_ERROR', error: body });
				}
			} catch (e) {
				console.error(e);

				dispatch({ type: 'SET_ERROR', error: e.message ?? e.toString() });
			}
		})();
	}, [address]);

	return (
		<>
			<Head>
				<title>{address} - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content={`${address} - Minecraft Server Status`} />
				<meta name="description" content={data.result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${data.result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/status/java/${address}`} />
				<meta property="og:title" content={`${address} - Minecraft Server Status`} />
				<meta property="og:description" content={data.result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${data.result?.host ?? '<unknown>'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content={data.result?.favicon ?? 'https://mcstatus.io/img/icon.png'} />
				<link rel="canonical" href={`https://mcstatus.io/status/java/${address}`} />
			</Head>
			<Header active="home" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<h1 className="text-5xl font-black">Minecraft Server Status</h1>
				<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
				<Search host={address} type="java" />
				<div className="px-6 py-5 bg-neutral-800 rounded-md mt-4">
					{
						data.isLoaded
							? data.error
								? <p className="text-red-400">{data.error}</p>
								: <table className="table w-full">
									<tbody>
										<tr className="border-b border-b-neutral-700">
											<th className="px-3 pt-2 pb-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Status</th>
											<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
												{
													data.result.online
														? <span className="text-green-400">Online</span>
														: <span className="text-red-400">Offline</span>
												}
											</td>
										</tr>
										<tr className="border-b border-b-neutral-700">
											<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Host</th>
											<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">{data.result.host}</td>
										</tr>
										<tr className="border-b border-b-neutral-700">
											<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Port</th>
											<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">{data.result.port}</td>
										</tr>
										{
											data.result.online
												? <>
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-2 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Icon</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															{
																data.result.icon
																	? <Image src={data.result.icon} width="64" height="64" alt="Server icon" />
																	: <p className="has-text-grey">N/A</p>
															}
														</td>
													</tr>
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">MOTD</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															<MinecraftFormatted html={data.result.motd.html} />
														</td>
													</tr>
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Version</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															{
																data.result.version?.name_raw
																	? data.result.version.name_raw === data.result.version.name_clean
																		? <span>{data.result.version.name_clean}</span>
																		: <MinecraftFormatted html={data.result.version.name_html} />
																	: <span className="has-text-grey">N/A (&lt; 1.3)</span>
															}
														</td>
													</tr>
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Players</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															<span className="is-align-middle">{data.result.players.online} / {data.result.players.max}</span>
															{
																data.result.players.list.length > 0
																	? <button type="button" className="ml-3 text-sm border border-neutral-600 hover:border-neutral-500 outline-none px-2 py-1 rounded" onClick={() => dispatch({ type: 'TOGGLE_SHOW_PLAYERS' })}>{data.showPlayers ? 'Hide' : 'Show'} player list</button>
																	: null
															}
															{
																data.showPlayers
																	? <MinecraftFormatted html={data.result.players.list.map((player) => player.name_html).join('<br />')} className="mt-3" />
																	: null
															}
														</td>
													</tr>
													{
														data.result.mods.length > 0
															? <tr className="border-b border-b-neutral-700">
																<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Mods</th>
																<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
																	<span className="is-align-middle">{data.result.mods.length} mod{data.result.mods.length === 1 ? '' : 's'} loaded</span>
																	{
																		data.result.mods.length > 0
																			? <button type="button" className="button is-link is-small is-align-middle ml-3" onClick={() => dispatch({ type: 'TOGGLE_SHOW_MODS' })}>{data.showMods ? 'Hide' : 'Show'} mod info</button>
																			: null
																	}
																	{
																		data.showMods
																			? <div className="tags mt-2">
																				{
																					data.result.mods.map((mod, index) => (
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
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">EULA Blocked</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															{
																data.result.eula_blocked
																	? <span className="tag is-danger">Yes</span>
																	: <span className="tag is-success">No</span>
															}
														</td>
													</tr>
													<tr className="border-b border-b-neutral-700">
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Protocol Version</th>
														<td className="px-3 pb-4 lg:py-3 block w-full lg:table-cell">
															{
																data.result.version?.protocol
																	? <span>{data.result.version.protocol}</span>
																	: <span className="has-text-grey">N/A</span>
															}
														</td>
													</tr>
													<tr>
														<th className="px-3 pt-4 py-1 lg:py-3 text-left block w-full lg:w-1/6 lg:table-cell">Cached Response</th>
														<td className="px-3 pb-2 lg:py-3 block w-full lg:table-cell">
															<span className="tag is-info">{data.cached ? 'Yes' : 'No'}</span>
														</td>
													</tr>
												</>
												: null
										}
									</tbody>
								</table>
							: <div className="flex gap-3">
								<div className="w-1/4">
									<div className="block rounded bg-neutral-700 opacity-70 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 opacity-70 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full" />
								</div>
								<div className="w-3/4">
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 opacity-70 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 opacity-70 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full mb-3" />
									<div className="block rounded bg-neutral-700 h-9 w-full" />
								</div>
							</div>
					}
				</div>
				{
					data.isLoaded && data.result
						? <div className="mt-3 bg-neutral-800 rounded-md">
							<div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_SHOW_API_USAGE' })}>
								<p className="font-bold">API Usage</p>
								<Image src={data.showAPIUsage ? chevronUp : chevronDown} alt="Chevron down icon" width="16" />
							</div>
							{
								data.showAPIUsage
									? <div className="p-4 border-t border-t-neutral-700">
										<p>
											<span className="bg-green-600 text-sm px-2 py-1 rounded">GET</span>
											<code className="ml-2">https://api.mcstatus.io/v2/status/java/{address}</code>
										</p>
										<Highlight source={JSON.stringify(data.result, null, '    ')} className="border border-neutral-700 rounded mt-4" />
										<p className="mt-3">Learn more about this response by viewing it in the <Link href="/docs#java-status"><a className="text-blue-500 hover:text-blue-400 transition-colors duration-150" >API documentation</a></Link>.</p>
									</div>
									: null
							}
						</div>
						: null
				}
				<Ad className="mt-4" />
			</div>
		</>
	);
}

JavaStatus.propTypes = {
	address: PropTypes.string.isRequired
};

export function getServerSideProps({ params: { address } }) {
	return { props: { address } };
}