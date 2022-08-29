import React from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import PropTypes from 'prop-types';
import calendarIcon from '../assets/icons/calendar.svg';
import githubIcon from '../assets/icons/github.svg';
import icon from '../assets/img/icon.png';

export default function Header({ active }) {
	return (
		<div className="sticky top-0 w-screen h-16 bg-neutral-900 bg-opacity-80 backdrop-blur-lg border-b border-b-neutral-700">
			<div className="container mx-auto h-full flex justify-between items-center px-6">
				<div className="flex">
					<div className="hidden md:block pr-6 border-r-2 border-r-neutral-800">
						<Link href="/">
							<a className="flex items-center content-center p-1">
								<Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
								<span className="text-xl font-semibold ml-2 tracking-tighter">MCS</span>
							</a>
						</Link>
					</div>
					<div className="md:ml-6 flex gap-6 items-center">
						<Link href="/">
							<a className={active === 'home' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>
								<span>Home</span>
							</a>
						</Link>
						<Link href="/docs">
							<a className={active === 'api' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>API</a>
						</Link>
						<Link href="/about">
							<a className={active === 'about' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-150'}>About</a>
						</Link>
					</div>
				</div>
				<div className="flex">
					<div className="ml-8 flex gap-3 items-center">
						<Link href="/">
							<a className="text-blue-500 font-medium rounded-full hover:bg-neutral-800 p-2">
								<Image src={githubIcon} width="24" height="24" alt="GitHub icon" priority />
							</a>
						</Link>
						<Link href="/">
							<a className="text-blue-500 font-medium rounded-full hover:bg-neutral-800 p-2">
								<Image src={calendarIcon} width="20" height="20" alt="Calendar icon" priority />
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	active: PropTypes.string.isRequired
};

Header.defaultProps = {
	active: 'home'
};