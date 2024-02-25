'use client';

import Image from 'next/image';
import { useState } from 'react';
import coerce from 'semver/functions/coerce';
import gt from 'semver/functions/gt';
import valid from 'semver/functions/valid';
import ListIcon from '@/assets/icons/list.svg';
import UserIcon from '@/assets/icons/user.svg';
import internalMods from '@/assets/mods';
import Chevron from '@/components/Chevron';
import MinecraftFormatted from '@/components/MinecraftFormatted';

const hasDuplicateValues = (arr) => arr.length > new Set(arr).size;
const sortFuncAscendingCaseInsensitive = (prop) => (a, b) => a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : b[prop].toLowerCase() > a[prop].toLowerCase() ? -1 : 0;

export default function StatusTable({ status, protocolVersions, className = '', ...props }) {
    const [showMods, setShowMods] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false);
    const [showPlugins, setShowPlugins] = useState(false);
    const [showAvatars, setShowAvatars] = useState(false);

    const rows = [
        [
            'Status',
            status.online
                ? <span className="text-sm badge badge-green">Online</span>
                : <span className="text-sm badge badge-red">Offline</span>
        ],
        [
            'Host',
            <span className="font-mono" key="host">{status.host}</span>
        ],
        [
            'Port',
            <span className="font-mono" key="port">{status.port}</span>
        ]
    ];

    if (status.online) {
        const allowAvatars = !hasDuplicateValues(status.players?.list?.map((player) => player.uuid) ?? []);

        if (status.icon) {
            rows.push([
                'Icon',
                status.icon
                    ? <a href={status.icon} target="_blank" rel="noreferrer" className="inline-block cursor-zoom-in">
                        <Image src={status.icon} width="64" height="64" alt="Server icon" className="block [image-rendering:pixelated;]" />
                    </a>
                    : <p className="text-neutral-500 dark:text-neutral-400">N/A</p>
            ]);
        }

        rows.push(
            [
                'MOTD',
                status.motd?.html
                    ? <MinecraftFormatted html={status.motd.html} key="motd" />
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
            ],
            [
                'Version',
                status.version?.name_raw || status.version?.name
                    ? status.version.name_raw === status.version.name_clean || status.version.name
                        ? <span>{status.version.name_clean ?? status.version.name}</span>
                        : <MinecraftFormatted html={status.version.name_html} />
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A (&lt; 1.3)</span>
            ],
            [
                'Players',
                <>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                        {
                            typeof status.players?.online === 'number' && typeof status.players?.max === 'number'
                                ? <span>{status.players.online} / {status.players.max}</span>
                                : typeof status.players?.online === 'number'
                                    ? <span>{status.players.online}</span>
                                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
                        }
                        {
                            status.players?.list?.length > 0
                                ? <>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <button type="button" className="flex items-center w-auto gap-1 text-sm button" onClick={() => setShowPlayers(!showPlayers)} aria-controls="players-list" aria-expanded={showPlayers}>
                                            <span>{showPlayers ? 'Hide' : 'Show'} player list</span>
                                            <Chevron width="16" height="16" isFlipped={showPlayers} />
                                        </button>
                                        {
                                            showPlayers && allowAvatars
                                                ? <button type="button" className="flex items-center gap-2 text-sm button" onClick={() => setShowAvatars(!showAvatars)}>
                                                    {
                                                        showAvatars
                                                            ? <ListIcon width="16" height="16" />
                                                            : <UserIcon width="16" height="16" />
                                                    }
                                                    {
                                                        showAvatars
                                                            ? <span>List</span>
                                                            : <span>Avatars</span>
                                                    }
                                                </button>
                                                : null
                                        }
                                    </div>
                                </>
                                : null
                        }
                    </div>
                    {
                        status.players?.list?.length > 0
                            ? <div className={showPlayers ? 'block' : 'hidden'} id="players-list">
                                {
                                    showAvatars && allowAvatars
                                        ? <ul className="flex flex-wrap gap-2 mt-3 list-none">
                                            {
                                                status.players.list.sort(sortFuncAscendingCaseInsensitive('name_clean')).map((player, index) => (
                                                    <li key={index}>
                                                        <a href={`https://minecraftuuid.com/?search=${encodeURIComponent(player.uuid)}&utm_source=mcstatus.io`} rel="sponsored" className="flex items-center gap-3 px-3 py-2 card card-hover">
                                                            <Image src={`https://api.mineatar.io/head/${player.uuid}`} width="24" height="24" />
                                                            <span className="font-mono text-sm" title={player.uuid}>{player.name_clean}</span>
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        : allowAvatars
                                            ? <div className="p-4 mt-3 overflow-x-auto font-mono whitespace-pre bg-black rounded">
                                                <ul className="list-none">
                                                    {
                                                        status.players.list.sort(sortFuncAscendingCaseInsensitive('name_clean')).map((player, index) => (
                                                            <li key={index}>
                                                                <p className="flex items-center justify-start gap-2 text-white md:justify-between md:gap-3">
                                                                    <span className="min-w-fit">
                                                                        <span className="text-neutral-500">{Array((status.players.list.length.toString().length - (index + 1).toString().length) + 1).join(' ')}{index + 1}. </span>
                                                                        <a href={`https://minecraftuuid.com/?search=${encodeURIComponent(player.uuid)}&utm_source=mcstatus.io`} rel="sponsored" className="link">{player.name_clean}</a>
                                                                    </span>
                                                                    <span className="pr-4 min-w-fit text-neutral-500 md:pr-0">{player.uuid}</span>
                                                                </p>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                            : <MinecraftFormatted html={status.players.list.map((player) => player.name_html).join('\n')} className="mt-3" />
                                }
                                {
                                    status.players.online > status.players.list.length && allowAvatars
                                        ? <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Note that not all online players may not be shown. Standard Java Edition servers limit sample players to 12 by default.</p>
                                        : null
                                }
                            </div>
                            : null
                    }
                </>
            ]
        );

        if (typeof status.mods !== 'undefined') {
            rows.push([
                'Mods',
                <>
                    {
                        status.mods.length > 0
                            ? <>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                                    <span>{status.mods.length} mod{status.mods.length === 1 ? '' : 's'} loaded</span>
                                    <button type="button" className="flex items-center gap-1 text-sm button w-fit" onClick={() => setShowMods(!showMods)} aria-controls="mods-list" aria-expanded={showMods}>
                                        <span>{showMods ? 'Hide' : 'Show'} mod list</span>
                                        <Chevron width="16" height="16" isFlipped={showMods} />
                                    </button>
                                </div>
                                <div className={`${showMods ? 'block' : 'hidden'} tags mt-2 font-mono whitespace-pre bg-black rounded overflow-x-auto p-4`} id="mods-list">
                                    <ul className="list-none">
                                        {
                                            status.mods.sort(sortFuncAscendingCaseInsensitive('name')).map((mod, index) => (
                                                <li key={index}>
                                                    <p className="text-white">
                                                        <span className="text-neutral-500">{Array((status.mods.length.toString().length - (index + 1).toString().length) + 1).join(' ')}{index + 1}. </span>
                                                        {
                                                            internalMods.includes(mod.name)
                                                                ? <span className="text-white">{mod.name}</span>
                                                                : <a className="link" href={`https://www.curseforge.com/minecraft/search?search=${encodeURIComponent(mod.name)}&class=mc-mods&utm_source=mcstatus.io`} rel="sponsored">
                                                                    <span>{mod.name}</span>
                                                                </a>
                                                        }
                                                        {
                                                            mod.version.length > 0 && valid(coerce(mod.version))
                                                                ? <span className="pr-4 text-neutral-400"> v{mod.version}</span>
                                                                : null
                                                        }
                                                    </p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </>
                            : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
                    }
                </>
            ]);
        }

        if (typeof status.plugins !== 'undefined') {
            rows.push([
                'Plugins',
                <>
                    {
                        status.plugins.length > 0
                            ? <>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                                    <span>{status.plugins.length} plugin{status.plugins.length === 1 ? '' : 's'} loaded</span>
                                    <button type="button" className="flex items-center gap-1 text-sm button w-fit" onClick={() => setShowPlugins(!showPlugins)} aria-controls="plugin-list" aria-expanded={showPlugins}>
                                        <span>{showPlugins ? 'Hide' : 'Show'} plugin list</span>
                                        <Chevron width="16" height="16" isFlipped={showPlugins} />
                                    </button>
                                </div>
                                <div className={`${showPlugins ? 'block' : 'hidden'} tags mt-2 font-mono whitespace-pre bg-black rounded overflow-x-auto p-4`} id="plugin-list">
                                    <ul className="list-none">
                                        {
                                            status.plugins.sort(sortFuncAscendingCaseInsensitive('name')).map((plugin, index) => (
                                                <li key={index}>
                                                    <p className="text-white">
                                                        <span className="text-neutral-500">{Array((status.plugins.length.toString().length - (index + 1).toString().length) + 1).join(' ')}{index + 1}. </span>
                                                        <a className="link" href={`https://dev.bukkit.org/search?search=${encodeURIComponent(plugin.name)}&utm_source=mcstatus.io`} rel="sponsored">
                                                            <span>{plugin.name}</span>
                                                        </a>
                                                        {
                                                            plugin.version && plugin.version.length > 0 && valid(coerce(plugin.version))
                                                                ? <span className="pr-4 text-neutral-400 md:pr-0"> v{plugin.version}</span>
                                                                : null
                                                        }
                                                    </p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </>
                            : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
                    }
                </>
            ]);
        }

        if (typeof status.edition !== 'undefined') {
            rows.push([
                'Edition',
                status.edition
                    ? <span>{status.edition}</span>
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
            ]);
        }

        if (typeof status.gamemode !== 'undefined') {
            rows.push([
                'Gamemode',
                status.gamemode
                    ? <span>{status.gamemode}</span>
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
            ]);
        }

        let protocolVersion = null;

        if (status?.version?.protocol && protocolVersions) {
            protocolVersion = protocolVersions
                .filter((version) => !/^\d+w\d+\w$/.test(version.minecraftVersion) && ((typeof version.usesNetty === 'boolean' && version.usesNetty) || version.releaseType === 'release'))
                .sort((a, b) => gt(coerce(a.minecraftVersion), coerce(b.minecraftVersion)) ? 1 : -1)
                .find((version) => version.version === status.version.protocol);
        }

        rows.push(
            [
                'EULA Blocked',
                status.eula_blocked
                    ? <span className="text-red-600 dark:text-red-400">Yes</span>
                    : <span>No</span>
            ],
            [
                'Protocol Version',
                status.version?.protocol
                    ? <span>
                        <span>{status.version.protocol}</span>
                        {
                            protocolVersion
                                ? <span className="text-neutral-500 dark:text-neutral-400"> ({protocolVersion.minecraftVersion}+)</span>
                                : null
                        }
                    </span>
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
            ]
        );

        if (typeof status.software !== 'undefined') {
            rows.push([
                'Software',
                status.software
                    ? <span>{status.software}</span>
                    : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
            ]);
        }
    }

    if (typeof status.srv_record !== 'undefined') {
        rows.push([
            'SRV Record',
            status.srv_record
                ? <span className="font-mono">{status.srv_record.host}:{status.srv_record.port}</span>
                : <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
        ]);
    }

    return (
        <div className={`card py-4 ${className}`} {...props}>
            <ul className="list-none">
                {
                    rows.map(([label, content], index) => (
                        <li className={`block lg:flex w-full p-4 ${index + 1 < rows.length ? 'border-b border-b-black/10 dark:border-b-white/10 contrast-more:border-b-black/50 contrast-more:dark:border-b-white/50' : ''}`} key={index}>
                            <span className="self-center block w-64 mb-1 font-semibold lg:inline-block lg:mb-0">{label}</span>
                            <div className="w-full">
                                {content}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}