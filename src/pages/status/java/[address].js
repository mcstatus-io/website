import React, { useEffect, useReducer } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Navbar from '../../../components/Navbar';
import Search from '../../../components/Search';
import Highlight from '../../../components/Highlight';
import StatusTable from '../../../components/StatusTable';
import Ad from '../../../components/Ad';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import ChevronDown from '!!@svgr/webpack!../../../assets/icons/chevron-down.svg';
import ChevronUp from '!!@svgr/webpack!../../../assets/icons/chevron-up.svg';

export default function JavaStatus({ address, user }) {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'SET_RESULT':
				return { ...state, isLoaded: true, result: action.result, cached: action.cached, error: null, showAPIUsage: false };
			case 'SET_ERROR':
				return { ...state, isLoaded: true, result: null, cached: false, error: action.error, showAPIUsage: false };
			case 'SET_PROTOCOL_VERSIONS':
				return { ...state, protocolVersions: action.data };
			case 'RESET_ALL':
				return { ...state, isLoaded: false, result: null, cached: false, error: null, showAPIUsage: false };
			case 'TOGGLE_SHOW_API_USAGE':
				return { ...state, showAPIUsage: !state.showAPIUsage };
			default:
				return state;
		}
	};

	const [data, dispatch] = useReducer(reducer, { isLoaded: false, result: null, cached: false, showAPIUsage: false, protocolVersions: null });

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
								: <StatusTable data={data} />
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
										<Highlight source={JSON.stringify(data.result, null, '    ')} className="mt-4 bg-neutral-800 dark:border dark:border-neutral-700 rounded" />
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