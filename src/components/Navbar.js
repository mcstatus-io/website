import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import calendarIcon from '../assets/icons/calendar.svg';
import githubIcon from '../assets/icons/github.svg';
import menuIcon from '../assets/icons/menu.svg';
import closeIcon from '../assets/icons/x.svg';
import icon from '../assets/img/icon.png';
import getAvatarURL from '../util/getAvatarURL';

export default function Navbar({ active, user }) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<nav className="sticky top-0 z-50 w-screen h-16 bg-neutral-900 bg-opacity-90 dark:bg-opacity-80 backdrop-blur-lg border-b border-b-neutral-700">
			<div className="container mx-auto md:px-6 h-full flex justify-between items-center">
				<div className="flex items-center justify-between md:justify-start md:w-auto w-full">
					<div className="block md:pr-6 md:border-r-2 md:border-r-neutral-700 dark:md:border-r-neutral-800">
						<Link href="/" className="flex items-center content-center p-1">
							<Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
							<span className="text-white text-xl font-semibold ml-2 tracking-tighter">MCS</span>
						</Link>
					</div>
					<button className="md:hidden" type="button" onClick={() => setShowMenu(!showMenu)}>
						<Image src={showMenu ? closeIcon : menuIcon} alt="Menu icon" width="32" height="32" priority />
					</button>
					<ul className="md:ml-6 hidden md:flex gap-6 items-center">
						<li>
							<Link href="/" className={active === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
								Home
							</Link>
						</li>
						<li>
							<Link href="/tools" className={active === 'tools' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
								Tools
							</Link>
						</li>
						<li>
							<Link href="/docs" className={active === 'api' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
								API
							</Link>
						</li>
						<li>
							<Link href="/about" className={active === 'about' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
								About
							</Link>
						</li>
					</ul>
				</div>
				<ul className="ml-8 hidden md:flex gap-3 items-center">
					<li>
						<a href="https://github.com/mcstatus-io" className="block rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors p-2">
							<Image src={githubIcon} width="24" height="24" className="w-[24px] h-[24px]" alt="GitHub icon" priority />
						</a>
					</li>
					<li>
						<a href="https://uptime.mcstatus.io" className="block rounded-full hover:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors p-2">
							<Image src={calendarIcon} width="20" height="20" className="w-[24px] h-[24px]" alt="Calendar icon" priority />
						</a>
					</li>
					<li>
						{
							user
								? <a href={process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://dashboard.mcstatus.io'} className="flex items-center gap-3 p-2 pr-3 bg-neutral-800 hover:bg-neutral-700 hover:bg-opacity-70 transition-colors rounded-full">
									<Image src={getAvatarURL(user)} className="rounded-full" alt="Profile icon" width="32" height="32" priority />
									<span>
										<span className="font-bold">{user.username}</span>
										<span className="text-neutral-300">#{user.discriminator}</span>
									</span>
								</a>
								: <Link href="/auth" className="lg:ml-2 px-5 py-3 text-white bg-[#5865F2] hover:bg-opacity-80 transition-colors rounded-full">
									Log in with Discord
								</Link>
						}
					</li>
				</ul>
			</div>
		</nav>
	);
}

Navbar.propTypes = {
	active: PropTypes.string,
	user: PropTypes.object
};