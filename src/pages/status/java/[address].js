import React, { useEffect, useReducer } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import Search from '../../../components/Search';
import Highlight from '../../../components/Highlight';
import MinecraftFormatted from '../../../components/MinecraftFormatted';
import StatusTable from '../../../components/StatusTable';
import Ad from '../../../components/Ad';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button';
import Container from '../../../components/Container';
import ChevronDown from '!!@svgr/webpack!../../../assets/icons/chevron-down.svg';
import ChevronUp from '!!@svgr/webpack!../../../assets/icons/chevron-up.svg';

export default function JavaStatus({ address, user }) {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'SET_RESULT':
				return { ...state, isLoaded: true, result: action.result, cached: action.cached, error: null, showMods: false, showPlayers: false, showAPIUsage: false };
			case 'SET_ERROR':
				return { ...state, isLoaded: true, result: null, cached: false, error: action.error, showMods: false, showPlayers: false, showAPIUsage: false };
			case 'SET_PROTOCOL_VERSIONS':
				return { ...state, protocolVersions: action.data };
			case 'RESET_ALL':
				return { ...state, isLoaded: false, result: null, cached: false, error: null, showMods: false, showPlayers: false, showAPIUsage: false };
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

	const [data, dispatch] = useReducer(reducer, { isLoaded: false, result: null, cached: false, showMods: false, showPlayers: false, showAPIUsage: false, protocolVersions: null });

	useEffect(() => {
		dispatch({ type: 'RESET_ALL' });

		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_PING_HOST ?? 'https://api.mcstatus.io/v2'}/status/java/${address}`);

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

			try {
				const result = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/common/protocolVersions.json');

				if (result.status < 400) {
					const body = await result.json();

					dispatch({ type: 'SET_PROTOCOL_VERSIONS', data: body });
				} else {
					const body = await result.text();

					console.error(body);
				}
			} catch (e) {
				console.error(e);
			}
		})();
	}, [address]);

	const protocolVersionName = data.result?.version?.protocol && data.protocolVersions ? data.protocolVersions.find((version) => version.version === data.result.version.protocol) : null;

	return (
		<>
			<Head>
				<title>{`${address} - Minecraft Server Status`}</title>
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
			<Navbar user={user} />
			<Container>
				<Header size={1}>Minecraft Server Status</Header>
				<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
				<Search host={address} type="java" className="mt-5" />
				<div className="px-5 py-4 rounded mt-4 box">
					{
						data.isLoaded
							? data.error
								? <p className="text-red-400">{data.error}</p>
								: <StatusTable
									rows={[
										[
											'Status',
											data.result.online
												? <span className="text-green-600 dark:text-green-400">Online</span>
												: <span className="text-red-600 dark:text-red-400">Offline</span>
										],
										[
											'Host',
											data.result.host
										],
										[
											'Port',
											data.result.port
										],
										...(
											data.result.online
												? [
													[
														'Icon',
														data.result.icon
															? <Image src={data.result.icon} width="64" height="64" alt="Server icon" />
															: <p className="text-neutral-500 dark:text-neutral-400">N/A</p>
													],
													[
														'MOTD',
														<MinecraftFormatted html={data.result.motd.html} key="motd" />
													],
													[
														'Version',
														data.result.version?.name_raw
															? data.result.version.name_raw === data.result.version.name_clean
																? <span>{data.result.version.name_clean}</span>
																: <MinecraftFormatted html={data.result.version.name_html} />
															: <span className="text-neutral-500 dark:text-neutral-400">N/A (&lt; 1.3)</span>
													],
													[
														'Players',
														<>
															<span>{data.result.players.online} / {data.result.players.max}</span>
															{
																data.result.players.list.length > 0
																	? <Button className="ml-3 w-auto text-sm" onClick={() => dispatch({ type: 'TOGGLE_SHOW_PLAYERS' })}>
																		<div className="flex items-center gap-1">
																			<span>{data.showPlayers ? 'Hide' : 'Show'} player list</span>
																			{
																				data.showPlayers
																					? <ChevronUp />
																					: <ChevronDown />
																			}
																		</div>
																	</Button>
																	: null
															}
															{
																data.showPlayers
																	? <MinecraftFormatted html={data.result.players.list.map((player) => player.name_html).join('<br />')} className="mt-3" />
																	: null
															}
														</>
													],
													[
														'Mods',
														<>
															<span>{data.result.mods.length} mod{data.result.mods.length === 1 ? '' : 's'} loaded</span>
															{
																data.result.mods.length > 0
																	? <Button className="ml-3 w-auto text-sm" onClick={() => dispatch({ type: 'TOGGLE_SHOW_MODS' })}>
																		<div className="flex items-center gap-1">
																			<span>{data.showMods ? 'Hide' : 'Show'} mod info</span>
																			{
																				data.showMods
																					? <ChevronUp />
																					: <ChevronDown />
																			}
																		</div>
																	</Button>
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
														</>
													],
													[
														'EULA Blocked',
														data.result.eula_blocked
															? <span className="text-red-600 dark:text-red-400">Yes</span>
															: <span className="text-green-600 dark:text-green-400">No</span>
													],
													[
														'Protocol Version',
														data.result.version?.protocol
															? <span>
																<span>{data.result.version.protocol}</span>
																{
																	protocolVersionName
																		? <span className="text-neutral-500 dark:text-neutral-400"> ({protocolVersionName.minecraftVersion})</span>
																		: null
																}
															</span>
															: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
													],
													[
														'Cached Response',
														data.cached ? 'Yes' : 'No'
													]
												]
												: []
										)
									]}
								/>
							: <div className="flex gap-3">
								<div className="w-1/4">
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
								</div>
								<div className="w-3/4">
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
									<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
								</div>
							</div>
					}
				</div>
				{
					data.isLoaded && data.result
						? <div className="mt-3 rounded box">
							<div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_SHOW_API_USAGE' })}>
								<p className="font-bold">API Usage</p>
								{
									data.showAPIUsage
										? <ChevronUp />
										: <ChevronDown />
								}
							</div>
							{
								data.showAPIUsage
									? <div className="p-4 border-t border-t-neutral-300 dark:border-t-neutral-700">
										<p>
											<span className="bg-green-600 text-sm px-2 py-1 rounded text-white">GET</span>
											<code className="ml-2 break-words">https://api.mcstatus.io/v2/status/java/{address}</code>
										</p>
										<Highlight source={JSON.stringify(data.result, null, '    ')} className="mt-4 box rounded" />
										<p className="mt-3">Learn more about this response by viewing it in the <Link href="/docs#java-status" className="link">API documentation</Link>.</p>
									</div>
									: null
							}
						</div>
						: null
				}
				<Ad className="mt-4" />
			</Container>
			<Script type="application/ld+json" strategy="afterInteractive" id="google-structured">
				{`
[
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://mcstatus.io"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Java Status",
				"item": "https://mcstatus.io/status/java"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "${address}",
				"item": "https://mcstatus.io/status/java/${address}"
			}
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"url": "https://mcstatus.io",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://mcstatus.io/status/java/{host}"
			},
			"query-input": "required name=host"
		}
	}
]
				`}
			</Script>
		</>
	);
}

JavaStatus.propTypes = {
	user: PropTypes.object,
	address: PropTypes.string.isRequired
};

export function getServerSideProps({ params: { address } }) {
	return { props: { address } };
}