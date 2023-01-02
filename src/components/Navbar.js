import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import calendarIcon from '../assets/icons/calendar.svg';
import githubIcon from '../assets/icons/github.svg';
import icon from '../assets/img/icon.png';
import { LinkButton } from './Button';
import getAvatarURL from '../util/getAvatarURL';

export default function Navbar({ active, user }) {
	return (
		<div className="sticky top-0 z-50 w-screen h-16 bg-neutral-900 bg-opacity-90 backdrop-blur-lg border-b border-b-neutral-700">
			<div className="container mx-auto h-full flex justify-between items-center px-6">
				<div className="flex">
					<div className="hidden md:block pr-6 border-r-2 border-r-neutral-800">
						<Link href="/" className="flex items-center content-center p-1">
							<Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
							<span className="text-xl font-semibold ml-2 tracking-tighter">MCS</span>
						</Link>
					</div>
					<div className="md:ml-6 flex gap-6 items-center">
						<Link href="/" className={active === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
							Home
						</Link>
						<Link href="/tools" className={active === 'tools' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
							Tools
						</Link>
						<Link href="/docs" className={active === 'api' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
							API
						</Link>
						<Link href="/about" className={active === 'about' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
							About
						</Link>
					</div>
				</div>
				<div className="flex">
					<div className="ml-8 flex gap-3 items-center">
						<a href="https://github.com/mcstatus-io" className="text-blue-500 font-medium rounded-full hover:bg-neutral-800 p-2">
							<Image src={githubIcon} width="24" height="24" alt="GitHub icon" priority />
						</a>
						<a href="https://uptime.mcstatus.io" className="text-blue-500 font-medium rounded-full hover:bg-neutral-800 p-2">
							<Image src={calendarIcon} width="20" height="20" alt="Calendar icon" priority />
						</a>
						{
							user
								? <Link href="/dashboard" className="flex items-center gap-3 p-2 pr-3 bg-neutral-800 hover:bg-neutral-700 hover:bg-opacity-70 transition-colors rounded-full">
									<Image src={getAvatarURL(user)} className="rounded-full" alt="Profile icon" width="32" height="32" priority />
									<span>
										<span className="font-bold">{user.username}</span>
										<span className="text-neutral-300">#{user.discriminator}</span>
									</span>
								</Link>
								: <LinkButton href="/auth" className="lg:ml-2">
									Log in with Discord
								</LinkButton>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

Navbar.propTypes = {
	active: PropTypes.string,
	user: PropTypes.object
};