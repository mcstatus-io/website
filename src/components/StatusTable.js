'use client';

import { useState } from 'react';
import Image from 'next/image';
import gt from 'semver/functions/gt';
import coerce from 'semver/functions/coerce';
import MinecraftFormatted from './MinecraftFormatted';
import Chevron from './Chevron';

export default function StatusTable({ result, protocolVersions }) {
	const [showMods, setShowMods] = useState(false);
	const [showPlayers, setShowPlayers] = useState(false);

	const rows = [
		[
			'Status',
			result.online
				? <span className="text-green-600 dark:text-green-400">Online</span>
				: <span className="text-red-600 dark:text-red-400">Offline</span>
		],
		[
			'Host',
			result.host
		],
		[
			'Port',
			result.port
		]
	];

	if (result.online) {
		if (result.icon) {
			rows.push([
				'Icon',
				result.icon
					? <Image src={result.icon} width="64" height="64" alt="Server icon" />
					: <p className="text-neutral-500 dark:text-neutral-400">N/A</p>
			]);
		}

		rows.push(
			[
				'MOTD',
				<MinecraftFormatted html={result.motd.html} key="motd" />
			],
			[
				'Version',
				result.version?.name_raw || result.version?.name
					? result.version.name_raw === result.version.name_clean || result.version?.name
						? <span>{result.version.name_clean ?? result.version.name}</span>
						: <MinecraftFormatted html={result.version.name_html} />
					: <span className="text-neutral-500 dark:text-neutral-400">N/A (&lt; 1.3)</span>
			],
			[
				'Players',
				<>
					<span>{result.players.online} / {result.players.max}</span>
					{
						result.players.list?.length > 0
							? <>
								<button type="button" className="button ml-3 w-auto text-sm" onClick={() => setShowPlayers(!showPlayers)} aria-controls="players-list" aria-expanded={showPlayers}>
									<div className="flex items-center gap-1">
										<span>{showPlayers ? 'Hide' : 'Show'} player list</span>
										<Chevron width="20" height="20" isFlipped={showPlayers} />
									</div>
								</button>
								<div className={showPlayers ? 'block' : 'hidden'} id="players-list">
									<MinecraftFormatted html={result.players.list.map((player) => player.name_html).join('\n')} className="mt-3" />
								</div>
							</>
							: null
					}
				</>
			]
		);

		if (typeof result.mods !== 'undefined') {
			rows.push([
				'Mods',
				<>
					<span>{result.mods.length} mod{result.mods.length === 1 ? '' : 's'} loaded</span>
					{
						result.mods.length > 0
							? <>
								<button type="button" className="button ml-3 w-auto text-sm" onClick={() => setShowMods(!showMods)} aria-controls="mods-list" aria-expanded={showMods}>
									<div className="flex items-center gap-1">
										<span>{showMods ? 'Hide' : 'Show'} mod info</span>
										<Chevron width="20" height="20" isFlipped={showMods} />
									</div>
								</button>
								<div className={`${showMods ? 'block' : 'hidden'} tags mt-2`} id="mods-list">
									{
										result.mods.map((mod, index) => (
											<span className="tag is-link" key={index}>{mod.name}: v{mod.version}</span>
										))
									}
								</div>
							</>
							: null
					}
				</>
			]);
		}

		if (typeof result.edition !== 'undefined') {
			rows.push([
				'Edition',
				result.edition
					? <span>{result.edition}</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]);
		}

		if (typeof result.gamemode !== 'undefined') {
			rows.push([
				'Gamemode',
				result.gamemode
					? <span>{result.gamemode}</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]);
		}

		let protocolVersion = null;

		if (result?.version?.protocol && protocolVersions) {
			protocolVersion = protocolVersions
				.filter((version) => !/^\d+w\d+\w$/.test(version.minecraftVersion) && ((typeof version.usesNetty === 'boolean' && version.usesNetty) || version.releaseType === 'release'))
				.sort((a, b) => gt(coerce(a.minecraftVersion), coerce(b.minecraftVersion)) ? 1 : -1)
				.find((version) => version.version === result.version.protocol);
		}

		rows.push(
			[
				'EULA Blocked',
				result.eula_blocked
					? <span className="text-red-600 dark:text-red-400">Yes</span>
					: <span className="text-green-600 dark:text-green-400">No</span>
			],
			[
				'Protocol Version',
				result.version?.protocol
					? <span>
						<span>{result.version.protocol}</span>
						{
							protocolVersion
								? <span className="text-neutral-500 dark:text-neutral-400"> ({protocolVersion.minecraftVersion}+)</span>
								: null
						}
					</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]
		);
	}

	return (
		<div>
			{
				rows.map(([label, content], index) => (
					<div className={`block lg:flex w-full p-4 ${index + 1 !== rows.length ? 'border-b border-b-black/10 dark:border-b-white/10 contrast-more:border-b-black/50 contrast-more:dark:border-b-white/50' : ''}`} key={index}>
						<span className="block lg:inline-block mb-1 lg:mb-0 w-64 font-semibold self-center">{label}</span>
						<div className="w-full">
							{content}
						</div>
					</div>
				))
			}
		</div>
	);
}