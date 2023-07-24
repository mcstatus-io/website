'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CPUIcon from '@/assets/icons/cpu.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import GithubIcon from '@/assets/icons/github.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import MoonIcon from '@/assets/icons/moon.svg';
import SunIcon from '@/assets/icons/sun.svg';
import CloseIcon from '@/assets/icons/x.svg';
import icon from '@/assets/img/icon.png';
import Chevron from '@/components/Chevron';
import Container from '@/components/Container';
import Dropdown from '@/components/Dropdown';

export default function Navbar({ active }) {
    const [showMenu, setShowMenu] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [showMenu]);

    useEffect(() => {
        if (!currentTheme) {
            setCurrentTheme(window.localStorage.getItem('theme') || 'auto');
        }

        switch (currentTheme) {
            case 'auto': {
                if (!window.matchMedia) return;

                const darkThemeMatch = window.matchMedia('(prefers-color-scheme: dark)');

                const onChange = () => {
                    if (darkThemeMatch.matches) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                };

                onChange();

                darkThemeMatch.addEventListener('change', onChange);

                return () => darkThemeMatch.removeEventListener('change', onChange);
            }
            case 'light': {
                document.documentElement.classList.remove('dark');

                break;
            }
            case 'dark': {
                document.documentElement.classList.add('dark');

                break;
            }
        }
    }, [currentTheme]);

    const setTheme = (newTheme, setExpanded) => {
        setExpanded(false);

        window.localStorage.setItem('theme', newTheme);

        setCurrentTheme(newTheme);
    };

    return (
        <nav className={`text-black dark:text-white w-screen h-[4.25rem] sticky top-0 z-50 ${!showMenu ? 'bg-white dark:bg-[#121212dd] bg-opacity-80 backdrop-blur-[6px] backdrop-saturate-150 backdrop-brightness-50 border-b border-b-neutral-200 dark:border-b-neutral-800' : ''}`}>
            <Container className="relative md:px-6 h-full flex items-center" noMargin>
                <header className={`${showMenu ? 'hidden' : 'md:max-lg:hidden'} md:pr-6 md:border-r-2 md:border-r-[rgba(0,0,0,0.1)] md:dark:border-r-neutral-700 mr-6`}>
                    <Link href="/" className="flex items-center content-center p-1">
                        <Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
                        <span className="text-xl font-extrabold ml-2 tracking-tighter">MCS</span>
                    </Link>
                </header>
                <button className="absolute top-4 right-4 z-50 text-black dark:text-white ml-auto md:hidden p-2" type="button" onClick={() => setShowMenu(!showMenu)}>
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
                            <div className={`p-1 ${showMenu && active === 'home' ? 'text-white' : active === 'home' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span>Home</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs">
                            <div className={`p-1 ${showMenu && active === 'api' ? 'text-white' : active === 'api' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span className="hidden md:block">API</span>
                                <span className="block md:hidden">API Documentation</span>
                            </div>
                        </Link>
                    </li>
                    <li className="md:mr-auto">
                        <Link href="/about">
                            <div className={`p-1 ${showMenu && active === 'about' ? 'text-white' : active === 'about' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span>About</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="https://discord.gg/QwvzbA9KGz" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <DiscordIcon width="22" height="22" title="Discord" />
                            <span className="md:sr-only font-bold">Discord</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/mcstatus-io" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <GithubIcon width="22" height="22" title="GitHub" />
                            <span className="md:sr-only font-bold">GitHub</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://status.mcstatus.io" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}>
                            <CalendarIcon width="22" height="22" title="Status" />
                            <span className="md:sr-only font-bold">Status Page</span>
                        </a>
                    </li>
                    <li>
                        <Dropdown
                            text={
                                <div className="flex items-center gap-2">
                                    <SunIcon width="22" height="22" title="Status" />
                                    <Chevron width="16" height="16" className="text-neutral-500" />
                                </div>
                            }
                            className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-800'} p-2`}
                            align="right"
                        >
                            {({ setExpanded }) => (
                                <div className="card text-black dark:text-white bg-neutral-300 dark:bg-neutral-800 p-2 min-w-[240px] shadow-lg shadow-black/25">
                                    <ul className="list-none flex flex-col">
                                        <li>
                                            <button type="button" className="w-full px-3 py-2 flex items-center gap-3 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded text-left" onClick={() => setTheme('auto', setExpanded)}>
                                                <CPUIcon width="18" height="18" />
                                                <span>Automatic</span>
                                                <CheckIcon width="18" height="18" className={`ml-auto ${currentTheme === 'auto' ? 'block' : 'hidden'}`} />
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="w-full px-3 py-2 flex items-center gap-3 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded text-left" onClick={() => setTheme('light', setExpanded)}>
                                                <SunIcon width="18" height="18" />
                                                <span>Light</span>
                                                <CheckIcon width="18" height="18" className={`ml-auto ${currentTheme === 'light' ? 'block' : 'hidden'}`} />
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button" className="w-full px-3 py-2 flex items-center gap-3 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded text-left" onClick={() => setTheme('dark', setExpanded)}>
                                                <MoonIcon width="18" height="18" />
                                                <span>Dark</span>
                                                <CheckIcon width="18" height="18" className={`ml-auto ${currentTheme === 'dark' ? 'block' : 'hidden'}`} />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </Dropdown>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}