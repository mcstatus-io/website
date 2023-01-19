import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import CalendarIcon from '!!@svgr/webpack!../assets/icons/calendar.svg';
import GithubIcon from '!!@svgr/webpack!../assets/icons/github.svg';
import MenuIcon from '!!@svgr/webpack!../assets/icons/menu.svg';
import CloseIcon from '!!@svgr/webpack!../assets/icons/x.svg';
import icon from '../assets/img/icon.png';
import getAvatarURL from '../util/getAvatarURL';
import Container from './Container';

export default function Navbar({ active, user }) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (showMenu) {
			document.body.classList.add('fixed');
		} else {
			document.body.classList.remove('fixed');
		}
	}, [showMenu]);

	return (
		<nav className={`text-white sticky top-0 z-50 w-screen h-16 ${showMenu ? 'bg-neutral-900 bg-opacity-80 backdrop-blur-lg' : 'bg-neutral-900 bg-opacity-90 dark:bg-opacity-80 backdrop-blur-lg border-b border-b-neutral-700'}`}>
			<Container className="md:px-6 h-full flex items-center" noMargin>
				<div className={`${showMenu ? 'hidden' : 'md:max-lg:hidden'} md:pr-6 md:border-r-2 md:border-r-neutral-700 dark:md:border-r-neutral-800 md:mr-0`}>
					<Link href="/" className="flex items-center content-center p-1">
						<Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
						<span className="text-white text-xl font-semibold ml-2 tracking-tighter">MCS</span>
					</Link>
				</div>
				<button className="ml-auto md:hidden p-2" type="button" onClick={() => setShowMenu(!showMenu)}>
					{
						showMenu
							? <CloseIcon />
							: <MenuIcon />
					}
				</button>
				<ul className={`list-none lg:ml-6 ${showMenu ? 'flex flex-col justify-center absolute top-16 left-0 bg-neutral-900 bg-opacity-80 backdrop-blur-lg w-full h-[calc(100vh-4rem)] z-10' : 'hidden md:flex'} gap-6 items-center grow`}>
					<li>
						<Link href="/" className={active === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white motion-safe:transition-colors motion-safe:duration-150'}>
							Home
						</Link>
					</li>
					<li>
						<Link href="/tools" className={active === 'tools' ? 'text-white' : 'text-neutral-400 hover:text-white motion-safe:transition-colors motion-safe:duration-150'}>
							Tools
						</Link>
					</li>
					<li>
						<Link href="/docs" className={active === 'api' ? 'text-white' : 'text-neutral-400 hover:text-white motion-safe:transition-colors motion-safe:duration-150'}>
							<span className="hidden md:block">API</span>
							<span className="block md:hidden">API Documentation</span>
						</Link>
					</li>
					<li className="md:mr-auto">
						<Link href="/about" className={active === 'about' ? 'text-white' : 'text-neutral-400 hover:text-white motion-safe:transition-colors motion-safe:duration-150'}>
							About
						</Link>
					</li>
					<li>
						<a href="https://github.com/mcstatus-io" className="flex gap-3 items-center rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-800 motion-safe:transition-colors p-2">
							<GithubIcon width="24" height="24" />
							<span className="md:sr-only font-bold">GitHub</span>
						</a>
					</li>
					<li>
						<a href="https://uptime.mcstatus.io" className="flex gap-3 items-center rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-800 motion-safe:transition-colors p-2">
							<CalendarIcon width="24" height="24" />
							<span className="md:sr-only font-bold">Status</span>
						</a>
					</li>
					<li>
						{
							user
								? <a href={process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://dashboard.mcstatus.io'} className="flex items-center gap-3 py-2 pl-2 pr-3 bg-neutral-800 hover:bg-neutral-900 hover:bg-opacity-70 motion-safe:transition-colors rounded-full">
									<Image src={getAvatarURL(user)} className="rounded-full" alt="Profile icon" width="32" height="32" priority />
									<span>
										<span className="font-bold">{user.username}</span>
										<span className="text-neutral-300">#{user.discriminator}</span>
									</span>
								</a>
								: <Link href="/auth" className="lg:ml-2 px-5 py-3 bg-[#5865F2] hover:bg-opacity-80 motion-safe:transition-colors rounded-full">
									Log in with Discord
								</Link>
						}
					</li>
				</ul>
			</Container>
		</nav>
	);
}

Navbar.propTypes = {
	active: PropTypes.string,
	user: PropTypes.object
};