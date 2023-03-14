'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import CalendarIcon from '!!@svgr/webpack!../assets/icons/calendar.svg';
import GithubIcon from '!!@svgr/webpack!../assets/icons/github.svg';
import MenuIcon from '!!@svgr/webpack!../assets/icons/menu.svg';
import CloseIcon from '!!@svgr/webpack!../assets/icons/x.svg';
import icon from '../assets/img/icon.png';

export default function Navbar({ active }) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (showMenu) {
			document.body.classList.add('fixed');
		} else {
			document.body.classList.remove('fixed');
		}
	}, [showMenu]);

	return (
		<nav className={`text-black dark:text-white sticky top-0 z-50 w-screen h-[4.25rem] ${showMenu ? 'bg-transparent' : 'bg-white dark:bg-[#121212] bg-opacity-75 backdrop-blur-lg border-b border-b-neutral-200 dark:border-b-neutral-800'}`}>
			<Container className="md:px-6 h-full flex items-center" noMargin>
				<div className={`${showMenu ? 'hidden' : 'md:max-lg:hidden'} md:pr-6 md:border-r-2 md:border-r-neutral-200 md:dark:border-r-neutral-700 md:mr-0`}>
					<Link href="/" className="flex items-center content-center p-1">
						<Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
						<span className="text-xl font-extrabold ml-2 tracking-tighter">MCS</span>
					</Link>
				</div>
				<button className="absolute top-4 right-4 z-20 text-black dark:text-white ml-auto md:hidden p-2" type="button" onClick={() => setShowMenu(!showMenu)}>
					{
						showMenu
							? <CloseIcon width="24" height="24" className="text-white" />
							: <MenuIcon width="24" height="24" />
					}
				</button>
				<ul className={`list-none lg:ml-6 text-neutral-600 dark:text-neutral-400 ${showMenu ? 'flex flex-col justify-center absolute top-0 left-0 bg-neutral-900 bg-opacity-90 backdrop-blur-lg w-full h-[100vh] z-10' : 'hidden md:flex'} gap-4 items-center grow`}>
					<li>
						<Link href="/" className={`block md:mr-1 p-1 ${showMenu && active === 'home' ? 'text-white' : (active === 'home' ? 'text-black dark:text-white' : (showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white motion-safe:transition-colors'))}`}>
							Home
						</Link>
					</li>
					<li>
						<Link href="/docs" className={`block md:mr-1 p-1 ${showMenu && active === 'api' ? 'text-white' : (active === 'api' ? 'text-black dark:text-white' : (showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white motion-safe:transition-colors'))}`}>
							<span className="hidden md:block">API</span>
							<span className="block md:hidden">API Documentation</span>
						</Link>
					</li>
					<li className="md:mr-auto">
						<Link href="/about" className={`block md:mr-1 p-1 ${showMenu && active === 'about' ? 'text-white' : (active === 'about' ? 'text-black dark:text-white' : (showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white motion-safe:transition-colors'))}`}>
							About
						</Link>
					</li>
					<li>
						<a href="https://github.com/mcstatus-io" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 motion-safe:transition-colors'} p-2`}>
							<GithubIcon width="24" height="24" title="GitHub" />
							<span className="md:sr-only font-bold">GitHub</span>
						</a>
					</li>
					<li>
						<a href="https://uptime.mcstatus.io" className={`flex gap-3 items-center rounded-full ${showMenu ? 'text-white' : 'text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 motion-safe:transition-colors'} p-2`}>
							<CalendarIcon width="24" height="24" title="Status" />
							<span className="md:sr-only font-bold">Status Page</span>
						</a>
					</li>
				</ul>
			</Container>
		</nav>
	);
}