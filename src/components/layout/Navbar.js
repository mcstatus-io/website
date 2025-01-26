'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ToolIcon from '@/assets/icons/tool.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import GithubIcon from '@/assets/icons/github.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import CloseIcon from '@/assets/icons/x.svg';
import icon from '@/assets/img/icon.png';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const path = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [showMenu]);

    return (
        <nav className={`text-black dark:text-white w-screen h-[4.25rem] sticky top-0 z-50 ${!showMenu ? 'bg-white dark:bg-[#121212dd] bg-opacity-80 backdrop-blur-[6px] backdrop-saturate-150 backdrop-brightness-50 border-b border-b-neutral-200 dark:border-b-neutral-800' : ''}`}>
            <div className="container relative flex items-center h-full container-no-margin md:px-6">
                <header className={`${showMenu ? 'hidden' : 'md:max-lg:hidden'} md:pr-6 md:border-r-2 md:border-r-[rgba(0,0,0,0.1)] md:dark:border-r-neutral-700 mr-6`}>
                    <Link href="/" className="flex items-center content-center p-1">
                        <Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
                        <span className="ml-2 text-xl font-extrabold tracking-tighter">MCS</span>
                    </Link>
                </header>
                <button className="absolute z-50 p-2 ml-auto text-black top-4 right-4 dark:text-white md:hidden" type="button" onClick={() => setShowMenu(!showMenu)}>
                    {
                        showMenu
                            ? <CloseIcon width="24" height="24" className="text-white" />
                            : <MenuIcon width="24" height="24" />
                    }
                    <span className="sr-only">{showMenu ? 'Close Menu' : 'Open Menu'}</span>
                </button>
                <ul className={`list-none text-neutral-500 dark:text-neutral-400 ${showMenu ? 'flex flex-col justify-center absolute top-0 left-0 bg-neutral-900 bg-opacity-90 backdrop-blur-lg w-[100vw] h-[100vh] z-40' : 'hidden md:flex'} gap-4 items-center grow`}>
                    <li>
                        <Link href="/">
                            <div className={`p-1 ${path === '/' ? 'text-white' : 'text-neutral-400 md:hover:text-black md:hover:dark:text-white'}`}>
                                <span>Home</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/tools">
                            <div className={`p-1 ${path.startsWith('/tools') ? 'text-white' : 'text-neutral-400 md:hover:text-black md:hover:dark:text-white'}`}>
                                <span>Tools</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs">
                            <div className={`p-1 ${path.startsWith('/docs') ? 'text-white' : 'text-neutral-400 md:hover:text-black md:hover:dark:text-white'}`}>
                                <span>API</span>
                                <span className="md:hidden"> Documentation</span>
                            </div>
                        </Link>
                    </li>
                    <li className="md:mr-auto">
                        <Link href="/about">
                            <div className={`p-1 ${path.startsWith('/about') ? 'text-white' : 'text-neutral-400 md:hover:text-black md:hover:dark:text-white'}`}>
                                <span>About</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="https://discord.gg/QwvzbA9KGz" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <DiscordIcon width="22" height="22" title="Discord" />
                            <span className="font-bold md:sr-only">Discord</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/mcstatus-io" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <GithubIcon width="22" height="22" title="GitHub" />
                            <span className="font-bold md:sr-only">GitHub</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://status.mcstatus.io" rel="nofollow" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <ClockIcon width="22" height="22" title="Status" />
                            <span className="font-bold md:sr-only">Status Page</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://dashboard.mcstatus.io" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-orange-400 rounded-full button button-border">
                            <span>Dashboard</span>
                            <ToolIcon width="18" height="18" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}