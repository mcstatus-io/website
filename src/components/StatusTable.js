import React, { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import MinecraftFormatted from './MinecraftFormatted';
import { Button } from './Button';
import ChevronDown from '!!@svgr/webpack!../assets/icons/chevron-down.svg';
import ChevronUp from '!!@svgr/webpack!../assets/icons/chevron-up.svg';

export default function StatusTable({ data }) {
	const [showMods, setShowMods] = useState(false);
	const [showPlayers, setShowPlayers] = useState(false);

	const rows = [
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
		]
	];

	if (data.result.online) {
		if (data.result.icon) {
			rows.push([
				'Icon',
				data.result.icon
					? <Image src={data.result.icon} width="64" height="64" alt="Server icon" />
					: <p className="text-neutral-500 dark:text-neutral-400">N/A</p>
			]);
		}

		rows.push(
			[
				'MOTD',
				<MinecraftFormatted html={data.result.motd.html} key="motd" />
			],
			[
				'Version',
				data.result.version?.name_raw || data.result.version?.name
					? data.result.version.name_raw === data.result.version.name_clean || data.result.version?.name
						? <span>{data.result.version.name_clean ?? data.result.version.name}</span>
						: <MinecraftFormatted html={data.result.version.name_html} />
					: <span className="text-neutral-500 dark:text-neutral-400">N/A (&lt; 1.3)</span>
			],
			[
				'Players',
				<>
					<span>{data.result.players.online} / {data.result.players.max}</span>
					{
						data.result.players.list?.length > 0
							? <Button className="ml-3 w-auto text-sm" onClick={() => setShowPlayers(!showPlayers)}>
								<div className="flex items-center gap-1">
									<span>{showPlayers ? 'Hide' : 'Show'} player list</span>
									{
										showPlayers
											? <ChevronUp />
											: <ChevronDown />
									}
								</div>
							</Button>
							: null
					}
					{
						showPlayers
							? <MinecraftFormatted html={data.result.players.list.map((player) => player.name_html).join('\n')} className="mt-3" />
							: null
					}
				</>
			]
		);

		if (typeof data.result.mods !== 'undefined') {
			rows.push([
				'Mods',
				<>
					<span>{data.result.mods.length} mod{data.result.mods.length === 1 ? '' : 's'} loaded</span>
					{
						data.result.mods.length > 0
							? <Button className="ml-3 w-auto text-sm" onClick={() => setShowMods(!showMods)}>
								<div className="flex items-center gap-1">
									<span>{showMods ? 'Hide' : 'Show'} mod info</span>
									{
										showMods
											? <ChevronUp />
											: <ChevronDown />
									}
								</div>
							</Button>
							: null
					}
					{
						showMods
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
			]);
		} else {
			rows.push(
				[
					'Edition',
					data.result.edition
						? <span>{data.result.edition}</span>
						: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
				],
				[
					'Gamemode',
					data.result.gamemode
						? <span>{data.result.gamemode}</span>
						: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
				]
			);
		}

		const protocolVersionName = data.result?.version?.protocol && data.protocolVersions ? data.protocolVersions.find((version) => version.version === data.result.version.protocol) : null;

		rows.push(
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
		);
	}

	return (
		<div>
			{
				rows.map(([label, content], index) => (
					<div className={`block lg:flex w-full p-4 ${index + 1 !== rows.length ? 'border-b border-b-neutral-300 dark:border-b-neutral-700' : ''}`} key={index}>
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

StatusTable.propTypes = {
	data: PropTypes.object
};